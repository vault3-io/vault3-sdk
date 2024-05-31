import { Button } from "@chakra-ui/react";

interface MainCallToActionButtonProps {
	callToActionText: string | null | undefined;
	callToActionURL: string | null | undefined;
	primaryColor?: string | null | undefined;
	secondaryColor?: string | null | undefined;
}

export function MainCallToActionButton(props: MainCallToActionButtonProps) {
	if (!props.callToActionURL || !props.callToActionText) {
		return <></>;
	}

	return (
		<a href={props.callToActionURL}>
			<Button
				bgColor={props.primaryColor || "brand.900"}
				w="2xs"
				h="14"
				fontSize="20"
				rounded="2xl"
				transition="0.3s"
				_hover={{
					bgColor: props.secondaryColor || "brand.50",
					textColor: props.primaryColor || "brand.900",
				}}
			>
				{props.callToActionText || "Check it out"}
			</Button>
		</a>
	);
}
