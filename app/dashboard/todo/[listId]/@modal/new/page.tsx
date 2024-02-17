"use client";
import useUser from "@/lib/hooks/useUser";
import { useTodoList } from "@/store/zustand";
import { Button, Divider, Group, Modal, Space, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import React from "react";

type PageProps = {
  params: { listId: number };
};

type FormValues = {
  title: string;
  dueDate: Date;
};

export default function New(props: PageProps) {
  const [, { close }] = useDisclosure(false);
  const addTask = useTodoList((store) => store.addTask);
  const router = useRouter();
  const user = useUser();

  const form = useForm<FormValues>({
    initialValues: {
      title: "",
      dueDate: new Date(),
    },

    validate: {
      title: (value) => (!value ? "* Title is required" : null),
      dueDate: (value) => (!value ? "* DueDate is required" : null),
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (user) {
      addTask({
        id: new Date().getTime(),
        createdBy: user.id,
        createdAt: new Date().toISOString(),
        dueDate: values.dueDate.toISOString(),
        isDone: false,
        listId: +props.params.listId,
        title: values.title,
      });
    }
    onClose();
  };

  const onClose = () => {
    router.back();
    close();
  };

  return (
    <Modal
      opened={true}
      onClose={onClose}
      title="New Todo Task"
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
          label="Task Title"
          placeholder="Enter title"
          {...form.getInputProps("title")}
        />
        <Space h="sm" />
        <DatePickerInput
          withAsterisk
          label="Due Date"
          placeholder="Pick date"
          {...form.getInputProps("dueDate")}
        />
        <Space h="sm" />

        <Divider my="md" />

        <Group justify="flex-end" mt="md">
          <Button onClick={onClose} variant="default">
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </Group>
      </form>
    </Modal>
  );
}
