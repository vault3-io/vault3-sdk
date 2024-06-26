import { Flex, IconButton, Text } from "@chakra-ui/react";
import { IMainState } from "@cyntler/react-doc-viewer/dist/esm/store/mainStateReducer";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface CustomHeaderProps {
	state: IMainState;
	previousDocument: () => void;
	nextDocument: () => void;
	filesLength: number;
}

export const ViewerHeader = ({
	state,
	previousDocument,
	nextDocument,
	filesLength,
}: CustomHeaderProps) => {
	if (!state?.currentDocument || state?.config?.header?.disableFileName) {
		return null;
	}

	return (
		<Flex justifyContent="space-between" alignItems="center">
			<Text
				fontSize="24px"
				fontWeight="700"
				lineHeight="36px"
				my="10px"
				size="sm"
			>
				{state?.currentDocument.fileName ?? ""}
			</Text>
			<Flex gap={2} alignItems="center">
				<IconButton
					icon={<FaArrowLeft />}
					aria-label="prev-button"
					size="sm"
					backgroundColor="transparent"
					color="blue.700"
					borderRadius="50%"
					fontSize="16px"
					width="36px"
					height="36px"
					type="button"
					isDisabled={state?.currentFileNo === 0}
					onClick={previousDocument}
				/>
				<Text>
					{state?.currentFileNo + 1} of {filesLength}
				</Text>
				<IconButton
					icon={<FaArrowRight />}
					aria-label="next-button"
					size="sm"
					backgroundColor="transparent"
					color="blue.700"
					borderRadius="50%"
					fontSize="16px"
					width="36px"
					height="36px"
					type="button"
					isDisabled={
						state?.currentFileNo >= state?.documents.length - 1
					}
					onClick={nextDocument}
				/>
			</Flex>
		</Flex>
	);
};
