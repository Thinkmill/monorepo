import React from 'react';
import { Flex, Link, Text, Box, List, ListItem, useTheme } from "@chakra-ui/react"
import '../../docs/index.md';
import { css } from '@emotion/css';

const config = [
  {
    title: 'Concepts',
    pages: [
      { title: 'What is a monorepo', md: '../docs/what-is-a-monorepo' },
    ],
  },
  {
    title: 'How to',
    md: '../docs/scenarios.md'
  }
]

const Sidebar = () => {
  const { fontSizes, lineHeights, space } = useTheme();

  const list1Styles = { fontSize: fontSizes.xs };
  const list2Styles = { fontSize: fontSizes.xs, paddingLeft: space[2] };

  const list1ItemStyles = { lineHeight: lineHeights.base, margin: `${space[4]} 0` };
  const list2ItemStyles = { lineHeight: lineHeights.base, margin: `${space[2]} 0` };

  const link1Styles = { color: true ? 'gray.500' : 'gray.900' };
  const link2Styles = { color: true ? 'gray.500' : 'gray.900' };

  return (
    <List {...list1Styles}>
      <ListItem {...list1ItemStyles} marginTop={space[2]}>I want to —
        <List {...list2Styles}>
          <ListItem {...list2ItemStyles}><Link {...link2Styles}>build an app</Link></ListItem>
          <ListItem {...list2ItemStyles}><Link {...link2Styles}>build an app with a design system</Link></ListItem>
          <ListItem {...list2ItemStyles}><Link {...link2Styles}>build an open source library</Link></ListItem>
          <ListItem {...list2ItemStyles}><Link {...link2Styles}>use packages outside of the monorepo</Link></ListItem>
          <ListItem {...list2ItemStyles}><Link {...link2Styles}>bring existing packages in to the monorepo</Link></ListItem>
        </List>
      </ListItem>
      <ListItem {...list1ItemStyles}><Link {...link1Styles}>Key concepts</Link>
        <List {...list2Styles}>
          <ListItem {...list2ItemStyles}><Link {...link2Styles}>Why monorepo?</Link></ListItem>
          <ListItem {...list2ItemStyles}><Link {...link2Styles}>Endpoints</Link></ListItem>
        </List>
      </ListItem>
      <ListItem {...list1ItemStyles}><Link {...link2Styles}>Deep dive</Link>
        <List {...list2Styles}>
          <ListItem {...list2ItemStyles}><Link {...link2Styles}>Thinking in monorepos</Link></ListItem>
        </List>
      </ListItem>
    </List>
  )
}

export const DocsLayout = ({ children }) => {
  const { space } = useTheme();
  return (
    <Flex>
      <Box w={200} paddingRight={space[4]}>
        <Sidebar />
      </Box>
      <Box>
        <Text>{children}</Text>
      </Box>
    </Flex>
  )
}
