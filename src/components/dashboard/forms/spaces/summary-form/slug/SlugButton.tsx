import { useEffect, useRef, useState } from "react";
import { Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiLink2 } from "react-icons/fi";
import { useToastRender } from "hooks/useToast";

interface Props {
	isCreatingMode: boolean;
	isValidatorLoading: boolean;
	slugValue: string;
	isSlugValid: boolean;
}

export const SlugButton = ({
	isCreatingMode,
	slugValue,
	isValidatorLoading,
	isSlugValid,
}: Props) => {
	const { errorToast } = useToastRender();
	const textRef = useRef(null);
	const [copied, setCopied] = useState(false);
	const [text, setText] = useState(`https://vault3.io/space/${slugValue}`);

	useEffect(
		() => setText(`https://vault3.io/space/${slugValue}`),
		[slugValue]
	);

	const handleCopyToClipboard = async (textToCopy) => {
		try {
			await navigator.clipboard.writeText(textToCopy);
			setCopied(true);
			setText("Copied to clipboard!");
			setTimeout(() => {
				setCopied(false);
				setText(`https://vault3.io/space/${slugValue}`);
			}, 1000);
		} catch (error) {
			errorToast({
				title: "Error",
				description: "Failed to copy to clipboard",
			});
		}
	};

	const handleButtonClick = () => {
		const textToCopy = (textRef.current?.innerText as string) ?? "";
		handleCopyToClipboard(textToCopy);
	};

	return (
		<Button
			variant="link"
			isDisabled={isCreatingMode || isValidatorLoading || !isSlugValid}
			onClick={handleButtonClick}
			leftIcon={
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: copied ? 0 : 1 }}
					transition={{ duration: 0.5 }}
				>
					<FiLink2 color={copied ? "green" : "inherit"} />
				</motion.div>
			}
		>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: copied ? 0 : 1 }}
				transition={{ duration: 0.5 }}
			>
				<Text
					overflow="hidden"
					textOverflow="ellipsis"
					whiteSpace="nowrap"
					lineHeight="1"
					color={copied ? "green" : "inherit"}
					ref={textRef}
				>
					{text}
				</Text>
			</motion.div>
		</Button>
	);
};
