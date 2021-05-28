import React from 'react';
import { Flex, Center, Box, Select, Text, Stack } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { scenarioConfig } from '../docs-route-config';

export const ScenarioSelect = ({ showTitle = true }) => {
	const router = useRouter();
	return (
		<>
			{showTitle && (
				<Stack>
					<Text sx={{ paddingTop: 4, paddingBottom: 4 }}>Which scenario best describes your use case?</Text>
				</Stack>
			)}
			<Stack>
				<Flex>
					<Center sx={{ wordWrap: 'initial', marginRight: 2 }}>
						<Text>I want to</Text>
					</Center>
					<Box sx={{ flex: 1 }}>
						<Select placeholder="Select one" onChange={(e) => {
							router.push(e.currentTarget.value);
						}}>
							{scenarioConfig.items.map((i, idx) => (
								<option value={i.href} key={idx}>{i.title}</option>
							))}
						</Select>
					</Box>
				</Flex>
			</Stack>
		</>
	)
}
