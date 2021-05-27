import React from 'react';
import { Container, useTheme } from "@chakra-ui/react";
import { AppHeader } from './app-header';

export const AppLayout = ({ children }) => {
	const { space } = useTheme();
	return (
		<div style={{ height: '100%' }}>
			<Container maxW="container.md" p={10}>
				<div style={{ marginBottom: space[6] }}>
					<AppHeader />
				</div>
				<div>
					{children}
				</div>
			</Container>
		</div>
	)
}
