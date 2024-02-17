import { Flex, Text } from "@mantine/core";

export default function NotFound() {
  return (
    <Flex
      direction={"row"}
      align={"center"}
      gap="1rem"
      h="fit-content"
      mt="1rem"
    >
      <Text size="xl">Page Not Found! 👀</Text>
    </Flex>
  );
}
