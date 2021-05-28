import React from 'react';
import { Flex, Center, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import { Logo } from './thinkmill-logo.svg';

export const AppHeader = () => {
	return (
		<NextLink href={'/'}>
			<Flex>
				<Center sx={{ marginRight: 2 }}>
					<Logo size={24} />
				</Center>
				<Center>
					<Heading as={'h1'} size={'sm'} sx={{ display: 'inline', fontWeight: 500, color: 'gray.800', letterSpacing: 0 }}>Monorepo Style Guide</Heading>
				</Center>
			</Flex>
		</NextLink>
	)
}
