import React, { useMemo } from 'react';
import { DocsLayout } from "../../components/docs-layout";
import { useRouter } from 'next/router';
import { learnConfig } from '../../docs-route-config';

const LearnPage = () => {
	const { query } = useRouter();
	const { id } = query;

	const Page = useMemo(() => {
		const routeConfig = learnConfig.items.find(i => i.routeId === id);
		return require('../../docs/' + routeConfig.page).default;
	}, [id]);

	return (
		<DocsLayout title={'Learn'}>
			<Page />
		</DocsLayout>
	)
}

export default LearnPage;
