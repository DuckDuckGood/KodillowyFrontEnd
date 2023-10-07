import ReactQuill from 'react-quill';
import { MIN_20_CHARACTERS } from '../../../utils/fields';

const ReactQuillForm = props => (
  <div>
    <ReactQuill
      className={`border border-1 ${props.error ? 'border-danger text-danger' : 'border-secondary'}`}
      theme='snow'
      onChange={props.onChange}
      defaultValue={props.defaultValue}
    />
    {props.error && <small className='text-danger'>{MIN_20_CHARACTERS}</small>}
  </div>
);

export default ReactQuillForm;