import { Box, Divider, Flex, Title } from "@mantine/core";
import { notFound } from "next/navigation";
import TasksList from "@/components/tasksList";
import NewTaskButton from "@/components/newTaskButton";
import TasksListActions from "@/components/tasksListActions";
import classes from "./page.module.css";
import { getList } from "@/lib/server-actions/todo";

type PageProps = {
  params: { listId: string };
};

export default async function ListTasks(props: PageProps) {
  const result = await getList(+props.params.listId);
  const { data } = JSON.parse(result);
  if (!data) notFound();

  return (
    <Box className={classes.tasksListContainer}>
      <Flex direction={"row"} align={"center"} justify={"space-between"}>
        <Title mb="md">{data.title}</Title>
        <TasksListActions />
      </Flex>
      <Divider />
      <TasksList />
      <NewTaskButton />
    </Box>
  );
}
