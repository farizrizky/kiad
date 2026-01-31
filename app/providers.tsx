'use client';

import { MantineProvider } from '@mantine/core';
import { SessionProvider } from 'next-auth/react';

type ProvidersProps = {
	children: React.ReactNode;
};

const theme = {
	primaryColor: 'blue',
	defaultRadius: 'md',
};

export function Providers({ children }: ProvidersProps) {
	return (
		<SessionProvider>
			<MantineProvider theme={theme}>{children}</MantineProvider>
		</SessionProvider>
	);
}
