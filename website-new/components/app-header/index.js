import React from 'react';
import { Flex, Center, Heading , useTheme, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import { Logo } from './thinkmill-logo.svg';

export const AppHeader = () => {
	const { space } = useTheme();
	return (
		<NextLink href={'/'}>
			<Flex>
				<Center marginRight={space[2]}>
					<Logo size={24} />
				</Center>
				<Center>
					<Heading display={'inline'} as={'h1'} size={'sm'} fontWeight={500} color={'gray.800'} style={{ letterSpacing: 0 }}>Monorepo Style Guide</Heading>
				</Center>
			</Flex>
		</NextLink>
	)
}
