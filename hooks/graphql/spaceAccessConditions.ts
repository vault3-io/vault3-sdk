import {
	UseMutationOptions,
	UseQueryOptions,
	useQueryClient,
	useMutation,
	useQuery,
} from "@tanstack/react-query";
import { graphql } from "generated";
import {
	LinkAccessConditionToSpaceMutation,
	LinkAccessConditionToSpaceMutationVariables,
	SpaceAccessConditionsByAccessConditionQuery,
	UnlinkAccessConditionFromSpaceMutation,
	UnlinkAccessConditionFromSpaceMutationVariables,
} from "generated/graphql";
import { graphQLClient } from "utils/graphql";
import { useToastRender } from "hooks/useToast";

export const querySpaceAccessConditionsByAccessCondition = graphql(`
	query SpaceAccessConditionsByAccessCondition($accessConditionId: String!) {
		spaceAccessConditionsByAccessCondition(
			accessConditionId: $accessConditionId
		) {
			id
			accessCondition {
				id
				name
			}
			space {
				id
				name
			}
		}
	}
`);

export function useQuerySpacesLinkedToAccessCondition({
	accessConditionId,
	...options
}: { accessConditionId: string } & UseQueryOptions<
	unknown,
	unknown,
	SpaceAccessConditionsByAccessConditionQuery["spaceAccessConditionsByAccessCondition"]
>) {
	const query = useQuery<
		unknown,
		unknown,
		SpaceAccessConditionsByAccessConditionQuery["spaceAccessConditionsByAccessCondition"]
	>({
		queryKey: ["spaceAccessConditionsByAccessCondition", accessConditionId],
		queryFn: async () =>
			(
				await graphQLClient.request(
					querySpaceAccessConditionsByAccessCondition,
					{
						accessConditionId: accessConditionId,
					}
				)
			).spaceAccessConditionsByAccessCondition,
		...options,
	});
	return { ...query, spaceAccessConditions: query.data };
}

export const mutationLinkAccessConditionToSpace = graphql(`
	mutation LinkAccessConditionToSpace(
		$accessConditionId: String!
		$spaceId: String!
	) {
		spaceLinkAccessCondition(
			accessConditionId: $accessConditionId
			spaceId: $spaceId
		) {
			id
			accessCondition {
				id
				name
			}
			space {
				id
				name
			}
		}
	}
`);

export function useMutationLinkAccessConditionToSpace(
	options?: UseMutationOptions<
		LinkAccessConditionToSpaceMutation["spaceLinkAccessCondition"],
		unknown,
		LinkAccessConditionToSpaceMutationVariables
	>
) {
	const queryClient = useQueryClient();
	const { errorToast, successToast } = useToastRender();

	const mutation = useMutation<
		LinkAccessConditionToSpaceMutation["spaceLinkAccessCondition"],
		unknown,
		LinkAccessConditionToSpaceMutationVariables
	>({
		mutationFn: async (data) =>
			(
				await graphQLClient.request(
					mutationLinkAccessConditionToSpace,
					data
				)
			).spaceLinkAccessCondition,
		...options,
		onSuccess: ({ accessCondition, space }) => {
			queryClient.invalidateQueries(["spaceById", space.id]);
			queryClient.invalidateQueries(["spaceList"]);
			successToast({
				description: `Access condition ${accessCondition.name} has been linked to space ${space.name} successfully!`,
			});
		},
		onError: (error: Error) => {
			errorToast({
				title: "Linking access condition to space has failed",
				description: error?.message ?? "",
			});
		},
	});
	return { ...mutation, id: mutation.data };
}

export const mutationUnlinkAccessConditionFromSpace = graphql(`
	mutation UnlinkAccessConditionFromSpace(
		$accessConditionId: String!
		$spaceId: String!
	) {
		spaceUnlinkAccessCondition(
			accessConditionId: $accessConditionId
			spaceId: $spaceId
		) {
			id
			space {
				id
				name
			}
			accessCondition {
				id
				name
			}
		}
	}
`);

export function useMutationUnlinkAccessCondition(
	options?: UseMutationOptions<
		UnlinkAccessConditionFromSpaceMutation["spaceUnlinkAccessCondition"],
		unknown,
		UnlinkAccessConditionFromSpaceMutationVariables
	>
) {
	const queryClient = useQueryClient();
	const { errorToast, successToast } = useToastRender();

	const mutation = useMutation<
		UnlinkAccessConditionFromSpaceMutation["spaceUnlinkAccessCondition"],
		unknown,
		UnlinkAccessConditionFromSpaceMutationVariables
	>({
		mutationFn: async (data) =>
			(
				await graphQLClient.request(
					mutationUnlinkAccessConditionFromSpace,
					data
				)
			).spaceUnlinkAccessCondition,
		...options,
		onSuccess: ({ accessCondition, space }) => {
			queryClient.invalidateQueries(["spaceById", space.id]);
			successToast({
				description: `Access condition ${accessCondition.name} has been unlinked from space ${space.name} successfully!`,
			});
		},
		onError: (error: Error) => {
			errorToast({
				title: "Unlinking access condition from space has failed",
				description: error?.message ?? "",
			});
		},
	});
	return { ...mutation, data: mutation.data };
}
