import { AccessConditions } from "utils/enums";

export function generateSocketData(condition: string) {
	switch (condition) {
		case AccessConditions.whitelist:
			return {
				backgroundColor: "yellow.50",
				color: "yellow.900",
				name: "whitelist",
			};
		case AccessConditions.token:
			return {
				backgroundColor: "green.50",
				color: "green.400",
				name: "token owner",
			};
		case AccessConditions.stakePool:
			return {
				backgroundColor: "blue.50",
				color: "blue.700",
				name: "stake pool",
			};
		default:
			return {
				backgroundColor: "gray.100",
				color: "black",
				name: "undefined",
			};
	}
}
