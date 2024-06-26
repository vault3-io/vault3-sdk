import { IoBugOutline } from "react-icons/io5";
import { NoDataBox } from "../no-data-box/NoDataBox";

export const ErrorBox = () => {
	return (
		<NoDataBox
			title="Something went wrong"
			description="Please try again later. If the problem persists, we are here to help."
			icon={IoBugOutline}
			primaryButtonText="Open a support ticket"
			primaryButtonAction={() =>
				window.open("https://discord.gg/drHsXRgqfS")
			}
		/>
	);
};
