'use client';

import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Sidebar } from "@/components/ui/sidebar/sidebar";
import { Topbar } from "@/components/ui/topbar";

export default function Shell({
    children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    
    return (
        
        <AppShell
            padding="md"
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
        >
            <AppShell.Navbar>
                <Sidebar mobileOpened={mobileOpened} onToggleMobile={toggleMobile} />
            </AppShell.Navbar>

            <AppShell.Main>
                <Topbar
                    mobileOpened={mobileOpened}
                    desktopOpened={desktopOpened}
                    onToggleMobile={toggleMobile}
                    onToggleDesktop={toggleDesktop}
                />
                {children}
            </AppShell.Main>
        </AppShell>
    );
}
