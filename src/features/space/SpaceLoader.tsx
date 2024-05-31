import { Stack, Text, keyframes } from "@chakra-ui/react";
import { EaseInAnimation } from "../../animations";
import Vault3Spinner from "../../components/Vault3Spinner";

interface SpaceLoaderProps {
	message?: string;
	size?: "lg" | "md";
	primaryColor?: string | null | undefined;
	iconVariant?: "purple" | "blue" | "black" | "white";
}

export function SpaceLoader(props: SpaceLoaderProps) {
	const animationKeyframes = keyframes`
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }`;
	const animation = `${animationKeyframes} 3s ease-in-out infinite`;

	return (
		<EaseInAnimation>
			<Stack align="center" spacing={4}>
				<Vault3Spinner color={props.iconVariant || "purple"} mb={6} />
				<Text
					color={props.primaryColor || "brand.dark"}
					fontWeight={"semibold"}
					fontSize={props.size === "lg" ? "3xl" : "2xl"}
					textAlign="center"
					animation={animation}
				>
					{props.message || `Loading`}
				</Text>
			</Stack>
		</EaseInAnimation>
	);
}
