import React from 'react';
import { Link, List, ListItem, useTheme, Text } from "@chakra-ui/react";
import NextLink from 'next/link';
import { config } from '../../docs-route-config';

export const AppSidebar = () => {
	const { space } = useTheme();
	return (
		<>
			<Text sx={{ fontWeight: 'bold', fontSize: 'sm', marginTop: 1 }}>Documentation</Text>
			<List sx={{ fontSize: 'xs' }}>
				{config.map((l1, idx1) => {
					const isActive = typeof window !== 'undefined' ? window.location.pathname.includes(l1.segment) : false;
					return (
						<ListItem sx={{ lineHeight: 'base', margin: `${space[4]} 0`, _first: { marginTop: 3 } }} key={idx1}><Text sx={{ color: isActive ? 'gray.900' : 'gray.500' }}>{l1.title} {l1.Badge && <l1.Badge />}</Text>
							<List sx={{ fontSize: 'xs', paddingLeft: 2 }}>
								{l1.items.map((l2, idx2) => {
									const isActive = typeof window !== 'undefined' ? window.location.pathname === l2.href : false;
									return (
										<ListItem sx={{ lineHeight: 'base', margin: `${space[2]} 0` }} key={idx2}>
											{!l2.disabled ? (
												<NextLink href={l2.href}>
													<Link sx={{ color: isActive ? 'gray.900' : 'gray.500', borderBottom: isActive ? '1px solid' : undefined, paddingBottom: '1px', _hover: { textDecoration: 'none', color: 'gray.900' } }}>{l2.title} {l2.Badge && <l2.Badge />}</Link>
												</NextLink>
											) : (
												<Link sx={{ cursor: 'initial', opacity: .5, _hover: { textDecoration: 'initial' }}}>{l2.title}</Link>
											)}
										</ListItem>
									)
								})}
							</List>
						</ListItem>
					)
				})}
			</List>
		</>
	)
};

