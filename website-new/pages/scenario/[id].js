import { useRouter } from 'next/router';

const ScenarioPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const Page = require('../../docs/scenario/product.md').default;
	const metadata = require('../../docs/scenario/product.md').metadata;

	return (
		<div>
			<h1>Scenario: {id}</h1>
			<Page />
		</div>
	);
}

export default ScenarioPage;
