import { Button } from "@chakra-ui/react";

interface SecondaryCallToActionButtonProps {
	callToActionText: string | null | undefined;
	callToActionURL: string | null | undefined;
	primaryColor?: string | null | undefined;
	secondaryColor?: string | null | undefined;
}

export function SecondaryCallToActionButton(
	props: SecondaryCallToActionButtonProps
) {
	if (!props.callToActionURL || !props.callToActionText) {
		return <></>;
	}

	return (
		<a href={props.callToActionURL}>
			<Button
				w="2xs"
				h="14"
				variant="outline"
				bg="none"
				border="2px"
				borderColor={props.secondaryColor || "brand.light"}
				fontSize="20"
				rounded="2xl"
				textColor={props.primaryColor || "brand.dark"}
				transition="0.3s"
				_hover={{
					bgGradient:
						props.primaryColor && props.secondaryColor
							? `linear(to-r, ${props.primaryColor}, ${props.secondaryColor})`
							: "linear(to-r, #4DDDE0, #5E17EB)",
					borderColor: props.primaryColor || "brand.dark",
					textColor: "white",
				}}
			>
				{props.callToActionText || "Check it out"}
			</Button>
		</a>
	);
}
