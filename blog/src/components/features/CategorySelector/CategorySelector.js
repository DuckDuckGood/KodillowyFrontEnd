import { useSelector } from "react-redux";
import { getCategories } from "../../../utils/storeUtils";

const CategorySelector = props => {
  const categories = useSelector(state => getCategories(state));

  return (
    <div>
      <select className='bg-body border border-1 border-secondary p-1 mt-1 rounded-1 w-30' onChange={e => props.onChange(e.target.value)}>
        {categories.map(category => <option selected={category === props.selected}>{category}</option>)}
      </select>
    </div>
  );
};

export default CategorySelector;