'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, ChevronDown } from 'lucide-react';
import classes from './userInfo.module.css';
import cx from 'clsx';
import {
	Avatar,
	Container,
	Group,
	Menu,
	Text,
	UnstyledButton,
} from '@mantine/core';

export function UserInfo() {
	const { data: session, status } = useSession();

	const user = {
		name: session?.user?.name,
		email: session?.user?.email,
		image: session?.user?.image ?? undefined,
	};
	const isLoading = status === 'loading';
	const [userMenuOpened, setUserMenuOpened] = useState(false);

	return (
		<Container className={classes.mainSection} size="md">
			<Menu
				width={260}
				position="bottom-end"
				transitionProps={{ transition: 'pop-top-right' }}
				onClose={() => setUserMenuOpened(false)}
				onOpen={() => setUserMenuOpened(true)}
				withinPortal
			>
				<Menu.Target>
					<UnstyledButton
						className={cx(classes.user, {
							[classes.userActive]: userMenuOpened,
						})}
					>
						<Group gap={7}>
							<Avatar
								src={isLoading ? undefined : user.image}
								alt=""
								radius="md"
								size={32}
							/>
							<Text fw={500} size="md" lh={1} mr={3}>
								{isLoading ? 'Memuat...' : user.name}
							</Text>
							<ChevronDown size={12} strokeWidth={1.5} />
						</Group>
					</UnstyledButton>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item
						onClick={() => signOut({ callbackUrl: '/login' })}
						leftSection={<LogOut size={16} strokeWidth={1.5} />}
					>
						Logout
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Container>
	);
}
