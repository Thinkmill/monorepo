export const config = [
	{
		title: 'I want to —',
		segment: 'scenario',
		items: [
			{ title: 'build an app', page: 'scenario/build-an-app.md', routeId: 'build-an-app', href: '/scenario/build-an-app', },
			{ title: 'build an app with a design system', page: 'scenario/build-an-app-with-a-design-system.md', routeId: 'build-an-app-with-a-design-system', href: '/scenario/build-an-app-with-a-design-system', },
			{ title: 'publish an open source library', page: 'scenario/publish-an-open-source-library.md', routeId: 'publish-an-open-source-library', href: '/scenario/publish-an-open-source-library', },
			{ title: 'publish packages', page: 'scenario/publish-packages.md', routeId: 'publish-packages', href: '/scenario/publish-packages', },
			{ title: 'bring in existing apps or packages', page: 'scenario/bring-in-existing-apps-or-packages.md', routeId: 'bring-in-existing-apps-or-packages', href: '/scenario/bring-in-existing-apps-or-packages', },
		]
	},
	{
		title: 'Concepts',
		segment: 'concepts',
		items: [
			{ title: 'Why monorepos?', page: 'concepts/why-monorepos.md', routeId: 'why-monorepos', href: '/concepts/why-monorepos'  },
			{ title: 'Thinking in monorepos', page: 'concepts/thinking-in-monorepos.md', routeId: 'thinking-in-monorepos', href: '/concepts/thinking-in-monorepos' },
		]
	},
	{
		title: 'Learn',
		segment: 'learn',
		items: [
			{ title: 'Continuous integration', page: 'learn/ci.md', routeId: 'continuous-integration', href: '/learn/continuous-integration' },
			{ title: 'Singular TypeScript instance', page: 'learn/singular-typescript-instance.md', routeId: 'singular-typescript-instance', href: '/learn/singular-typescript-instance' },
			{ title: 'Singular Jest instance', page: 'learn/singular-jest-instance.md', routeId: 'singular-jest-instance', href: '/learn/singular-jest-instance' },
		]
	}
]

export const scenarioConfig = config[0];
export const conceptsConfig = config[1];
export const learnConfig = config[2];
