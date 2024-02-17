import { Flex, Loader, Text } from "@mantine/core";

export default function Loading() {
  return (
    <Flex
      direction={"row"}
      align={"center"}
      gap="1rem"
      h="fit-content"
      mt="1rem"
    >
      <Loader size={25} />
      <Text>Loading Tasks...</Text>
    </Flex>
  );
}
