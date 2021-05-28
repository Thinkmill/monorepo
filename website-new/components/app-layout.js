import React from 'react';
import { Container, useTheme, Box } from "@chakra-ui/react";
import { AppHeader } from './app-header';

export const AppLayout = ({ children }) => {
	if (process.env.NODE_ENV === 'development') {
		const theme = useTheme();
		console.log('[Theme] ', theme);
	}
	return (
		<div style={{ height: '100%' }}>
			<Container sx={{ maxWidth: 'container.md', padding: 10 }}>
				<Box sx={{ marginBottom: 6 }}>
					<AppHeader />
				</Box>
				<Box>
					{children}
				</Box>
			</Container>
		</div>
	)
}
