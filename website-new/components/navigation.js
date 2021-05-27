import React from 'react';
import { Flex, Center, Box, Select, Text, useTheme, Stack } from "@chakra-ui/react";
import { useRouter } from 'next/router';

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
							<option value="/scenario/to-build-an-app">build an app</option>
							<option value="/scenario/to-build-an-app-with-a-design-system">build an app with a design system</option>
							<option value="/scenario/to-publish-an-open-source-library">build an open source library</option>
							<option value="/scenario/to-publish-packages">use packages outside of the monorepo</option>
							<option value="/scenario/to-bring-existing-packages-into-a-monorepo">bring existing packages in to the monorepo</option>
						</Select>
					</Box>
				</Flex>
			</Stack>
		</>
	)
}
