import Button from '../Button/button';
import TextInput from '../TextInput/TextInput';
import styles from './card-filter.module.scss';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addSearchString } from '../../redux/storeUtils';

const CardFilter = parameters => {

  const [searchString, setSearchString] = useState();
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    dispatch(addSearchString(searchString));
    setSearchString('');
  }

  return (
    <form className={styles.searchForm} onSubmit={e => onSubmit(e)}>
      <TextInput placeholder="Filter..." onChange={e => setSearchString(e.target.value)}/>
      <Button className={styles.button}>
        {parameters.buttonMsg ? parameters.buttonMsg : <span className='fa fa-search'></span>}
      </Button>
    </form>
  );
};
export default CardFilter;