import React from 'react';
import { Flex, Center, Box, Select, Text, useTheme, Stack } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { ComingSoonBadge } from '../components/coming-soon-badge';

export const Navigation = ({ showTitle = true }) => {
	const router = useRouter();
	const { space } = useTheme();
	return (
		<>
			{showTitle && (
				<Stack>
					<Text py={space[4]}>Which scenario best describes your use case?</Text>
				</Stack>
			)}
			<Stack>
				<Flex>
					<Center marginRight={space[2]}>
						<Text>I want to</Text>
					</Center>
					<Box>
						<Select placeholder="Select one" onChange={(e) => {
							router.push(e.currentTarget.value);
						}}>
							<option value="/scenario/to-build-an-app" disabled>build an app [coming soon]</option>
							<option value="/scenario/to-build-an-app-with-a-design-system" disabled>build an app with a design system [coming soon]</option>
							<option value="/scenario/to-publish-an-open-source-library" disabled>build an open source library [coming soon]</option>
							<option value="/scenario/to-publish-packages" disabled>use packages outside of the monorepo [coming soon]</option>
							<option value="/scenario/to-bring-existing-packages-into-a-monorepo" disabled>bring existing packages in to the monorepo [coming soon]</option>
						</Select>
					</Box>
				</Flex>
			</Stack>
		</>
	)
}
