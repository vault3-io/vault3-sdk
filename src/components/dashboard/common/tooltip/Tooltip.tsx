import { Tooltip as ChakraTooltip, TooltipProps } from "@chakra-ui/react";

export function Tooltip({
	children,
	label,
	openDelay = 0,
	placement = "right-end",
}: Pick<TooltipProps, "children" | "label" | "openDelay" | "placement">) {
	return (
		<ChakraTooltip
			label={label}
			placement={placement}
			backdropFilter="auto"
			backdropBlur="10px"
			textColor="brand.500"
			fontWeight="normal"
			bgColor="transparent"
			border="1px solid"
			borderColor="brand.500"
			rounded={"md"}
			maxW="xs"
			fontSize={16}
			openDelay={openDelay}
		>
			{children}
		</ChakraTooltip>
	);
}
