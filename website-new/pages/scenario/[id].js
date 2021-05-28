import React, { useMemo } from 'react';
import { DocsLayout } from "../../components/docs-layout";
import { useRouter } from 'next/router';
import { scenarioConfig } from '../../docs-route-config';

const ScenarioPage = () => {
	const { query } = useRouter();
	const { id } = query;

	const Page = useMemo(() => {
		const routeConfig = scenarioConfig.items.find(i => i.routeId === id);
		return require('../../docs/' + routeConfig.page).default;
	}, [id]);

	return (
		<DocsLayout title={'Scenario'}>
			<Page />
		</DocsLayout>
	);
}

export default ScenarioPage;
