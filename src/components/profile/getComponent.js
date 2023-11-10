import DateInput from '../common/DateInput'
import TimeInput from '../common/TimeInput'
import FilteredPicker from '../common/FilteredPicker';
import GenderPicker from '../common/GenderPicker';
import MultilineInput from '../common/MultilineInput';



export function getComponentByName(name) {
    switch (name) {
        case 'gender': return GenderPicker;
        case 'birthDate': return DateInput;
        case 'birthTime': return TimeInput;
        case 'birthCountry': return FilteredPicker;
        case 'birthCity': return FilteredPicker;
        case "biography": return MultilineInput;
        default: return [];
    }
}

export function componentInstaller(component) {
    switch (component) {
        case 'GenderPicker': return GenderPicker;
        case 'DateInput': return DateInput;
        case 'TimeInput': return TimeInput;
        case 'FilteredPicker': return FilteredPicker;
        case 'FilteredPicker': return FilteredPicker;
        case "MultilineInput": return MultilineInput;
        case "CustomInput": return CustomInput;
        default: return [];
    }
}

export function getAdditionalPropsByName(name, countryList, cityList, onSelectCountry, onSelectCity) {
    switch (name) {
        case 'gender':
            return {
                onSelect: (gender, form) => form.setFieldValue("gender", gender)
            };
        case 'birthCountry':
            return {
                options: countryList,
                onSelect: onSelectCountry
            };
        case 'birthCity':
            return {
                options: cityList,
                onSelect: onSelectCity
            };
        default:
            return {};
    }
}