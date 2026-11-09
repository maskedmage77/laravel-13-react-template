import { ActionIcon, AppShell, Burger, Group, Menu, rem, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { Moon, SignOut, Sun, User } from '@phosphor-icons/react';
import useUserStore from '@/Hooks/useUserStore';
import { useDisclosure } from '@mantine/hooks';
import { router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { appName } from '@/config';

interface Props extends PropsWithChildren {
  auth: any;
  header?: ReactNode;
  children: ReactNode;
}

export default function Authenticated({ auth, children }: Props) {

  const [opened, { toggle }] = useDisclosure();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  useEffect(() => {
    useUserStore.setState({ ...auth });
  }, [auth]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      styles={{
        main: {
          backgroundColor: colorScheme === "dark"
            ? 'var(--mantine-color-dark-8)'
            : 'var(--mantine-color-gray-0)',
        }
      }}
    >
      <AppShell.Header
        style={{
          backgroundColor: colorScheme === "dark"
            ? 'var(--mantine-color-dark-7)'
            : 'var(--mantine-color-gray-1)'
        }}
      >

        <Group gap="md" px="md" justify="space-between" style={{
          height: '100%',
        }}>

          {/* Left Group */}
          <Group>

            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />

            <Text
              gradient={{ from: 'teal.4', to: 'blue.7', deg: 180 }}
              style={{
                fontSize: '1.5rem',
                cursor: 'pointer',
              }}
              c={theme.primaryColor}
              fw={700}
              onClick={() => router.get('/')}
            >
              {appName}
            </Text>

          </Group>

          {/* Right Group */}
          <Group>

            <Text size='sm' c="dimmed" visibleFrom="sm">
              {auth.user.email}
            </Text>

            <ActionIcon
              variant="outline"
              aria-label="Settings"
              onClick={() => {
                toggleColorScheme();
              }}
            >
              {  colorScheme === "dark" ? (
                <Sun style={{ width: '70%', height: '70%' }} weight="bold" />
              ) : (
                <Moon style={{ width: '70%', height: '70%' }} weight="bold" />
              )}
            </ActionIcon>

            <Menu position="bottom-end">

              <Menu.Target>
                <ActionIcon variant="outline" aria-label="Settings">
                  <User style={{ width: '70%', height: '70%' }} weight="bold" />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>

                <Menu.Item
                  leftSection={
                    <User style={{ width: rem(14), height: rem(14) }} weight="bold" />
                  }
                  onClick={() => {
                    router.get(route('profile.edit'))
                  }}
                >
                  Profile
                </Menu.Item>

                <Menu.Item
                  color="red"
                  leftSection={
                    <SignOut style={{ width: rem(14), height: rem(14) }} weight="bold" />
                  }
                  onClick={() => {
                    router.post(route('logout'))
                  }}
                >
                  Logout
                </Menu.Item>

              </Menu.Dropdown>

            </Menu>

          </Group>

        </Group>

      </AppShell.Header>

      <Navbar />

      <AppShell.Main>
        {children}
      </AppShell.Main>

    </AppShell>
  );
}
