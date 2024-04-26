import { Stack, keyframes, Box, StackProps } from "@chakra-ui/react";

export default function Vault3Spinner({
	color,
	...props
}: { color: "purple" | "blue" | "black" | "white" } & StackProps) {
	const animationKeyframes = keyframes`
    0% { transform: rotate(0); }
    10% { transform: rotate(30deg); }
    20% { transform: rotate(-30deg); }
    30% { transform: rotate(30deg); }
    40% { transform: rotate(0); }
    100% { transform:  rotate(0); }`;
	const animation = `${animationKeyframes} 3s ease-in-out infinite`;

	return (
		<Stack alignSelf="center" {...props}>
			<Box animation={animation} alignSelf="center">
				<img
					src={`https://vault3.io/assets/vault3_icon_${color}.svg`}
					alt="VAULT3 icon"
					width={80}
					height={80}
				/>
			</Box>
		</Stack>
	);
}
