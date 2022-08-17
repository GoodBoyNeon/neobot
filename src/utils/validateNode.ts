export const validateNode = () => {
	try {
		const nodeVersion = process.version.slice(1).split('.')[0];

		if (Number(nodeVersion) < 16) {
			return false;
		}
	} catch (err) {}
};
