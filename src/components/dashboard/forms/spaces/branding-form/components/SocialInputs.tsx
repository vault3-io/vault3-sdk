import React from "react";
import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { SectionTitle } from "src/components/dashboard/forms/common/section-title/SectionTitle";

export const SocialInputs = () => {
	const { register } = useFormContext();

	return (
		<Flex direction="column" gap={4}>
			<SectionTitle title="Socials" />
			<FormControl>
				<FormLabel>{"𝕏"}</FormLabel>
				<Input placeholder="https://x.com" {...register("x")} />
			</FormControl>
			<FormControl>
				<FormLabel>Discord</FormLabel>
				<Input
					placeholder="https://discord.com"
					{...register("discord")}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Telegram</FormLabel>
				<Input
					placeholder="https://telegram.com"
					{...register("telegram")}
				/>
			</FormControl>
			<FormControl>
				<FormLabel>Youtube</FormLabel>
				<Input
					placeholder="https://youtube.com"
					{...register("youtube")}
				/>
			</FormControl>
		</Flex>
	);
};
