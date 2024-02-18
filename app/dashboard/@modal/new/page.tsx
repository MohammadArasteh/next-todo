"use client";

import React from "react";
import { createList } from "@/lib/server-actions/todo";
import { useTodoList } from "@/store/zustand";
import { Button, Divider, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";

type FormValues = {
  title: string;
};

export default function New() {
  const router = useRouter();

  const form = useForm<FormValues>({
    initialValues: {
      title: "",
    },

    validate: {
      title: (value) => (!value ? "* Title is required" : null),
    },
  });
  const addList = useTodoList((store) => store.addList);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    const result = await createList(values);
    const { error, data } = JSON.parse(result);
    if (error?.message) console.error(error.message);
    else if (data) {
      addList({
        id: data.id,
        createdBy: data.created_by,
        title: data.title,
      });
      setTimeout(() => {
        router.push(`/dashboard/todo/${data.id}`);
      }, 1000);
      router.back();
    }
    setIsSubmitting(false);
  };

  const onClose = () => {
    router.back();
  };

  return (
    <Modal
      opened={true}
      onClose={onClose}
      title="New Todo List"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      transitionProps={{
        transition: "fade",
        duration: 100,
        timingFunction: "linear",
      }}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="task title"
          {...form.getInputProps("title")}
        />
        <Divider my="md" />
        <Group justify="flex-end" mt="md">
          <Button loading={isSubmitting} type="submit">
            Add
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
