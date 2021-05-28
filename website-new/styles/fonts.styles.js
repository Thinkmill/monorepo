import React from 'react';
import { Global } from "@emotion/react";

export const Fonts = () => (
	<Global
		styles={`
      @font-face {
		    font-family: 'NeueHass';
		    src: local('NeueHaasUnicaPro Regular'), local('NeueHaasUnicaPro-Regular'),
		    url('/fonts/NeueHaasUnicaPro-Regular.woff') format('woff');
		    font-weight: normal;
		    font-style: normal;
			}
			
			@font-face {
		    font-family: 'NeueHass';
		    src: local('NeueHaasUnicaPro Medium'), local('NeueHaasUnicaPro-Medium'),
		    url('/fonts/NeueHaasUnicaPro-Medium.woff') format('woff');
		    font-weight: 500;
		    font-style: normal;
			}
			
			@font-face {
		    font-family: 'NeueHass';
		    src: local('NeueHaasUnicaPro Bold'), local('NeueHaasUnicaPro-Bold'),
		    url('/fonts/NeueHaasUnicaPro-Bold.woff') format('woff');
		    font-weight: 600;
		    font-style: normal;
			}
    `}
	/>
)
