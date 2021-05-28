import React from 'react';
import { Flex, Text, Box } from "@chakra-ui/react"
import { AppSidebar } from "../app-sidebar";

export const DocsLayout = ({ children, title }) => {
  return (
    <Flex>
      <Box sx={{ paddingRight: 6, width: 180 }}>
        <AppSidebar />
      </Box>
      <Box flex={1}>
        {title && <Text sx={{ fontSize: 'xs', marginBottom: '-2px' }}>{title}</Text>}
        {children}
      </Box>
    </Flex>
  )
}
