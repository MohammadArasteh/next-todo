import Lists from "@/components/lists";
import { Flex } from "@mantine/core";
import React from "react";

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <Flex direction={"row"} gap="1rem" w="100%" h="100%" p="1rem">
        <Lists />
        {children}
        {modal}
      </Flex>
    </>
  );
}
