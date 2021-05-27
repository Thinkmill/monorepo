import React from 'react';
import { useRouter } from 'next/router';
import { DocsLayout } from "../../components/docs-layout";

const ScenarioPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const Page = require('../../docs/scenario/product.md').default;
	const metadata = require('../../docs/scenario/product.md').metadata;

	return (
		<DocsLayout>
			<h1>Scenario: {id}</h1>
			<Page />
		</DocsLayout>
	);
}

export default ScenarioPage;
