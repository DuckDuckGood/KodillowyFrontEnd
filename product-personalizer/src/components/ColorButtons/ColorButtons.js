import clsx from "clsx";
import Button from "../Button/Button";
import shortid from "shortid";

const ColorButtons = props => {
  const colors = props.colors;

  const getShirtColor = () => props.activeColor();

  const activeColor = (colorName, colorClass) => {
    if (getShirtColor()) {
      return colorName === getShirtColor();
    }
    return colorClass === colors.black;
  };

  return (
    <ul id='colorButtons' className={props.className}>
      {
        Object.entries(colors).map(colorEntry => {
          const [colorName, colorClass] = colorEntry;
          return (
            <Button
              key={shortid()}
              className={clsx(colorClass, activeColor(colorName, colorClass) && props.activeButtonClassName)}
              onClick={props.setSelectedColor}
              setWhenClicked={colorName}
            />
          )
        })
      }
    </ul>
  );
};
export default ColorButtons;