import React from 'react';
import { Badge as ChakraBadge } from "@chakra-ui/react";

const Badge = ({ size = 'sm', text = 'lorem', ...props }) => {
	let fontSize = 'inherit';
	if (size === 'sm') {
		fontSize = 7;
	}
	return <ChakraBadge fontSize={fontSize} {...props}>{text}</ChakraBadge>
}

export const ComingSoonBadge = () => <Badge text={'COMING SOON'} />
