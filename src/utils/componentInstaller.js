import DateInput from '../components/common/DateInput'
import TimeInput from '../components/common/TimeInput'
import FilteredPicker from '../components/common/FilteredPicker';
import GenderPicker from '../components/common/GenderPicker';
import MultilineInput from '../components/common/MultilineInput';
import CustomInput from '../components/common/CustomInput';
import CheckboxLabelLink from '../components/common/CheckboxLabelLink';

export function componentInstaller(component) {
    
    switch (component) {
        case 'GenderPicker': return GenderPicker;
        case 'DateInput': return DateInput;
        case 'TimeInput': return TimeInput;
        case 'FilteredPicker': return FilteredPicker;
        case "MultilineInput": return MultilineInput;
        case "CustomInput": return CustomInput;
        case "CheckboxLabelLink": return CheckboxLabelLink;

        default: return null;
    }
}