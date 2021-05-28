import React from 'react';
import { Text, Heading, UnorderedList, OrderedList, ListItem,   Table,
	Tbody,
	Tr,
	Th,
	Td,
	Link,
	Code,
	Image,
	Divider,
	Box,
} from "@chakra-ui/react";

export const MDXComponents = {
	p: ({ children }) => <Text sx={{ lineHeight: 'short', marginBottom: 4 }}>{children}</Text>,
	h1: ({ children }) => <Heading as="h1" size="xl">{children}</Heading>,
	h2: ({ children }) => <Heading as="h2" size="xl">{children}</Heading>,
	h3: ({ children }) => <Heading as="h3" size="lg">{children}</Heading>,
	h4: ({ children }) => <Heading as="h4" size="md">{children}</Heading>,
	h5: ({ children }) => <Heading as="h5" size="sm">{children}</Heading>,
	h6: ({ children }) => <Heading as="h6" size="sm">{children}</Heading>,
	blockquote: ({ children }) => (
		<Box sx={{ fontSize: 'lg', paddingTop: 3, paddingBottom: 1 }}>
			{children}
		</Box>
	),
	ul: ({ children }) => <UnorderedList>{children}</UnorderedList>,
	ol: ({ children }) => <OrderedList>{children}</OrderedList>,
	li: ({ children }) => <ListItem>{children}</ListItem>,
	table: ({ children }) => <Table>{children}</Table>,
	thead: ({ children }) => <Th>{children}</Th>,
	tbody: ({ children }) => <Tbody>{children}</Tbody>,
	tr: ({ children }) => <Tr>{children}</Tr>,
	td: ({ children }) => <Td>{children}</Td>,
	code: ({ children }) => <Code sx={{ display: 'block', whiteSpace: 'pre' }}>{children}</Code>,
	inlineCode: ({ children }) => <Code>{children}</Code>,
	pre: ({ children }) => <Text as={"pre"}>[TODO - style pre] {children}</Text>,
	em: ({ children }) => <Text as={"em"}>{children}</Text>,
	strong: ({ children }) => <Text sx={{ fontWeight: 'bold' }}>{children}</Text>,
	del: ({ children }) => <Text as={'del'}>{children}</Text>,
	hr: (props) => <Divider {...props} />,
	a: ({ children, ...props }) => <Link sx={{ textDecoration: 'underline' }} {...props}>{children}</Link>,
	img: (props) => <Image {...props} />,
}
