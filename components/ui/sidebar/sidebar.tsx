'use client';

import { SidebarToggler } from '@/components/ui/sidebarToggler';
import { Gauge } from 'lucide-react';
import { Code, Group, ScrollArea, Title } from '@mantine/core';
import { LinksGroup } from './sidebarGroup';
import classes from './sidebar.module.css';

const mockdata = [
	{ label: 'Dashboard', icon: Gauge },
	{
		label: 'Market news',
		icon: Gauge,
		initiallyOpened: true,
		links: [
			{ label: 'Overview', link: '/' },
			{ label: 'Forecasts', link: '/' },
			{ label: 'Outlook', link: '/' },
			{ label: 'Real time', link: '/' },
		],
	},
	{
		label: 'Releases',
		icon: Gauge,
		links: [
			{ label: 'Upcoming releases', link: '/' },
			{ label: 'Previous releases', link: '/' },
			{ label: 'Releases schedule', link: '/' },
		],
	},
	{ label: 'Analytics', icon: Gauge },
	{ label: 'Contracts', icon: Gauge },
	{ label: 'Settings', icon: Gauge },
	{
		label: 'Security',
		icon: Gauge,
		links: [
			{ label: 'Enable 2FA', link: '/' },
			{ label: 'Change password', link: '/' },
			{ label: 'Recovery codes', link: '/' },
		],
	},
];

type SidebarProps = {
	mobileOpened: boolean;
	onToggleMobile: () => void;
};

export function Sidebar({ mobileOpened, onToggleMobile }: SidebarProps) {
	const links = mockdata.map((item) => (
		<LinksGroup {...item} key={item.label} />
	));

	return (
		<nav className={classes.navbar}>
			<div className={classes.header}>
				<Group justify="space-between">
					<Title order={3}>KIAD</Title>
					<SidebarToggler
						opened={mobileOpened}
						onToggle={onToggleMobile}
						hiddenFrom="sm"
					/>
				</Group>
			</div>

			<ScrollArea className={classes.links}>
				<div className={classes.linksInner}>{links}</div>
			</ScrollArea>
		</nav>
	);
}
