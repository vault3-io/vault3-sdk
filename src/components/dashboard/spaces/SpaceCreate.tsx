import { ReactNode, useState } from "react";
import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EaseInAnimation } from "@vault/ui/components/animations/EaseInAnimation";

import { SpaceSummaryForm } from "src/components/dashboard/forms/spaces/summary-form/SummaryForm";
import { FiSave } from "react-icons/fi";
import { createSpaceScheme } from "utils/resolvers/createSpaceScheme";
import {
	useMutationCreateSpace,
	useQuerySpaceList,
	useToastRender,
} from "hooks";
import { TABS_IDS } from "./details/utils";
import { FirstSpaceModal } from "./modal/FirstSpaceModal";

interface Props {
	title?: ReactNode;
	onCreateGate: (id: string) => void;
}

interface FormData {
	name: string;
	slug: string;
	description: string;
}

export function SpaceCreate({ title, onCreateGate }: Props) {
	const { spaces, isLoading: spaceListLoading } = useQuerySpaceList({});
	const { mutate: createGate, isLoading } = useMutationCreateSpace();

	const { successToast } = useToastRender();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

	const methods = useForm({
		resolver: yupResolver(createSpaceScheme),
		defaultValues: {
			name: "",
			slug: "",
			description: "",
		},
	});

	const { watch, getValues } = methods;

	const onSubmit = (values: FormData) => {
		if (!spaces?.length) {
			onOpen();
		} else {
			createGate(values, {
				onSuccess: (data) => {
					onCreateGate(data.id);
					successToast({
						description: "New space has been created successfully!",
					});
				},
			});
		}
	};

	const handleFirstSpace = () => {
		createGate(getValues() as FormData, {
			onSuccess: (data) => {
				onCreateGate(data.id);
				onClose();
			},
		});
	};

	return (
		<EaseInAnimation duration={0.5}>
			<FormProvider {...methods}>
				<Flex justifyContent="space-between" align="start">
					{title ?? (
						<Heading size="md" fontWeight={700} mb={3}>
							New space
						</Heading>
					)}
					<Button
						size="sm"
						variant="primaryAction"
						type="submit"
						form={TABS_IDS.details}
						isLoading={isLoading}
						isDisabled={
							!watch("name") ||
							isSaveButtonDisabled ||
							spaceListLoading
						}
						leftIcon={<FiSave />}
					>
						Save
					</Button>
				</Flex>
				<SpaceSummaryForm
					disableSaveButton={setIsSaveButtonDisabled}
					onSubmit={onSubmit}
				/>
				<FirstSpaceModal
					isOpen={isOpen}
					onClose={onClose}
					createGate={handleFirstSpace}
					isLoading={isLoading}
				/>
			</FormProvider>
		</EaseInAnimation>
	);
}
