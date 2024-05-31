import tus, { DetailedError } from "tus-js-client";

export * from "./src/public";

function getUploadEndpointURL() {
    return "";
}

export enum UploadStatus {
    Initalizing,
    Uploading,
    Storing,
    Completed
}

export type UploadRequest = {
    token: string,
    spaceId: string,
    file: File,
    onProgress: (status: UploadStatus, percentage?: number) => void,
    onError: (error: Error | DetailedError) => void,
    onSuccess: () => void
};

export function Upload(req: UploadRequest) {
    req.onProgress(UploadStatus.Initalizing);

    // Create file via graphql
    const file = {
        id: ""
    };

    // Upload
    const upload = new tus.Upload(req.file, {
        endpoint: getUploadEndpointURL(),
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
            filename: req.file.name,
            filetype: req.file.type,
        },
        headers: {
            authorization: req.token,
            "vault-file-id": file.id,
        },
        onError: req.onError,
        onProgress: (bytesUploaded, bytesTotal) => {
            const percentage = ((bytesUploaded / bytesTotal) * 100);
            console.log("Uploading %s at %s", req.file.name, percentage.toFixed(2) + "%");
            req.onProgress(UploadStatus.Uploading, percentage);
        },
        onSuccess: () => {
            // Return 
        },
    });

    upload.start();
}

