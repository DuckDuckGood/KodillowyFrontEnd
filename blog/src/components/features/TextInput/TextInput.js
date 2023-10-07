const TextInput = props => (
  <div>
    <input
      className={`border rounded-1 w-30 p-1 mt-1 ${props.error ? 'border-danger' : 'border-secondary'}`}
      type="text"
      placeholder={props.name ? `type ${props.name.toLowerCase()} here...` : ''}
      onChange={e => props.onChange(e.target.value)}
      defaultValue={props.defaultValue}
      {...props.formHook}
    />
    {props.error && <small className='d-flex text-danger'>{props.errorMessage}</small>}
  </div>
);

export default TextInput;