export const TextArea = props => (
  <textarea
    className='border border-secondary rounded-1 w-30 p-1 mt-1'
    placeholder={props.name ? `type ${props.name} here...` : ''}
    onChange={e => props.onChange(e.target.value)}
    defaultValue={props.defaultValue}
  />
);

export default TextArea;