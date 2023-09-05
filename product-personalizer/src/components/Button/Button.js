const Button = props => (
 <li>
    <button 
    type="button" 
    className={props.className}
    onClick={() => props.onClick(props.setWhenClicked)}>
      {props.children}
   </button>
 </li>
);
export default Button;