import { Group } from '@mantine/core';
import { SidebarToggler } from '@/components/ui/sidebarToggler';
import { ThemeToggler } from '@/components/ui/themeToggler';

type TopbarProps = {
  mobileOpened: boolean;
  desktopOpened: boolean;
  onToggleMobile: () => void;
  onToggleDesktop: () => void;
};

export function Topbar({
  mobileOpened,
  desktopOpened,
  onToggleMobile,
  onToggleDesktop,
}: TopbarProps) {
  return (
    <Group justify="space-between" align="center" wrap="nowrap" w="100%">
      <Group gap="xl">
        <SidebarToggler opened={mobileOpened} onToggle={onToggleMobile} hiddenFrom="sm" />
        <SidebarToggler opened={desktopOpened} onToggle={onToggleDesktop} visibleFrom="sm" />
      </Group>
      <Group>
        <ThemeToggler />
      </Group>
    </Group>
  );
}
