import {
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery,
} from "@tanstack/react-query";

import { graphql } from "generated";
import { graphQLClient } from "utils/graphql";
import {
	CreateFileMutation,
	CreateFileMutationVariables,
	DeleteFileMutation,
	DeleteFileMutationVariables,
	DownloadFileQuery,
	DownloadFilesFromSpaceQuery,
	FilesInSpaceQuery,
	UpdateFileMutation,
	UpdateFileMutationVariables,
} from "generated/graphql";

export const queryFilesInSpace = graphql(`
	query FilesInSpace($spaceId: String!) {
		filesInSpace(spaceId: $spaceId) {
			id
			name
			mime
		}
	}
`);

export function useQueryFilesInSpace({
	spaceId,
	...options
}: { spaceId: string } & UseQueryOptions<
	unknown,
	unknown,
	FilesInSpaceQuery["filesInSpace"]
>) {
	const query = useQuery<unknown, unknown, FilesInSpaceQuery["filesInSpace"]>(
		{
			queryKey: ["filesInSpace", spaceId],
			queryFn: async () =>
				(
					await graphQLClient.request(queryFilesInSpace, {
						spaceId: spaceId,
					})
				).filesInSpace,
			...options,
		}
	);
	return { ...query, files: query.data };
}

export const queryDownloadFile = graphql(`
	query DownloadFile($id: String!) {
		downloadFile(id: $id) {
			id
			name
			mime
			content
		}
	}
`);

export function useQueryDownloadFile({
	fileId,
	...options
}: { fileId: string } & UseQueryOptions<
	unknown,
	unknown,
	DownloadFileQuery["downloadFile"]
>) {
	const query = useQuery<unknown, unknown, DownloadFileQuery["downloadFile"]>(
		{
			queryKey: ["download", fileId],
			queryFn: async () =>
				(
					await graphQLClient.request(queryDownloadFile, {
						id: fileId,
					})
				).downloadFile,
			...options,
		}
	);
	return { ...query, file: query.data };
}

export const queryDownloadFilesFromSpace = graphql(`
	query DownloadFilesFromSpace($spaceId: String!) {
		filesInSpace(spaceId: $spaceId) {
			download {
				id
				name
				mime
				content
			}
		}
	}
`);

export function useQueryDownloadFilesFromSpace({
	spaceId,
	...options
}: { spaceId: string } & UseQueryOptions<
	unknown,
	unknown,
	DownloadFilesFromSpaceQuery["filesInSpace"]
>) {
	const query = useQuery<
		unknown,
		unknown,
		DownloadFilesFromSpaceQuery["filesInSpace"]
	>({
		queryKey: ["filesInSpace", spaceId],
		queryFn: async () =>
			(
				await graphQLClient.request(queryDownloadFilesFromSpace, {
					spaceId: spaceId,
				})
			).filesInSpace,
		...options,
	});
	return { ...query, files: query.data };
}

export const mutationCreateFile = graphql(`
	mutation CreateFile(
		$spaceId: String!
		$name: String!
		$mime: String!
		$content: String!
	) {
		createFile(
			spaceId: $spaceId
			name: $name
			mime: $mime
			content: $content
		) {
			id
		}
	}
`);

export function useMutationCreateFile(
	options?: UseMutationOptions<
		CreateFileMutation["createFile"],
		unknown,
		CreateFileMutationVariables
	>
) {
	const mutation = useMutation<
		CreateFileMutation["createFile"],
		unknown,
		CreateFileMutationVariables
	>({
		mutationFn: async (data) =>
			(await graphQLClient.request(mutationCreateFile, data)).createFile,
		...options,
	});
	return { ...mutation, file: mutation.data };
}

export const mutationUpdateFile = graphql(`
	mutation UpdateFile($id: String!, $name: String!) {
		updateFile(id: $id, name: $name) {
			id
		}
	}
`);

export function useMutationUpdateFile(
	options?: UseMutationOptions<
		UpdateFileMutation["updateFile"],
		unknown,
		UpdateFileMutationVariables
	>
) {
	const mutation = useMutation<
		UpdateFileMutation["updateFile"],
		unknown,
		UpdateFileMutationVariables
	>({
		mutationFn: async (data) =>
			(await graphQLClient.request(mutationUpdateFile, data)).updateFile,
		...options,
	});
	return { ...mutation, file: mutation.data };
}

export const mutationDeleteFile = graphql(`
	mutation DeleteFile($id: String!) {
		deleteFile(id: $id) {
			id
		}
	}
`);

export function useMutationDeleteFile(
	options?: UseMutationOptions<
		DeleteFileMutation["deleteFile"],
		unknown,
		DeleteFileMutationVariables
	>
) {
	const mutation = useMutation<
		DeleteFileMutation["deleteFile"],
		unknown,
		DeleteFileMutationVariables
	>({
		mutationFn: async (data) =>
			(await graphQLClient.request(mutationDeleteFile, data)).deleteFile,
		...options,
	});
	return { ...mutation, file: mutation.data };
}
