import './Categories.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../utils/storeUtils';
import { useNavigate } from 'react-router-dom';
import { dispatchSelectCategory } from '../../../utils/dispatchUtils';

const Categories = () => {
  const categories = useSelector(state => getCategories(state));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateTo = e => {
    dispatch(dispatchSelectCategory(e.target.innerHTML.toLowerCase()));
    navigate('/home');
  }

  return (
    <div className='d-flex justify-content-center align-items-center fle-wrap'>
      <div className='d-flex flex-column mt-5'>
        {categories.map(category => 
          <div 
            className='d-flex mt-3 align-items-center px-5 py-3 border border-primary border-3 fs-5 cursor-pointer'
            onClick={navigateTo}>
            {category}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;