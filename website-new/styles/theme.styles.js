import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
	styles: {
		global: {
			body: {
				bg: 'gray.50',
			},
		},
		fonts: {
			heading: "NeueHass",
			body: "NeueHass",
		},
		components: {
			List: {
				sizes: {
					sm: {
						fontSize: 'sm'
					}
				}
			}
		}
	}
});
