"use client"
import { useState } from "react"
import { useSearchParams } from "next/navigation";
import { Authenticate } from "./authenticate";

import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import classes from './authentication.module.css';

export function Authentication() {
    const sp = useSearchParams();
    const callbackUrl = sp.get("callbackUrl") ?? "/dashboard";

    const { login, loading, error } = Authenticate("/dashboard");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return (
        <Container size={420} my={40}>
            <form onSubmit={(e)=>{
                e.preventDefault();
                login(email, password, callbackUrl)
            }}
            >
            <Title ta="center" className={classes.title}>
                KIAD
            </Title>

            <Text className={classes.subtitle}>
                Aplikasi Administrasi Bengkulu Tengah
            </Text>

            <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
                <TextInput value={email} onChange={(e)=>{setEmail(e.target.value)}} label="Email" placeholder="you@mantine.dev" required radius="md" />
                <PasswordInput value={password} onChange={(e)=>{setPassword(e.target.value)}} label="Password" placeholder="Your password" required mt="md" radius="md" />
                <Group justify="space-between" mt="lg">
                    <Checkbox label="Remember me" />
                    <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor>
                </Group>
                <Button disabled={loading} fullWidth mt="xl" radius="md" type="submit">
                    {loading ? "Memeriksa..." : "Login"}
                </Button>
            </Paper>
            </form>
        </Container>
    );
}
