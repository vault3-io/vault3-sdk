import { extendTheme } from "@chakra-ui/react";
import { theme as proTheme } from "@chakra-ui/pro-theme";

import "@fontsource-variable/inter";

import { mode } from "@chakra-ui/theme-tools";

const overrides = {
	config: {
		initialColorMode: "light",
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
		blue: {
			"50": "#e6f3ff",
			"100": "#c4e1ff",
			"200": "#9fcfff",
			"300": "#7cbcff",
			"400": "#67acff",
			"500": "#5c9dff",
			"600": "#5a8efa",
			"700": "#557be5",
			"800": "#516ad2",
			"900": "#4949b1",
		},
		red: {
			"50": "#fdebef",
			"100": "#fbcdd4",
			"200": "#e99a9e",
			"300": "#de7479",
			"400": "#e85459",
			"500": "#ed4442",
			"600": "#de3b40",
			"700": "#cc323a",
			"800": "#bf2c33",
			"900": "#af2228",
		},
		gray: {
			"50": "#f5f9ff",
			"100": "#eef2f9",
			"200": "#e4e8f0",
			"300": "#d4d8df",
			"400": "#b1b4bb",
			"500": "#91949b",
			"600": "#696c72",
			"700": "#55595f",
			"800": "#373a40",
			"900": "#171a1f",
		},
		green: {
			"50": "#e9f3ea",
			"100": "#cbe1cb",
			"200": "#abceaa",
			"300": "#8bbc8a",
			"400": "#75af73",
			"500": "#61a25c",
			"600": "#579353",
			"700": "#4d8249",
			"800": "#447140",
			"900": "#31522e",
		},
		yellow: {
			"50": "#fff6e2",
			"100": "#fde7b9",
			"200": "#f9d88b",
			"300": "#f4c95f",
			"400": "#efbe3c",
			"500": "#eab50d",
			"600": "#daa50d",
			"700": "#c49109",
			"800": "#ae7c07",
			"900": "#8a5904",
		},
	},
	components: {
		Button: {
			variants: {
				link: {
					transition: "color 0.5s ease",
					fontSize: "0.875rem",
					gridRow: "2",
					maxW: "100%",
				},
				primaryAction: {
					backgroundColor: "blue.700",
					color: "white",
					p: "18px 15px",
					_hover: {
						backgroundColor: "blue.800",
						_disabled: {
							backgroundColor: "blue.700",
						},
					},
				},
				secondaryAction: {
					backgroundColor: "blue.50",
					color: "blue.700",
					p: "18px 15px",
					_hover: { backgroundColor: "blue.100" },
				},
				modalAction: {
					fontSize: "18px",
					backgroundColor: "blue.700",
					color: "white",
					maxW: "150px",
					width: "150px",
					_hover: {
						backgroundColor: "blue.800",

						_disabled: {
							backgroundColor: "blue.700",
						},
					},
				},
				secondaryModalAction: {
					fontSize: "18px",
					backgroundColor: "blue.50",
					color: "blue.700",
					p: "18px 15px",
					maxW: "150px",
					width: "150px",
					_hover: {
						backgroundColor: "blue.100",

						_disabled: {
							backgroundColor: "blue.50",
						},
					},
				},
			},
		},
		Table: {
			baseStyle: {
				thead: {
					tr: {
						backgroundColor: "gray.50",

						th: {
							fontSize: "14px",
							fontWeight: "600",
							userSelect: "none",
							color: "gray.700",
							gap: "4px",

							div: {
								alignItems: "center",
								fontSize: "14px",
								fontWeight: "600",
								userSelect: "none",
								color: "gray.700",
								gap: "4px",
							},
						},
					},
				},
				tbody: {
					tr: {
						backgroundColor: "white",
						color: "gray.900",
						_hover: { backgroundColor: "gray.50" },

						"td:last-of-type": {
							textAlign: "right",
						},
					},
					"tr:last-of-type": {
						td: { borderBottom: "none" },
					},
				},
			},
		},
		FormLabel: {
			defaultProps: {
				variant: "app",
			},
			variants: {
				app: {
					fontWeight: 700,
					marginBottom: "0.125rem",
				},
			},
		},
		Input: {
			defaultProps: {
				variant: "filled",
			},
			variants: {
				filled: {
					field: {
						background: "gray.100",
						_hover: {
							background: "gray.200",
						},
					},
				},
			},
		},
		Textarea: {
			defaultProps: {
				variant: "filled",
			},
			variants: {
				filled: {
					backgroundColor: "gray.100",
				},
			},
		},
		Tabs: {
			baseStyle: {},
			variants: {
				line: {
					tablist: {
						borderColor: "transparent",
					},
					tab: {
						boxSizing: "border-box",
						color: "gray.600",
						borderBottomWidth: 4,
						padding: "0.75rem",
						_selected: {
							color: "blue.700",
							fontWeight: 700,
						},
					},
					tabpanel: {
						paddingLeft: 0,
						paddingRight: 0,
					},
				},
			},
		},
		Icon: {
			baseStyle: {
				display: "flex",
			},
		},
	},
	styles: {
		global: (props: any) => ({
			body: {
				bg: mode("white", "gray.300")(props),

				//workaround - table container doesn't work out of styles object
				".chakra-table__container": {
					border: "1px solid",
					borderColor: "gray.200",
					borderRadius: "md",
				},
			},
		}),
	},
};

export default extendTheme(overrides, proTheme);
