import { Stack, keyframes, Box, StackProps, useTheme } from "@chakra-ui/react";

export default function Vault3Spinner({
	color,
	...props
}: { color: "purple" | "blue" | "black" | "white" } & StackProps) {
	const theme = useTheme();

	const animationKeyframes = keyframes`
    0% { transform: rotate(0); }
    10% { transform: rotate(30deg); }
    20% { transform: rotate(-30deg); }
    30% { transform: rotate(30deg); }
    40% { transform: rotate(0); }
    100% { transform:  rotate(0); }`;
	const animation = `${animationKeyframes} 3s ease-in-out infinite`;

	const fill = (() => {
		switch (color) {
			case "purple":
				return theme.colors.brand.dark;
			case "blue":
				return "#557be5";
			case "black":
				return "#000";
			case "white":
				return "#fff";
		}
	})();

	return (
		<Stack alignSelf="center" {...props}>
			<Box animation={animation} alignSelf="center" w={20}>
				<svg viewBox="0 0 450 449.999984">
					<path
						fill={fill}
						d="M 117.292969 20.695312 C 68.515625 29.484375 29.203125 69.074219 20.605469 118.03125 C 18.480469 130.199219 18.480469 169.304688 20.605469 174.421875 C 22.539062 178.960938 25.433594 181.957031 30.265625 184.5625 C 34.128906 186.6875 34.320312 186.6875 105.507812 186.6875 L 176.792969 186.6875 L 178.4375 181.28125 C 181.140625 172.78125 185.199219 166.214844 191.765625 160.035156 C 198.625 153.664062 204.804688 150.1875 213.015625 148.0625 C 234.941406 142.363281 259.089844 153.375 268.847656 173.746094 C 270.679688 177.609375 272.226562 181.761719 272.226562 182.824219 C 272.324219 187.363281 269.523438 187.265625 344.765625 186.976562 C 415.28125 186.6875 415.664062 186.6875 419.53125 184.5625 C 424.359375 181.957031 427.257812 178.960938 429.1875 174.421875 C 431.3125 169.304688 431.3125 130.199219 429.1875 118.03125 C 421.65625 75.0625 390.550781 38.945312 349.015625 25.042969 C 331.148438 19.054688 332.984375 19.152344 224.027344 19.25 C 142.699219 19.34375 123.574219 19.539062 117.292969 20.695312 Z M 117.292969 20.695312 "
						fillOpacity="1"
						fillRule="nonzero"
					/>
					<path
						fill={fill}
						d="M 29.589844 220.773438 C 26.980469 222.222656 23.792969 225.117188 22.34375 227.242188 L 19.640625 231.105469 L 19.351562 276.875 C 19.058594 327.378906 19.445312 332.207031 25.046875 348.816406 C 38.957031 390.335938 75.082031 421.527344 118.066406 429.058594 C 130.816406 431.277344 317.335938 431.277344 331.148438 429.058594 C 374.035156 422.007812 410.835938 390.53125 424.746094 348.816406 C 430.15625 332.496094 430.636719 327.28125 430.636719 278.132812 C 430.636719 235.355469 430.539062 233.328125 428.707031 229.65625 C 426.386719 225.117188 423.585938 222.414062 418.851562 219.90625 C 415.375 218.167969 412.285156 218.070312 341.578125 218.070312 L 267.878906 218.070312 L 265.175781 222.414062 C 263.628906 224.828125 259.863281 229.078125 256.675781 231.878906 L 250.976562 237.09375 L 250.976562 257.46875 C 250.976562 268.667969 250.492188 280.0625 249.914062 282.765625 C 248.464844 289.332031 243.734375 296.089844 238.035156 299.664062 C 233.6875 302.273438 232.527344 302.5625 224.992188 302.5625 C 217.652344 302.5625 216.203125 302.273438 212.050781 299.859375 C 209.539062 298.3125 206.160156 295.320312 204.515625 293.195312 C 199.589844 286.242188 198.816406 281.800781 198.816406 258.335938 L 198.816406 237.09375 L 193.117188 231.878906 C 189.929688 229.078125 186.164062 224.828125 184.617188 222.414062 L 181.914062 218.070312 L 34.128906 218.070312 Z M 29.589844 220.773438 "
						fillOpacity="1"
						fillRule="nonzero"
					/>
				</svg>
			</Box>
		</Stack>
	);
}
