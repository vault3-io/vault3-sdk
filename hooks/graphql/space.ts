import {
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

import { graphql } from "generated";
import { graphQLClient } from "utils/graphql";
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
	SpaceDetailsQuery,
	UpdateSpaceBrandingMutationVariables,
	UpdateSpaceBrandingMutation,
	SpaceListQuery,
	UpdateSpaceMutation,
	UpdateSpaceMutationVariables,
	DeleteSpaceMutation,
	DeleteSpaceMutationVariables,
	SpaceSlugAvailableQuery,
	DuplicateSpaceMutation,
	DuplicateSpaceMutationVariables,
} from "generated/graphql";
import { useToastRender } from "../useToast";

export const querySpaceOverviewById = graphql(`
	query SpaceOverview($id: String!) {
		spaceById(id: $id) {
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

export function useQuerySpaceOverviewById({
	id,
	...options
}: { id: string } & UseQueryOptions<
	unknown,
	unknown,
	SpaceOverviewQuery["spaceById"]
>) {
	const query = useQuery<unknown, unknown, SpaceOverviewQuery["spaceById"]>({
		queryKey: ["spaceOverviewById", id],
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

export const querySpaceDetailsById = graphql(`
	query SpaceDetails($id: String!) {
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
			spaceAccessConditions {
				accessCondition {
					id
					name
					type
				}
			}
			isActive
		}
	}
`);

export function useQuerySpaceDetailsById({
	id,
	...options
}: { id: string } & UseQueryOptions<
	unknown,
	unknown,
	SpaceDetailsQuery["spaceById"]
>) {
	const query = useQuery<unknown, unknown, SpaceDetailsQuery["spaceById"]>({
		queryKey: ["spaceDetailsById", id],
		queryFn: async () =>
			(
				await graphQLClient.request(querySpaceDetailsById, {
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
	const queryClient = useQueryClient();
	const { errorToast } = useToastRender();

	const mutation = useMutation<
		CreateSpaceMutation["createSpace"],
		unknown,
		CreateSpaceMutationVariables
	>({
		mutationFn: async (data) =>
			(await graphQLClient.request(mutationCreateSpace, data))
				.createSpace,
		...options,
		onSuccess: () => {
			queryClient.invalidateQueries(["spaceList"]);
		},
		onError: (error: Error) => {
			errorToast({
				title: "Creating space has failed",
				description: error?.message ?? "",
			});
		},
	});
	return { ...mutation, space: mutation.data };
}

export const mutationUpdateSpace = graphql(`
	mutation updateSpace(
		$description: String
		$id: String!
		$name: String
		$slug: String
		$isActive: Boolean
	) {
		updateSpace(
			description: $description
			id: $id
			name: $name
			slug: $slug
			isActive: $isActive
		) {
			createdAt
			creatorId
			description
			id
			isActive
			name
			slug
			updatedAt
		}
	}
`);

export function useMutationUpdateSpace(
	options?: UseMutationOptions<
		UpdateSpaceMutation["updateSpace"],
		unknown,
		UpdateSpaceMutationVariables
	>
) {
	const queryClient = useQueryClient();
	const { errorToast, successToast } = useToastRender();

	const mutation = useMutation<
		UpdateSpaceMutation["updateSpace"],
		unknown,
		UpdateSpaceMutationVariables
	>({
		mutationFn: async (data) =>
			(await graphQLClient.request(mutationUpdateSpace, data))
				.updateSpace,
		...options,
		onSuccess: ({ name, id }) => {
			queryClient.invalidateQueries(["spaceList"]);
			queryClient.invalidateQueries(["spaceById", id]);
			successToast({ description: `${name} has been updated!` });
		},
		onError: (error: Error) => {
			errorToast({
				title: "Updating has failed",
				description: error?.message ?? "",
			});
		},
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
	const { errorToast, successToast } = useToastRender();
	const queryClient = useQueryClient();

	const mutation = useMutation<
		UpdateSpaceBrandingMutation["updateSpaceBranding"],
		unknown,
		UpdateSpaceBrandingMutationVariables
	>({
		mutationFn: async (data) =>
			(await graphQLClient.request(mutationUpdateSpaceBranding, data))
				.updateSpaceBranding,
		...options,
		onSuccess: ({ id }) => {
			queryClient.invalidateQueries(["spaceList"]);
			queryClient.invalidateQueries(["spaceById", id]);
			successToast({ description: `Space branding has been updated!` });
		},
		onError: (error: Error) => {
			errorToast({
				title: "Updating branding has failed",
				description: error?.message ?? "",
			});
		},
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
		$assetFingerprints: [String!]!
	) {
		createAssetOwnerAccessCondition(
			name: $name
			policyId: $policyId
			minAmount: $minAmount
			assetFingerprints: $assetFingerprints
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
					name
					type
				}
			}
		}
	}
`);

export function useQuerySpaceList({
	...options
}: UseQueryOptions<unknown, unknown, SpaceListQuery["spaces"]>) {
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

export const mutationDeleteSpace = graphql(`
	mutation deleteSpace($id: String!) {
		deleteSpace(id: $id) {
			createdAt
			creatorId
			description
			id
			isActive
			name
			slug
			updatedAt
		}
	}
`);

export function useMutationDeleteSpace(
	options?: UseMutationOptions<
		DeleteSpaceMutation["deleteSpace"],
		unknown,
		DeleteSpaceMutationVariables
	>
) {
	const queryClient = useQueryClient();
	const { errorToast, successToast } = useToastRender();

	const mutation = useMutation<
		DeleteSpaceMutation["deleteSpace"],
		unknown,
		DeleteSpaceMutationVariables
	>({
		mutationFn: async (data) =>
			(await graphQLClient.request(mutationDeleteSpace, data))
				.deleteSpace,
		...options,
		onSuccess: ({ name }) => {
			queryClient.invalidateQueries(["spaceList"]);
			successToast({
				description: `${name} has been removed successfully!`,
			});
		},
		onError: (error: Error) => {
			errorToast({
				title: "Removing has failed",
				description: error?.message ?? "",
			});
		},
	});
	return { ...mutation, space: mutation.data };
}

export const querySpaceSlugAvailable = graphql(`
	query spaceSlugAvailable($slug: String!, $ignoreSpaceId: String) {
		spaceSlugAvailable(slug: $slug, ignoreSpaceId: $ignoreSpaceId)
	}
`);

export function useQuerySpaceSlugAvailable({
	slug,
	ignoreSpaceId,
	...options
}: { slug: string; ignoreSpaceId?: string } & UseQueryOptions<
	unknown,
	unknown,
	SpaceSlugAvailableQuery["spaceSlugAvailable"]
>) {
	const { data: spaceSlugAvailable, ...rest } = useQuery<
		unknown,
		unknown,
		SpaceSlugAvailableQuery["spaceSlugAvailable"]
	>({
		queryKey: ["spaceSlugAvailable", slug],
		queryFn: async () =>
			(
				await graphQLClient.request(querySpaceSlugAvailable, {
					slug,
					ignoreSpaceId,
				})
			).spaceSlugAvailable,
		...options,
		enabled: !!slug.length,
	});
	return { ...rest, spaceSlugAvailable };
}

export const mutationDuplicateSpace = graphql(`
	mutation DuplicateSpace($id: String!) {
		duplicateSpace(id: $id) {
			id
		}
	}
`);

export function useMutationDuplicateSpace(
	options?: UseMutationOptions<
		DuplicateSpaceMutation["duplicateSpace"],
		unknown,
		DuplicateSpaceMutationVariables
	>
) {
	const queryClient = useQueryClient();
	const { errorToast } = useToastRender();

	const mutation = useMutation<
		DuplicateSpaceMutation["duplicateSpace"],
		unknown,
		DuplicateSpaceMutationVariables
	>({
		mutationFn: async (data) =>
			(await graphQLClient.request(mutationDuplicateSpace, data))
				.duplicateSpace,
		...options,
		onSuccess: () => queryClient.invalidateQueries(["spaceList"]),

		onError: (error: Error) => {
			errorToast({
				title: "Duplicating space has failed",
				description: error?.message ?? "",
			});
		},
	});
	return { ...mutation, accessCondition: mutation.data };
}
