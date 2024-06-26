import { Flex, Text } from "@chakra-ui/react";
import { generateSocketData } from "./utils";
import { Tooltip } from "src/components/dashboard/common/tooltip/Tooltip";

interface ConditionSocketProps {
	condition: string;
	title?: string;
	pointer?: boolean;
}

interface Props {
	conditions: { id: string; type: string; name: string }[];
	showConditionName?: boolean;
}

export function ConditionSocket({
	condition,
	pointer,
	title = "",
}: ConditionSocketProps) {
	const { backgroundColor, color, name } = generateSocketData(condition);

	return (
		<Tooltip label={title ?? ""} placement="bottom">
			<Text
				display="inline"
				textAlign="center"
				fontSize="12px"
				padding="4px 8px"
				borderRadius="14px"
				backgroundColor={backgroundColor}
				color={color}
				cursor={pointer ? "pointer" : "default"}
			>
				{name}
			</Text>
		</Tooltip>
	);
}

export function ConditionSockets({ conditions, showConditionName }: Props) {
	return (
		<Flex flexWrap="wrap" gap="6px">
			{!!conditions?.length &&
				conditions
					.filter((condition) => !!condition)
					.map((condition) => (
						<ConditionSocket
							key={condition.id}
							title={showConditionName ? condition.name : ""}
							condition={condition.type}
						/>
					))}
			{!conditions.length && "-"}
		</Flex>
	);
}
