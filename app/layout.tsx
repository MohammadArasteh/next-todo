import "./globals.css";
import React from "react";

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
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
              {children}
      </body>
    </html>
  );
}
