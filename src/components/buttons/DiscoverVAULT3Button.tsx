import { Button } from "@chakra-ui/react";

interface DiscoverVAULT3ButtonProps {
	primaryColor?: string | null | undefined;
	secondaryColor?: string | null | undefined;
}

export function DiscoverVAULT3Button(props: DiscoverVAULT3ButtonProps) {
	return (
		<a href={"/explore"}>
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
				{"Discover VAULT3"}
			</Button>
		</a>
	);
}
