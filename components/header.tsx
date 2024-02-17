import { Flex, Text } from "@mantine/core";
import { readUserSession } from "@/lib/server-actions";
import Link from "next/link";
import SignOutButton from "./signOutButton";
import DrawerButton from "./drawerButton";

export default async function Header() {
  const { data } = await readUserSession();
  const isLoggedIn = Boolean(data.session);
  return (
    <Flex
      h={50}
      bg="#161616"
      w={"100%"}
      px={"0.6rem"}
      py={"0.3rem"}
      direction={"row"}
      align={"center"}
      justify={"space-between"}
    >
      <Flex direction={"row"} gap="0.5rem" align={"center"}>
        {isLoggedIn && <DrawerButton />}
        <Link href="/">
          <Text
            size="xl"
            fw={700}
            variant="gradient"
            gradient={{ from: "#c0392b", to: "#e74c3c", deg: 122 }}
          >
            Todo
          </Text>
        </Link>
      </Flex>
      <Flex direction={"row"} c="#51a8f4" gap={"0.5rem"} align={"center"}>
        {isLoggedIn ? (
          <>
            <Link href={"/dashboard"}>
              <Text>DASHBOARD</Text>
            </Link>
            |
            <SignOutButton />
          </>
        ) : (
          <>
            <Link href={"/login"}>
              <Text>LOGIN</Text>
            </Link>
            |
            <Link href={"/register"}>
              <Text>REGISTER</Text>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
}
