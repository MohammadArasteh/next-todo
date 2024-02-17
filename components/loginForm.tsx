"use client";

import React from "react";
import { signInWithEmailAndPassword } from "@/lib/server-actions/auth";
import {
  TextInput,
  Button,
  Group,
  Divider,
  Space,
  Paper,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      password: (value) => (!value ? "* Password is required" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    const result = await signInWithEmailAndPassword(values);
    const { error } = JSON.parse(result);
    if (error?.message) console.error(error.message);
    setIsSubmitting(false);
  };

  return (
    <Paper w={360} mx="auto" shadow="md" radius="md" p="xl">
      <Text size="2rem">Login</Text>
      <Space h="md" />
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <Space h="sm" />
        <TextInput
          withAsterisk
          label="Password"
          type="password"
          placeholder="your password"
          {...form.getInputProps("password")}
        />

        <Divider my="md" />

        <Group justify="flex-end" mt="md">
          <Button loading={isSubmitting} type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
