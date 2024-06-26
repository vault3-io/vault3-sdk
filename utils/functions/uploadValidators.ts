export function validateCardanoStakeAddress(address: string) {
	const regex = /[^a-zA-Z0-9]/g; // matches empty spaces, non digits and non letters
	const trimmedAddress = address.trim();

	return (
		!regex.test(trimmedAddress) &&
		trimmedAddress.includes("stake") &&
		trimmedAddress.length > 58
	);
}

export function validatePolicyId(policyId: string) {
	const regex = /[^a-zA-Z0-9]/g; // matches empty spaces, non digits and non letters
	const trimmedPolicyId = policyId.trim();
	return !regex.test(trimmedPolicyId) && trimmedPolicyId.length > 55;
}

export function validateAssetFingerprint(assetFingerprint: string) {
	if (assetFingerprint.length === 0) {
		return true;
	}

	const regex = /[^a-zA-Z0-9]/g; // matches empty spaces, non digits and non letters
	const trimmedAssetFingerprint = assetFingerprint.trim();
	return (
		!regex.test(trimmedAssetFingerprint) &&
		trimmedAssetFingerprint.includes("asset") &&
		trimmedAssetFingerprint.length >= 44
	);
}

export function validateCardanoStakePoolId(stakePoolId: string) {
	const regex = /[^a-zA-Z0-9]/g; // matches empty spaces, non digits and non letters
	const trimmedStakePoolId = stakePoolId.trim();
	return (
		!regex.test(trimmedStakePoolId) &&
		trimmedStakePoolId.includes("pool") &&
		trimmedStakePoolId.length > 55
	);
}
