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
	AccessConditionByIdQuery,
	AccessConditionByNameQuery,
	AccessConditionListQuery,
	DeleteAccessConditionMutation,
	DeleteAccessConditionMutationVariables,
	DuplicateAccessConditionMutation,
	DuplicateAccessConditionMutationVariables,
	UpdateAssetOwnerAccessConditionMutation,
	UpdateAssetOwnerAccessConditionMutationVariables,
	UpdatePoolDelegationAccessConditionMutation,
	UpdatePoolDelegationAccessConditionMutationVariables,
	UpdateWhitelistAccessConditionMutation,
	UpdateWhitelistAccessConditionMutationVariables,
} from "generated/graphql";
import { useToastRender } from "../useToast";

export const queryAccessConditionList = graphql(`
	query AccessConditionList {
		accessConditions {
			id
			name
			type
			whitelistSettings {
				allow
			}
			assetOwnerSettings {
				policyId
				minAmount
				assetFingerprints
			}
			poolDelegationSettings {
				poolId
				minEpochs
				minDelegation
			}
		}
	}
`);

export function useQueryAccessConditionList({
	...options
}: UseQueryOptions<
	unknown,
	unknown,
	AccessConditionListQuery["accessConditions"]
>) {
	const { data: accessConditions, ...rest } = useQuery<
		unknown,
		unknown,
		AccessConditionListQuery["accessConditions"]
	>({
		queryKey: ["accessConditionList"],
		queryFn: async () =>
			(await graphQLClient.request(queryAccessConditionList))
				.accessConditions,
		...options,
	});
	return { ...rest, accessConditions };
}

export const queryAccessConditionById = graphql(`
	query AccessConditionById($id: String!) {
		accessConditionById(id: $id) {
			id
			name
			type
			whitelistSettings {
				allow
			}
			assetOwnerSettings {
				policyId
				minAmount
				assetFingerprints
			}
			poolDelegationSettings {
				poolId
				minEpochs
				minDelegation
			}
		}
	}
`);

export function useQueryAccessConditionById({
	id,
	...options
}: { id: string } & UseQueryOptions<
	unknown,
	unknown,
	AccessConditionByIdQuery["accessConditionById"]
>) {
	const query = useQuery<
		unknown,
		unknown,
		AccessConditionByIdQuery["accessConditionById"]
	>({
		queryKey: ["accessConditionById", id],
		queryFn: async () =>
			(
				await graphQLClient.request(queryAccessConditionById, {
					id: id,
				})
			).accessConditionById,
		...options,
	});
	return { ...query, accessCondition: query.data };
}

export const queryAccessConditionByName = graphql(`
	query AccessConditionByName($name: String!) {
		accessConditionByName(name: $name) {
			id
			name
			type
			whitelistSettings {
				allow
			}
			assetOwnerSettings {
				policyId
				minAmount
				assetFingerprints
			}
			poolDelegationSettings {
				poolId
				minEpochs
				minDelegation
			}
		}
	}
`);

export function useQueryAccessConditionByName({
	name,
	...options
}: { name: string } & UseQueryOptions<
	unknown,
	unknown,
	AccessConditionByNameQuery["accessConditionByName"]
>) {
	const query = useQuery<
		unknown,
		unknown,
		AccessConditionByNameQuery["accessConditionByName"]
	>({
		queryKey: ["accessConditionByName", name],
		queryFn: async () =>
			(
				await graphQLClient.request(queryAccessConditionByName, {
					name: name,
				})
			).accessConditionByName,
		...options,
	});
	return { ...query, accessCondition: query.data };
}

export const mutationDeleteAccessCondition = graphql(`
	mutation DeleteAccessCondition($id: String!) {
		deleteAccessCondition(id: $id) {
			id
			name
		}
	}
`);

export function useMutationDeleteAccessCondition(
	options?: UseMutationOptions<
		DeleteAccessConditionMutation["deleteAccessCondition"],
		unknown,
		DeleteAccessConditionMutationVariables
	>
) {
	const queryClient = useQueryClient();
	const { errorToast, successToast } = useToastRender();

	const mutation = useMutation<
		DeleteAccessConditionMutation["deleteAccessCondition"],
		unknown,
		DeleteAccessConditionMutationVariables
	>({
		mutationFn: async (data) =>
			(await graphQLClient.request(mutationDeleteAccessCondition, data))
				.deleteAccessCondition,
		...options,
		onSuccess: ({ name }) => {
			queryClient.invalidateQueries(["accessConditionList"]);

			successToast({
				description: `${name} has been removed successfully!`,
			});
		},
		onError: (error: Error) => {
			errorToast({
				title: "Removing access condition has failed",
				description: error?.message ?? "",
			});
		},
	});
	return { ...mutation, accessCondition: mutation.data };
}

export const mutationUpdateWhitelistAccessCondition = graphql(`
	mutation UpdateWhitelistAccessCondition(
		$id: String!
		$name: String!
		$allow: [String!]!
	) {
		updateWhitelistAccessCondition(id: $id, name: $name, allow: $allow) {
			id
			name
		}
	}
`);

export function useMutationUpdateWhitelistAccessCondition(
	options?: UseMutationOptions<
		UpdateWhitelistAccessConditionMutation["updateWhitelistAccessCondition"],
		unknown,
		UpdateWhitelistAccessConditionMutationVariables
	>
) {
	const queryClient = useQueryClient();
	const { errorToast, successToast } = useToastRender();

	const mutation = useMutation<
		UpdateWhitelistAccessConditionMutation["updateWhitelistAccessCondition"],
		unknown,
		UpdateWhitelistAccessConditionMutationVariables
	>({
		mutationFn: async (data) =>
			(
				await graphQLClient.request(
					mutationUpdateWhitelistAccessCondition,
					data
				)
			).updateWhitelistAccessCondition,
		...options,
		onSuccess: ({ name }) => {
			queryClient.invalidateQueries(["accessConditionList"]);
			queryClient.invalidateQueries(["accessConditionById"]);
			successToast({
				description: `${name} has been updated successfully!`,
			});
		},
		onError: (error: Error) => {
			errorToast({
				title: "Updating access condition has failed",
				description: error?.message ?? "",
			});
		},
	});
	return { ...mutation, accessCondition: mutation.data };
}

export const mutationUpdateAssetOwnerAccessCondition = graphql(`
	mutation UpdateAssetOwnerAccessCondition(
		$id: String!
		$name: String!
		$policyId: String!
		$minAmount: Int!
		$assetFingerprints: [String!]!
	) {
		updateAssetOwnerAccessCondition(
			id: $id
			name: $name
			policyId: $policyId
			minAmount: $minAmount
			assetFingerprints: $assetFingerprints
		) {
			id
			name
		}
	}
`);

export function useMutationUpdateAssetOwnerAccessCondition(
	options?: UseMutationOptions<
		UpdateAssetOwnerAccessConditionMutation["updateAssetOwnerAccessCondition"],
		unknown,
		UpdateAssetOwnerAccessConditionMutationVariables
	>
) {
	const queryClient = useQueryClient();
	const { errorToast, successToast } = useToastRender();

	const mutation = useMutation<
		UpdateAssetOwnerAccessConditionMutation["updateAssetOwnerAccessCondition"],
		unknown,
		UpdateAssetOwnerAccessConditionMutationVariables
	>({
		mutationFn: async (data) =>
			(
				await graphQLClient.request(
					mutationUpdateAssetOwnerAccessCondition,
					data
				)
			).updateAssetOwnerAccessCondition,
		...options,
		onSuccess: ({ name }) => {
			queryClient.invalidateQueries(["accessConditionList"]);
			queryClient.invalidateQueries(["accessConditionById"]);
			successToast({
				description: `${name} has been updated successfully!`,
			});
		},
		onError: (error: Error) => {
			errorToast({
				title: "Updating access condition has failed",
				description: error?.message ?? "",
			});
		},
	});
	return { ...mutation, accessCondition: mutation.data };
}

export const mutationUpdatePoolDelegationAccessCondition = graphql(`
	mutation UpdatePoolDelegationAccessCondition(
		$id: String!
		$name: String!
		$poolId: String!
		$minEpochs: Int!
		$minDelegation: Int!
	) {
		updatePoolDelegationAccessCondition(
			id: $id
			name: $name
			poolId: $poolId
			minEpochs: $minEpochs
			minDelegation: $minDelegation
		) {
			id
			name
		}
	}
`);

export function useMutationUpdatePoolDelegationAccessCondition(
	options?: UseMutationOptions<
		UpdatePoolDelegationAccessConditionMutation["updatePoolDelegationAccessCondition"],
		unknown,
		UpdatePoolDelegationAccessConditionMutationVariables
	>
) {
	const queryClient = useQueryClient();
	const { errorToast, successToast } = useToastRender();

	const mutation = useMutation<
		UpdatePoolDelegationAccessConditionMutation["updatePoolDelegationAccessCondition"],
		unknown,
		UpdatePoolDelegationAccessConditionMutationVariables
	>({
		mutationFn: async (data) =>
			(
				await graphQLClient.request(
					mutationUpdatePoolDelegationAccessCondition,
					data
				)
			).updatePoolDelegationAccessCondition,
		...options,
		onSuccess: ({ name }) => {
			queryClient.invalidateQueries(["accessConditionList"]);
			queryClient.invalidateQueries(["accessConditionById"]);
			successToast({
				description: `${name} has been updated successfully!`,
			});
		},
		onError: (error: Error) => {
			errorToast({
				title: "Updating access condition has failed",
				description: error?.message ?? "",
			});
		},
	});
	return { ...mutation, accessCondition: mutation.data };
}

export const mutationDuplicateAccessCondition = graphql(`
	mutation DuplicateAccessCondition($id: String!) {
		duplicateAccessCondition(id: $id) {
			id
		}
	}
`);

export function useMutationDuplicateAccessCondition(
	options?: UseMutationOptions<
		DuplicateAccessConditionMutation["duplicateAccessCondition"],
		unknown,
		DuplicateAccessConditionMutationVariables
	>
) {
	const queryClient = useQueryClient();
	const { errorToast, successToast } = useToastRender();

	const mutation = useMutation<
		DuplicateAccessConditionMutation["duplicateAccessCondition"],
		unknown,
		DuplicateAccessConditionMutationVariables
	>({
		mutationFn: async (data) =>
			(
				await graphQLClient.request(
					mutationDuplicateAccessCondition,
					data
				)
			).duplicateAccessCondition,
		...options,
		onSuccess: () => {
			queryClient.invalidateQueries(["accessConditionList"]);
		},
		onError: (error: Error) => {
			errorToast({
				title: "Duplicating access condition has failed",
				description: error?.message ?? "",
			});
		},
	});
	return { ...mutation, accessCondition: mutation.data };
}
