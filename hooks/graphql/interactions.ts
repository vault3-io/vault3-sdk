import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { graphql } from "generated";
import {
	RegisterInteractionMutation,
	RegisterInteractionMutationVariables,
} from "generated/graphql";
import { graphQLClient } from "utils";

export enum InteractionTopicType {
	CallToAction = "branding.calltoaction",
	SocialMedia = "branding.social",
	Website = "branding.website",
}

export enum InteractionCallToActionType {
	Success = "success",
	Fallback = "fallback",
	SecondarySuccess = "secondarySuccess",
	SecondaryFallback = "secondaryFallback",
}

export const mutationRegisterInteraction = graphql(`
	mutation RegisterInteraction(
		$action: InteractionActionType!
		$topic: String!
		$event: JSONObject!
	) {
		registerInteraction(action: $action, topic: $topic, event: $event) {
			id
		}
	}
`);

export function useMutationRegisterInteraction(
	options?: UseMutationOptions<
		RegisterInteractionMutation["registerInteraction"],
		unknown,
		RegisterInteractionMutationVariables
	>
) {
	const mutation = useMutation<
		RegisterInteractionMutation["registerInteraction"],
		unknown,
		RegisterInteractionMutationVariables
	>({
		mutationFn: async (data) =>
			(await graphQLClient.request(mutationRegisterInteraction, data))
				.registerInteraction,
		...options,
	});
	return { ...mutation, interaction: mutation.data };
}
