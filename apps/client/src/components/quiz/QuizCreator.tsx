import { TextInput, Button, Group, Paper, Text, SegmentedControl } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSquarePlus } from '@tabler/icons-react';

export const QuizCreator = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      language: '',
      difficulty: 'beginner',
    },

    validate: {
      language: (value) =>
        /^.{2,30}$/.test(value) ? null : 'Input needs to be between 2 and 30 characters',
      difficulty: (value) => (value ? null : 'Must choose one option'),
    },
  });

  return (
    <Paper shadow='sm' radius='md' withBorder p='xl' maw={550}>
      <Text size='xl' mb='md'>
        Create a new language quiz
      </Text>
      <form onSubmit={form.onSubmit(() => console.log(''))}>
        <TextInput
          withAsterisk
          label='Language'
          placeholder='Swenglish'
          mb='md'
          autoComplete='off'
          key={form.key('language')}
          {...form.getInputProps('language')}
        />
        <Text size='sm' fw={500} mb={3}>
          Difficulty level
        </Text>
        <SegmentedControl
          name='difficulty'
          {...form.getInputProps('difficulty')}
          fullWidth
          withItemsBorders={false}
          data={[
            {
              value: 'beginner',
              label: 'Beginner',
            },
            {
              value: 'intermediate',
              label: 'Intermediate',
            },
            {
              value: 'advanced',
              label: 'ProElite',
            },
          ]}
        />
        <Group justify='center' mt='md'>
          <Button fullWidth type='submit' rightSection={<IconSquarePlus />}>
            Create
          </Button>
        </Group>
      </form>
    </Paper>
  );
};
