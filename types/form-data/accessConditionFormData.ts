export interface AccessConditionFormData {
	name: string;
	allow: { value: string }[];
	policyId: string;
	minAmount: number;
	assetFingerprints: { value: string }[];
	poolId: string;
	minEpochs: number;
	minDelegation: number;
}
