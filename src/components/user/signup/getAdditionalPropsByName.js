export function getAdditionalPropsByName(name, termsAccepted, goToTerms) {
    switch (name) {
        case 'agreeToTerms':
            return {
                isChecked: termsAccepted,
                onLinkPress: goToTerms
            };
        default:
            return {};
    }
}