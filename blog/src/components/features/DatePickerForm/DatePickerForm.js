import DatePicker from 'react-datepicker';
import { DATE_CANT_BE_FUTURE } from '../../../utils/fields';

const DatePickerForm = props => (
  <div>
    <DatePicker
      className={`border rounded-1 p-1 ${props.error ? 'border-danger text-danger' : 'border-secondary'}`}
      dateFormat='dd-MM-yyyy'
      onSelect={props.onSelect}
      selected={props.selected}
    />
    {props.error && <small className='d-flex text-danger'>{DATE_CANT_BE_FUTURE}</small>}
  </div>
);

export default DatePickerForm;