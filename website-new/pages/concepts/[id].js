import React,{ useMemo } from 'react';
import { DocsLayout } from "../../components/docs-layout";
import { conceptsConfig } from '../../docs-route-config';
import {useRouter} from "next/router";

const ConceptsPage = () => {
	const { query } = useRouter();
	const { id } = query;

	const Page = useMemo(() => {
		const routeConfig = conceptsConfig.items.find(i => i.routeId === id);
		return require('../../docs/' + routeConfig.page).default;
	}, [id]);

	return (
		<DocsLayout title={'Concepts'}>
			<Page />
		</DocsLayout>
	)
}

export default ConceptsPage;
