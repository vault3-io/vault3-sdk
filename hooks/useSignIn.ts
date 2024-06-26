import { useWallet } from "@meshsdk/react";
import {
	querySignatureChallenge,
	useApp,
	useMutationCreateSession,
} from "hooks";
import { useMutation } from "@tanstack/react-query";
import { graphQLClient } from "utils/graphql";

export function useSignIn() {
	const { isSignedIn, user, session } = useApp();
	const { wallet, connected } = useWallet();
	const createSession = useMutationCreateSession();
	const { mutate: signMessage } = useMutation({
		mutationFn: async () => {
      console.log("Signing in...")
			const addresses = await wallet.getRewardAddresses();
			const address = addresses[0];

			if (
				isSignedIn &&
				user?.cardanoAddress == address &&
				session?.lifetime > new Date()
			) {
				console.log("Already signed in!");
				return;
			}

			const nonce = (
				await graphQLClient.request(querySignatureChallenge, {
					address: address,
				})
			).signatureChallenge.message;

			const sig = await wallet.signData(address, nonce);
			const newSession = await createSession.mutateAsync({
				address: address,
				key: sig.key,
				signature: sig.signature,
			});

			console.log(
				`Created session with token ${newSession.token} for wallet ${address}`
			);
		},
	});

	return {
    isSignedIn,
    isSignInLoading: connected && !isSignedIn,
    signMessage
  };
}
