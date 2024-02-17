import { Box, List, ListItem, Space, Text, Title } from "@mantine/core";

export default function Dashboard() {
  return (
    <>
      <Box style={{ overflowX: "hidden", overflowY: "auto" }}>
        <Title order={2} fw={700}>
          Creating and Managing Todos
        </Title>
        <Space h={"1rem"} />
        <Text>
          {`A "Todo" is a task or an item that needs to be done. A todo list is a
        helpful tool for organizing and prioritizing your tasks.`}
        </Text>
        <Text>{`Here's a simple
        guide on how to create a list and add todos in a basic todo application:`}</Text>
        <Space h={"1rem"} />
        <List listStyleType="disc" spacing={"0.4rem"}>
          <ListItem>
            <Text fw={700}>Step 1: Create a New Todo List</Text>
            <List listStyleType="number" spacing={0}>
              <ListItem>
                {`Look for an option that allows you to create a new todo list. It
                might be labeled as "New List," "Create List," or something
                similar.`}
              </ListItem>
              <ListItem>
                {`Give your list a descriptive name, such as "Work Tasks" or "Grocery Shopping."`}
              </ListItem>
            </List>
          </ListItem>
          <ListItem>
            <Text fw={700}>Step 2: Add Todos to Your List</Text>
            <List listStyleType="number" spacing={0}>
              <ListItem>
                {`Inside your newly created list, find an option like "Add Todo" or "New Task".`}
              </ListItem>
              <ListItem>
                {`Type in a brief description of the task you want to accomplish. For example, "Buy groceries" or "Finish report".`}
              </ListItem>
              <ListItem>
                {`Some apps may allow you to set due dates, reminders, or prioritize tasks. Explore these features to enhance your todo management.`}
              </ListItem>
            </List>
          </ListItem>
          <ListItem>
            <Text fw={700}>Step 3: Mark Todos as Completed</Text>
            <Text>{`Once you've completed a task:`}</Text>
            <List listStyleType="number" spacing={0}>
              <ListItem>{`Locate the todo you've finished.`}</ListItem>
              <ListItem>
                {`Look for an option to mark it as completed. This could be a checkbox, a swipe gesture, or a button like "Mark as Done" or "Complete".`}
              </ListItem>
            </List>
          </ListItem>
          <ListItem>
            <Text fw={700}>Step 4: Edit or Delete Todos</Text>
            <Text>{`If you need to make changes to a todo:`}</Text>
            <List listStyleType="number" spacing={0}>
              <ListItem>{`Find the option to edit or modify a todo.`}</ListItem>
              <ListItem>
                {`Update the description, due date, or any other relevant information.`}
              </ListItem>
              <ListItem>{`If you want to delete a todo, look for an option like "Delete," "Remove," or an icon representing trash.`}</ListItem>
            </List>
          </ListItem>
        </List>
        <Space h={"1rem"} />
        <Text fw={700}>Tips:</Text>
        <Space h={"1rem"} />
        <List listStyleType="disc">
          <ListItem>Keep your todo descriptions concise and clear.</ListItem>
          <ListItem>
            Prioritize tasks based on their importance and deadlines.
          </ListItem>
          <ListItem>
            Regularly review and update your todo list to stay organized.
          </ListItem>
        </List>
        <Space h={"1rem"} />
        <Text>
          {`Remember, a todo list is a powerful tool for staying organized and
          managing your tasks effectively. Whether it's for work, school, or
          personal chores, using a todo app can help you stay on top of your
          responsibilities and boost productivity.`}
        </Text>
      </Box>
    </>
  );
}
