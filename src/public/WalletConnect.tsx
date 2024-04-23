import { CardanoWallet, useWallet } from "@meshsdk/react";
import {
	querySignatureChallenge,
	useApp,
	useMutationCreateSession,
} from "../hooks";
import { useMutation } from "@tanstack/react-query";
import { graphQLClient } from "../utils/graphql";
import { Box, Spinner, Stack, Text } from "@chakra-ui/react";

export function WalletConnect(props: any) {
	const { isSignedIn, user, session } = useApp();
	const { wallet, connected } = useWallet();
	const createSession = useMutationCreateSession();
	const signMessage = useMutation({
		mutationFn: async () => {
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

	return (
		<>
			<Box hidden={connected && !isSignedIn} mt="4">
				<CardanoWallet
					onConnected={() => signMessage.mutate()}
					{...props}
				/>
			</Box>
			{connected && !isSignedIn && (
				<Stack direction="row" alignItems="center" spacing={4} mt="4">
					<Spinner
						size="lg"
						color={props.color ? props.color : "white"}
					/>
					<Text
						fontSize="md"
						color={props.color ? props.color : "white"}
					>
						Waiting for signature
					</Text>
				</Stack>
			)}
		</>
	);
}
