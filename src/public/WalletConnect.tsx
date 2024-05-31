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
			<Box
				hidden={connected && !isSignedIn}
				mt="4"
				sx={cardanoWalletStyles}
			>
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

const cardanoWalletStyles = {
	".mr-wallet-button": {
		borderColor: "transparent",
		borderRadius: "1rem !important",
		background: "#5e17eb !important",
		backdropFilter: "blur(7px)",
		fontSize: "20px !important",
		transition: "0.3s",
		height: "3.5rem !important",
		width: "16rem !important",
		color: "white !important",

		"&:hover": {
			background: "rgba(94, 23, 235, 0.5) !important",
		},
	},

	".mr-menu-list": {
		borderColor: "transparent",
		background: "rgba(94, 23, 235, 0.1) !important",
		borderRadius: "15px !important",
		backdropFilter: "blur(7px) !important",
		color: "white !important",

		".EGDgF": {
			backdropFilter: "blur(7px) !important",
			background: "rgba(255, 255, 255, 0.08)",

			"&:hover": {
				background: "rgba(94, 23, 235, 0.1) !important",
				color: "#5e17eb !important",

				".mr-menu-item": {
					color: "#5e17eb !important",
				},
			},

			"&:first-child": {
				borderRadius: "15px 15px 0 0 !important",
			},

			"&:last-child": {
				borderRadius: "0 0 15px 15px !important",
			},
		},
	},

	".mr-menu-item": {
		color: "#222222 !important",

		"&:hover": {
			color: "#5e17eb !important",
		},
	},
};
