import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./globals.css";
import React from "react";
import {
  MantineProvider,
  ColorSchemeScript,
  Flex,
  Center,
} from "@mantine/core";
import { theme } from "../theme";
import Header from "@/components/header";

export const metadata = {
  title: "Todo",
  description: "Todo Application written using NextJs",
};

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <Flex className="h-screen" direction={"column"}>
            <Header />
            <Center h={"calc(100% - 50px)"} bg={"#1d1d1d"}>
              {children}
            </Center>
          </Flex>
        </MantineProvider>
      </body>
    </html>
  );
}
