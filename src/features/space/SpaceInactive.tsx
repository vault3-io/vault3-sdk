import { DiscoverVAULT3Button } from "../../components";
import { SpaceTemplate } from "./SpaceTemplate";
import { FiPower } from "react-icons/fi";

interface SpaceInactiveProps {
	fontColor?: string | null | undefined;
	primaryColor?: string | null | undefined;
}

export function SpaceInactive(props: SpaceInactiveProps) {
	return (
		<SpaceTemplate
			icon={FiPower}
			title="This space seems to be inactive"
			description="Get in touch with the creator and try again later."
			primaryColor={props.primaryColor}
			fontColor={props.fontColor}
		/>
	);
}
