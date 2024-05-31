import { extendTheme } from "@chakra-ui/react";
import { theme as proTheme } from "@chakra-ui/pro-theme";

import "@fontsource-variable/inter";

import { mode } from "@chakra-ui/theme-tools";

const overrides = {
	config: {
		initialColorMode: "dark",
		useSystemColorMode: false,
	},
	colors: {
		...proTheme.colors,
		brand: {
			solid: "#0083FF",
			light: "#4DDDE0",
			dark: "#5E17EB",
			"50": "#4DDDE0",
			"100": "#00D1E8",
			"200": "#00C4F3",
			"300": "#00B6FF",
			"400": "#00A7FF",
			"500": "#0096FF",
			"600": "#0083FF",
			"700": "#006CFF",
			"800": "#004EFF",
			"900": "#5E17EB",
		},
	},
	styles: {
		global: (props: any) => ({
			body: {
				bg: mode("white", "gray.900")(props),
			},
		}),
	},
};

export default extendTheme(overrides, proTheme);
