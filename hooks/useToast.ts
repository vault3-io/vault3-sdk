import { useToast } from "@chakra-ui/react";

interface ToastProps {
	title?: string;
	description?: string;
	duration?: number;
}

interface ToastRenderReturn {
	errorToast: (props: ToastProps) => void;
	successToast: (props: ToastProps) => void;
	warningToast: (props: ToastProps) => void;

}

export const useToastRender: () => ToastRenderReturn = () => {
	const toast = useToast();

	const errorToast = ({ title, description, duration }: ToastProps) =>
		toast({
			title: title ?? "Error",
			description: description ?? "",
			status: "error",
			duration: duration ?? 3000,
			position: "bottom-right",
			isClosable: true,
		});

	const successToast = ({ title, description, duration }: ToastProps) =>
		toast({
			title: title ?? "Success",
			description: description ?? "",
			status: "success",
			duration: duration ?? 3000,
			position: "bottom-right",
			isClosable: true,
		});

	const warningToast = ({ title, description, duration }: ToastProps) =>
		toast({
			title: title ?? "Warning",
			description: description ?? "",
			status: "warning",
			duration: duration ?? 3000,
			position: "bottom-right",
			isClosable: true,
		});

	return {
		errorToast,
		successToast,
		warningToast,
	};
};
