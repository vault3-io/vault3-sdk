import {
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery,
} from "@tanstack/react-query";
import { graphql } from "generated";
import { graphQLClient } from "utils/graphql";
import {
	FormOverviewQuery,
	CheckFormEntryConditionsQuery,
	CreateFormEntryMutation,
	CreateFormEntryMutationVariables,
} from "generated/graphql";

export const queryFormOverviewById = graphql(`
	query FormOverview($id: String!) {
		formById(id: $id) {
			id
			name
			description
			branding {
				backgroundColor
				fontColor
				primaryColor
				secondaryColor
				logoFileContent
				logoFileMime
				logoFileName
				failureCallToActionButtonText
				failureCallToActionText
				failureCallToActionURL
				successCallToActionButtonText
				successCallToActionText
				successCallToActionURL
				secondaryFailureCallToActionButtonText
				secondaryFailureCallToActionURL
				secondarySuccessCallToActionButtonText
				secondarySuccessCallToActionURL
				x
				discord
				telegram
				youtube
				websiteURL
			}
			isActive
		}
	}
`);

export function useQueryFormOverviewById({
	id,
	...options
}: { id: string } & UseQueryOptions<
	unknown,
	unknown,
	FormOverviewQuery["formById"]
>) {
	const query = useQuery<unknown, unknown, FormOverviewQuery["formById"]>({
		queryKey: ["formById", id],
		queryFn: async () =>
			(
				await graphQLClient.request(queryFormOverviewById, {
					id: id,
				})
			).formById,
		...options,
	});
	return { ...query, form: query.data };
}

export const mutationCreateFormEntry = graphql(`
	mutation CreateFormEntry($formId: String!, $values: JSONObject!) {
		createFormEntry(formId: $formId, values: $values) {
			id
		}
	}
`);

export function useMutationCreateFormEntry(
	options?: UseMutationOptions<
		CreateFormEntryMutation["createFormEntry"],
		unknown,
		CreateFormEntryMutationVariables
	>
) {
	const mutation = useMutation<
		CreateFormEntryMutation["createFormEntry"],
		unknown,
		CreateFormEntryMutationVariables
	>({
		mutationFn: async (data) =>
			(await graphQLClient.request(mutationCreateFormEntry, data))
				.createFormEntry,
		...options,
	});
	return { ...mutation, form: mutation.data };
}

export const queryCheckFormEntryConditions = graphql(`
	query CheckFormEntryConditions($formId: String!) {
		checkFormEntryConditions(formId: $formId)
	}
`);

export function useQueryCheckFormEntryConditions({
	formId,
	...options
}: { formId: string } & UseQueryOptions<
	unknown,
	unknown,
	CheckFormEntryConditionsQuery["checkFormEntryConditions"]
>) {
	const query = useQuery<
		unknown,
		unknown,
		CheckFormEntryConditionsQuery["checkFormEntryConditions"]
	>({
		queryKey: ["checkFormEntryConditions", formId],
		queryFn: async () =>
			(
				await graphQLClient.request(queryCheckFormEntryConditions, {
					formId: formId,
				})
			).checkFormEntryConditions,
		...options,
	});
	return { ...query, hasAccess: query.data };
}
