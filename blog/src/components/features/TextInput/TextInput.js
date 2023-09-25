const TextInput = props => (
  <input
    className='border border-secondary rounded-1 w-30 p-1 mt-1'
    type="text"
    placeholder={props.name ? `type ${props.name} here...` : ''}
    onChange={e => props.onChange(e.target.value)}
  />
);

export default TextInput;