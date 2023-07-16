export const shouldIncludeFilePath = (
    filePath: string | undefined,
    whitelist: Array<string>,
    blacklist: Array<string>,
): boolean => {
    // If whitelist exists, check if rule is contained within it.
    if (whitelist.length > 0) {
        return (
            filePath != undefined &&
            whitelist.some((currentValue) => filePath.match(currentValue))
        );
    }

    // If blacklist exists, check if rule is not contained within it.
    if (blacklist.length > 0) {
        return !(
            filePath != undefined &&
            blacklist.some((currentValue) => filePath.match(currentValue))
        );
    }

    // In all other cases, presume rule should be prefixed.
    return true;
};
