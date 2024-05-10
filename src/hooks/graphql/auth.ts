import {
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery,
} from "@tanstack/react-query";

import { graphql } from "../../../generated";
import { graphQLClient } from "../../utils/graphql";
import { useApp } from "../useApp";
import {
	CreateSessionMutation,
	CreateSessionMutationVariables,
	Session,
	SignatureChallengeForAddressQuery,
	SignatureChallengeForAddressQueryVariables,
} from "../../../generated/graphql";

export const querySignatureChallenge = graphql(`
	query SignatureChallengeForAddress($address: String!) {
		signatureChallenge(address: $address) {
			message
		}
	}
`);

export function useQuerySignatureChallenge({
	address,
	...options
}: { address: string } & UseQueryOptions<
	unknown,
	unknown,
	SignatureChallengeForAddressQuery["signatureChallenge"]
>) {
	const query = useQuery<
		unknown,
		unknown,
		SignatureChallengeForAddressQuery["signatureChallenge"]
	>({
		queryKey: ["querySignatureChallenge", address],
		queryFn: async () =>
			(
				await graphQLClient.request(querySignatureChallenge, {
					address: address,
				})
			).signatureChallenge,
		enabled: !!address,
		...options,
	});
	return { ...query, message: query.data?.message };
}

export const mutationCreateSession = graphql(`
	mutation CreateSession(
		$address: String!
		$key: String!
		$signature: String!
	) {
		createSession(address: $address, key: $key, signature: $signature) {
			lifetime
			token
			user {
				id
				cardanoAddress
			}
		}
	}
`);

export function useMutationCreateSession(
	options?: UseMutationOptions<
		CreateSessionMutation["createSession"],
		unknown,
		CreateSessionMutationVariables
	>
) {
	const { onSignIn } = useApp();
	return useMutation<
		CreateSessionMutation["createSession"],
		unknown,
		CreateSessionMutationVariables
	>({
		mutationFn: async (data) =>
			(
				await graphQLClient.request(mutationCreateSession, {
					address: data.address,
					key: data.key,
					signature: data.signature,
				})
			).createSession,
		onSuccess(data) {
			onSignIn(data as Session);
		},
		...options,
	});
}
