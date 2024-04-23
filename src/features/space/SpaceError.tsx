import { DiscoverVAULT3Button } from "../../components";
import { SpaceTemplate } from "./SpaceTemplate";
import { BiBug } from "react-icons/bi";

interface SpaceErrorProps {
	fontColor?: string | null | undefined;
	primaryColor?: string | null | undefined;
}

export function SpaceError({ primaryColor, fontColor }: SpaceErrorProps) {
	return (
		<SpaceTemplate
			icon={BiBug}
			title="We couldn't find any space for this access link"
			description="Make sure you used the right URL or get in touch with the creator."
			primaryColor={primaryColor}
			fontColor={fontColor}
		/>
	);
}
