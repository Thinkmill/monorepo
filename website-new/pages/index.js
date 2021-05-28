import React from 'react';
import { DocsLayout } from "../components/docs-layout";
import Page from '../docs/home.md';

const Home = () => {
	return (
		<DocsLayout>
			<Page />
		</DocsLayout>
	)
}

export default Home;
