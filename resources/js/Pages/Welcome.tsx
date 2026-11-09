import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Anchor, Badge, Group, List, Stack, Text, Title } from '@mantine/core';
import { Head, Link } from '@inertiajs/react';

type Props = {
    laravelVersion: string;
    phpVersion: string;
    canLogin: boolean;
    canRegister: boolean;
};

const stack = [
    { name: 'Laravel', version: '13.x' },
    { name: 'Inertia', version: '3.x' },
    { name: 'React', version: '19.x' },
    { name: 'Mantine', version: '9.x' },
    { name: 'Vite', version: '8.x' },
    { name: 'Tailwind', version: '4.x' },
    { name: 'TypeScript', version: '7.x' },
];

export default function Welcome({ auth, laravelVersion, phpVersion, canLogin, canRegister }: PageProps<Props>) {
    return (
        <GuestLayout>
            <Head title="Welcome" />

            <Stack gap="xs" align="center">
                <Title order={2}>Laravel 13 · Mantine starter</Title>
                <Text size="sm" c="dimmed">
                    Laravel {laravelVersion} on PHP {phpVersion}
                </Text>
            </Stack>

            <Group gap={6} justify="center" mt="md">
                {stack.map(({ name, version }) => (
                    <Badge key={name} variant="light" radius="sm">
                        {name} {version}
                    </Badge>
                ))}
            </Group>

            <List size="sm" mt="lg" spacing={4} center>
                <List.Item>Breeze auth (login, register, reset, verify)</List.Item>
                <List.Item>Mantine AppShell layout with dark/light toggle</List.Item>
                <List.Item>Users CRUD as a starting pattern</List.Item>
                <List.Item>Ziggy routes, TypeScript, permission-gated nav</List.Item>
            </List>

            <Group justify="center" mt="xl">
                {auth?.user ? (
                    <Anchor component={Link} href={route('dashboard')} fw={600}>
                        Go to dashboard
                    </Anchor>
                ) : (
                    <Group gap="lg">
                        {canLogin && (
                            <Anchor component={Link} href={route('login')} fw={600}>
                                Log in
                            </Anchor>
                        )}
                        {canRegister && (
                            <Anchor component={Link} href={route('register')} fw={600}>
                                Register
                            </Anchor>
                        )}
                    </Group>
                )}
            </Group>
        </GuestLayout>
    );
}
