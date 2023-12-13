import DateInput from '../common/DateInput'
import TimeInput from '../common/TimeInput'
import FilteredPicker from '../common/FilteredPicker';
import GenderPicker from '../common/GenderPicker';
import MultilineInput from '../common/MultilineInput';



export function getComponentByName(name) {
    switch (name) {
        case 'gender': return GenderPicker;
        case 'birth_date': return DateInput;
        case 'birth_time': return TimeInput;
        case 'birth_country': return FilteredPicker;
        case 'birth_city': return FilteredPicker;
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
        case 'birth_country':
            return {
                options: countryList,
                onSelect: onSelectCountry
            };
        case 'birth_city':
            return {
                options: cityList,
                onSelect: onSelectCity
            };
        default:
            return {};
    }
}