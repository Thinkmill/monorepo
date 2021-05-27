import React from 'react';
import {Badge} from "@chakra-ui/react";

export const ComingSoonBadge = ({ size = 'sm' }) => {
	let fontSize = 'inherit';
	if (size === 'sm') {
		fontSize = 7;
	}
	return <Badge fontSize={fontSize}>COMING SOON</Badge>
}
