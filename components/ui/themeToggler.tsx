'use client';

import {
	ActionIcon,
	useComputedColorScheme,
	useMantineColorScheme,
} from '@mantine/core';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggler() {
	const { toggleColorScheme } = useMantineColorScheme();
	const computedColorScheme = useComputedColorScheme('light', {
		getInitialValueInEffect: true,
	});

	return (
		<ActionIcon
			size="lg"
			variant="default"
			onClick={() => toggleColorScheme()}
			aria-label="Toggle color scheme"
		>
			{computedColorScheme === 'dark' ? (
				<Moon size={18} />
			) : (
				<Sun size={18} />
			)}
		</ActionIcon>
	);
}
