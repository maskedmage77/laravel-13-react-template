import { AppShell, Group, Text, useMantineColorScheme } from '@mantine/core';
import { Users } from '@phosphor-icons/react';
import useUserStore from '@/Hooks/useUserStore';
import { router } from '@inertiajs/react';
import styles from './Navbar.module.css';

interface NavLink {
  label: string;
  icon: typeof Users;
  link: string;
  /** Leave empty for "everyone signed in". Otherwise the user needs one of them. */
  requiredPermissions?: string[];
}

const linkData: NavLink[] = [
  {
    label: 'Users',
    icon: Users,
    link: '/users',
    requiredPermissions: [],
  },
  // Example of a gated link — hidden until the backend shares the permission
  // in HandleInertiaRequests::share().
  // {
  //   label: 'Settings',
  //   icon: Gear,
  //   link: '/settings',
  //   requiredPermissions: ['manage settings'],
  // },
];

export default function Navbar() {

  const { colorScheme } = useMantineColorScheme();
  const { permissions } = useUserStore();

  const canSee = (link: NavLink) =>
    !link.requiredPermissions?.length ||
    link.requiredPermissions.some((permission) => permissions.includes(permission));

  return (
    <AppShell.Navbar
      p="md"
      style={{
        backgroundColor: colorScheme === 'dark'
          ? 'var(--mantine-color-dark-7)'
          : 'var(--mantine-color-gray-1)',
      }}
    >
      {linkData.filter(canSee).map((link) => {
        const active = window.location.pathname.startsWith(link.link);

        return (
          <Group
            key={link.link}
            gap="md"
            align="center"
            className={styles.link}
            onClick={() => router.get(link.link)}
          >
            <link.icon
              style={{ color: active ? 'var(--mantine-color-green-5)' : undefined }}
              size={20}
            />
            <Text c={active ? 'green.4' : undefined}>
              {link.label}
            </Text>
          </Group>
        );
      })}
    </AppShell.Navbar>
  );
}
