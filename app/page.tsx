import { Box, Text } from "@mantine/core";
import Image from "next/image";
import classes from "./page.module.css";

export default function HomePage() {
  return (
    <Box className={classes.container}>
      <Image
        src={"/girl-work-on-laptop.png"}
        alt="main page image"
        width={500}
        height={500}
      />
      <Text size="xl" c="#c6cdd5">
        Step into a world of seamless productivity with our Next.js-powered
        to-do app. Experience the thrill of swift task management through a
        visually stunning interface. Real-time updates keep you in control,
        while responsive design ensures a dynamic experience on any device.
        Elevate your to-do list with Next.js – where efficiency meets
        excitement!
      </Text>
    </Box>
  );
}
