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
} from "@chakra-ui/react";
import {useTheme} from "@emotion/react";

export const MDXComponents = {
	p: ({ children }) => {
		const { lineHeights, space } = useTheme();
		return <Text lineHeight={lineHeights.short} marginBottom={space[4]}>{children}</Text>
	},
	h1: ({ children }) => <Heading as="h1" size="2xl">{children}</Heading>,
	h2: ({ children }) => <Heading as="h2" size="xl">{children}</Heading>,
	h3: ({ children }) => <Heading as="h3" size="lg">{children}</Heading>,
	h4: ({ children }) => <Heading as="h4" size="md">{children}</Heading>,
	h5: ({ children }) => <Heading as="h5" size="sm">{children}</Heading>,
	h6: ({ children }) => <Heading as="h6" size="sm">{children}</Heading>,
	blockquote: ({ children }) => <Text as={"blockquote"}>[TODO - style blockquote] {children}</Text>,
	ul: ({ children }) => <UnorderedList>{children}</UnorderedList>,
	ol: ({ children }) => <OrderedList>{children}</OrderedList>,
	li: ({ children }) => <ListItem>{children}</ListItem>,
	table: ({ children }) => <Table>{children}</Table>,
	thead: ({ children }) => <Th>{children}</Th>,
	tbody: ({ children }) => <Tbody>{children}</Tbody>,
	tr: ({ children }) => <Tr>{children}</Tr>,
	td: ({ children }) => <Td>{children}</Td>,
	code: ({ children }) => <Code display={'block'} whiteSpace={'pre'}>{children}</Code>,
	inlineCode: ({ children }) => <Code>{children}</Code>,
	pre: ({ children }) => <Text as={"pre"}>[TODO - style pre] {children}</Text>,
	em: ({ children }) => <Text as={"em"}>{children}</Text>,
	strong: ({ children }) => <Text fontWeight={'bold'}>{children}</Text>,
	del: ({ children }) => <Text as={'del'}>{children}</Text>,
	hr: (props) => <Divider {...props} />,
	a: ({ children, ...props }) => <Link textDecoration={'underline'} {...props}>{children}</Link>,
	img: (props) => <Image {...props} />,
}
