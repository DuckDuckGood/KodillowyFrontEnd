import Button from "../Button/Button";
import clsx from "clsx";
import shortid from "shortid";

const SizeButtons = props => {

  const isActiveSize = size => {
    return size.name === props.activeSize;
  };

  return (
    <ul id='sizeButtons' className={props.className}>
      {
        Object.values(props.sizes).map(size => 
          <Button 
            key={shortid()} 
            className={clsx(isActiveSize(size) && props.activeButtonClassName)}
            onClick={props.setSelectedSize}
            setWhenClicked={size.name}>
            {size.name}
          </Button>)
      }
    </ul>
  )
};
export default SizeButtons;