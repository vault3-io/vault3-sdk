import { Dispatch, SetStateAction, useEffect } from "react";
import { SpaceSummaryForm } from "src/components/dashboard/forms/spaces/summary-form/SummaryForm";
import { FormProvider, useForm } from "react-hook-form";
import { useMutationUpdateSpace } from "hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { summaryScheme } from "utils/resolvers/summaryScheme";
import { SpaceDetailsQuery } from "generated/graphql";
import { SummaryFormData } from "types/form-data/summaryFormData";

interface Props {
	id: string;
	space: SpaceDetailsQuery["spaceById"];
	disableSaveButton: Dispatch<SetStateAction<boolean>>;
	startLoading: Dispatch<SetStateAction<boolean>>;
}

export const SummaryTab = ({
	space,
	id,
	disableSaveButton,
	startLoading,
}: Props) => {
	const { name, slug, description, isActive } = space;

	const { mutate: updateSpace, isLoading: isSpaceUpdating } =
		useMutationUpdateSpace();

	useEffect(() => startLoading(isSpaceUpdating), [isSpaceUpdating]);

	const methods = useForm({
		resolver: yupResolver(summaryScheme),
		defaultValues: {
			name: name ?? "",
			slug: slug ?? "",
			description: description ?? "",
			isActive: isActive,
		},
	});

	const { reset, getValues } = methods;

	const onSubmit = (data: SummaryFormData) => {
		updateSpace(
			{ id, ...data },
			{ onSuccess: () => reset({ ...getValues() }) }
		);
	};

	return (
		<FormProvider {...methods}>
			<SpaceSummaryForm
				spaceId={id}
				disableSaveButton={disableSaveButton}
				onSubmit={onSubmit}
			/>
		</FormProvider>
	);
};
