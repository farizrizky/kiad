import { ActionIcon, type ActionIconProps } from '@mantine/core';
import { Menu, ChevronLeft } from 'lucide-react';

export type SidebarTogglerProps = Omit<
	ActionIconProps,
	'children' | 'onClick'
> & {
	opened: boolean;
	onToggle: () => void;
};

export function SidebarToggler({
	opened,
	onToggle,
	...props
}: SidebarTogglerProps) {
	return (
		<ActionIcon
			size="lg"
			variant="default"
			onClick={onToggle}
			aria-label="Toggle sidebar"
			{...props}
		>
			{opened ? <ChevronLeft size={18} /> : <Menu size={18} />}
		</ActionIcon>
	);
}
