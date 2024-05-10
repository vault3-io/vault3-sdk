import {
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery,
} from "@tanstack/react-query";
import { graphql } from "../../../generated";
import { graphQLClient } from "../../utils/graphql";
import {
	CreateSpaceMutation,
	CreateSpaceMutationVariables,
	AssignWhitelistAccessConditionMutation,
	AssignWhitelistAccessConditionMutationVariables,
	AssignAssetOwnerAccessConditionMutation,
	AssignAssetOwnerAccessConditionMutationVariables,
	AssignPoolDelegationAccessConditionMutation,
	AssignPoolDelegationAccessConditionMutationVariables,
	SpaceOverviewQuery,
	UpdateSpaceBrandingMutationVariables,
	UpdateSpaceBrandingMutation,
	SpaceListQuery,
} from "../../../generated/graphql";
import { RequestDocument } from "graphql-request";

export const querySpaceOverviewById = graphql(`
	query SpaceOverview($id: String!) {
		spaceById(id: $id) {
			name
			description
			slug
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

export const querySpaceList = graphql(`
	query SpaceList {
		spaces {
			id
			name
			isActive
			createdAt
			slug
			spaceAccessConditions {
				accessCondition {
					id
					type
				}
			}
		}
	}
`);

export function useQuerySpaceOverviewById({
	id,
	...options
}: { id: string } & UseQueryOptions<
	unknown,
	unknown,
	SpaceOverviewQuery["spaceById"]
>) {
	const query = useQuery<unknown, unknown, SpaceOverviewQuery["spaceById"]>({
		queryKey: ["spaceById", id],
		queryFn: async () =>
			(
				await graphQLClient.request(querySpaceOverviewById, {
					id: id,
				})
			).spaceById,
		...options,
	});
	return { ...query, space: query.data };
}

export const mutationCreateSpace = graphql(`
	mutation CreateSpace($name: String!, $description: String, $slug: String) {
		createSpace(name: $name, description: $description, slug: $slug) {
			id
		}
	}
`);

export function useMutationCreateSpace(
	options?: UseMutationOptions<
		CreateSpaceMutation["createSpace"],
		unknown,
		CreateSpaceMutationVariables
	>
) {
	const mutation = useMutation<
		CreateSpaceMutation["createSpace"],
		unknown,
		CreateSpaceMutationVariables
	>({
		mutationFn: async (data) =>
			(await graphQLClient.request(mutationCreateSpace, data))
				.createSpace,
		...options,
	});
	return { ...mutation, space: mutation.data };
}

export const mutationUpdateSpaceBranding = graphql(`
	mutation UpdateSpaceBranding(
		$id: String!
		$logoFileContent: String
		$logoFileName: String
		$logoFileMime: String
		$websiteURL: String
		$backgroundColor: String
		$fontColor: String
		$primaryColor: String
		$secondaryColor: String
		$x: String
		$discord: String
		$telegram: String
		$youtube: String
		$failureCallToActionButtonText: String
		$failureCallToActionText: String
		$failureCallToActionURL: String
		$successCallToActionButtonText: String
		$successCallToActionText: String
		$successCallToActionURL: String
		$secondaryFailureCallToActionButtonText: String
		$secondaryFailureCallToActionURL: String
		$secondarySuccessCallToActionButtonText: String
		$secondarySuccessCallToActionURL: String
	) {
		updateSpaceBranding(
			id: $id
			logoFileContent: $logoFileContent
			logoFileName: $logoFileName
			logoFileMime: $logoFileMime
			websiteURL: $websiteURL
			backgroundColor: $backgroundColor
			fontColor: $fontColor
			primaryColor: $primaryColor
			secondaryColor: $secondaryColor
			x: $x
			discord: $discord
			telegram: $telegram
			youtube: $youtube
			failureCallToActionButtonText: $failureCallToActionButtonText
			failureCallToActionText: $failureCallToActionText
			failureCallToActionURL: $failureCallToActionURL
			successCallToActionButtonText: $successCallToActionButtonText
			successCallToActionText: $successCallToActionText
			successCallToActionURL: $successCallToActionURL
			secondaryFailureCallToActionButtonText: $secondaryFailureCallToActionButtonText
			secondaryFailureCallToActionURL: $secondaryFailureCallToActionURL
			secondarySuccessCallToActionButtonText: $secondarySuccessCallToActionButtonText
			secondarySuccessCallToActionURL: $secondarySuccessCallToActionURL
		) {
			id
		}
	}
`);

export function useMutationUpdateSpaceBranding(
	options?: UseMutationOptions<
		UpdateSpaceBrandingMutation["updateSpaceBranding"],
		unknown,
		UpdateSpaceBrandingMutationVariables
	>
) {
	const mutation = useMutation<
		UpdateSpaceBrandingMutation["updateSpaceBranding"],
		unknown,
		UpdateSpaceBrandingMutationVariables
	>({
		mutationFn: async (data) =>
			(await graphQLClient.request(mutationUpdateSpaceBranding, data))
				.updateSpaceBranding,
		...options,
	});
	return { ...mutation, space: mutation.data };
}

export const mutationAssignWhitelistAccessCondition = graphql(`
	mutation AssignWhitelistAccessCondition(
		$name: String!
		$allow: [String!]!
	) {
		createWhitelistAccessCondition(name: $name, allow: $allow) {
			id
		}
	}
`);

export function useMutationAssignWhitelistAccessCondition(
	options?: UseMutationOptions<
		AssignWhitelistAccessConditionMutation["createWhitelistAccessCondition"],
		unknown,
		AssignWhitelistAccessConditionMutationVariables
	>
) {
	const mutation = useMutation<
		AssignWhitelistAccessConditionMutation["createWhitelistAccessCondition"],
		unknown,
		AssignWhitelistAccessConditionMutationVariables
	>({
		mutationFn: async (data) =>
			(
				await graphQLClient.request(
					mutationAssignWhitelistAccessCondition,
					data
				)
			).createWhitelistAccessCondition,
		...options,
	});
	return { ...mutation, policy: mutation.data };
}

export const mutationAssignAssetOwnerAccessCondition = graphql(`
	mutation AssignAssetOwnerAccessCondition(
		$name: String!
		$policyId: String!
		$minAmount: Int!
		$assetFingerprint: String!
	) {
		createAssetOwnerAccessCondition(
			name: $name
			policyId: $policyId
			minAmount: $minAmount
			assetFingerprint: $assetFingerprint
		) {
			id
		}
	}
`);

export function useMutationAssignAssetOwnerAccessCondition(
	options?: UseMutationOptions<
		AssignAssetOwnerAccessConditionMutation["createAssetOwnerAccessCondition"],
		unknown,
		AssignAssetOwnerAccessConditionMutationVariables
	>
) {
	const mutation = useMutation<
		AssignAssetOwnerAccessConditionMutation["createAssetOwnerAccessCondition"],
		unknown,
		AssignAssetOwnerAccessConditionMutationVariables
	>({
		mutationFn: async (data) =>
			(
				await graphQLClient.request(
					mutationAssignAssetOwnerAccessCondition,
					data
				)
			).createAssetOwnerAccessCondition,
		...options,
	});
	return { ...mutation, policy: mutation.data };
}

export const mutationAssignPoolDelegationAccessCondition = graphql(`
	mutation AssignPoolDelegationAccessCondition(
		$name: String!
		$poolId: String!
		$minEpochs: Int!
		$minDelegation: Int!
	) {
		createPoolDelegationAccessCondition(
			name: $name
			poolId: $poolId
			minEpochs: $minEpochs
			minDelegation: $minDelegation
		) {
			id
		}
	}
`);

export function useMutationAssignPoolDelegationAccessCondition(
	options?: UseMutationOptions<
		AssignPoolDelegationAccessConditionMutation["createPoolDelegationAccessCondition"],
		unknown,
		AssignPoolDelegationAccessConditionMutationVariables
	>
) {
	const mutation = useMutation<
		AssignPoolDelegationAccessConditionMutation["createPoolDelegationAccessCondition"],
		unknown,
		AssignPoolDelegationAccessConditionMutationVariables
	>({
		mutationFn: async (data) =>
			(
				await graphQLClient.request(
					mutationAssignPoolDelegationAccessCondition,
					data
				)
			).createPoolDelegationAccessCondition,
		...options,
	});
	return { ...mutation, policy: mutation.data };
}

export function useQuerySpaceList({
	...options
}: UseQueryOptions<unknown, unknown, any>) {
	const { data: spaces, ...rest } = useQuery<
		unknown,
		unknown,
		SpaceListQuery["spaces"]
	>({
		queryKey: ["spaceList"],
		queryFn: async () =>
			(await graphQLClient.request(querySpaceList)).spaces,
		...options,
	});
	return { ...rest, spaces };
}
