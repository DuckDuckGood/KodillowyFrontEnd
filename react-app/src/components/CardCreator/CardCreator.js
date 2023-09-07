import { useState } from "react";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/button";
import styles from './card-creator.module.scss';
import { useDispatch } from "react-redux";

const CardCreator = props => {
  const [title, setTitle] = useState();
  const dispatch = useDispatch();

  const newCard = () => {
    return {
      columnId: props.columnId,
      title: title,
    };
  };

  const useHandleSubmit = e => {
    e.preventDefault();
    dispatch({type: 'ADD_CARD', newCard: newCard()});
    setTitle('');
  }

  return (
    <form className={styles.cardForm} onSubmit={useHandleSubmit}>
        <TextInput value={title} onChange={e => setTitle(e.target.value)} />
        <Button>Add card</Button>
    </form>
  );
}
export default CardCreator;