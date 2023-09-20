import { useState } from 'react';
import styles from './list-creator.module.scss';
import { useDispatch } from 'react-redux';
import { addList } from '../../redux/storeUtils';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/button';

const ListCreator = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const dispatch = useDispatch();

  const newList = () => {
    return {
      title: title,
      description: description,
    }
  }

  const createList = e => {
    e.preventDefault();
    dispatch(addList(newList()));
    setTitle('');
    setDescription('');
  };

  return (
    <form className={styles.form} onSubmit={createList}>
      <div className={styles.container}>
        <TextInput placeholder='New list title' onChange={e => setTitle(e.target.value)}/>
        <TextInput placeholder='New list description' onChange={e => setDescription(e.target.value)}/>
        <Button>Create List</Button>
      </div>
    </form>
  );
};

export default ListCreator;