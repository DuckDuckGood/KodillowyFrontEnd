import { useState } from "react";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/button";
import styles from './card-creator.module.scss';
import { useSelector } from "react-redux";

const CardCreator = props => {
  const [title, setTitle] = useState();
  console.log(useSelector(state => state.cards))
  const useHandleSubmit = e => {
    e.preventDefault();
    // useSelector(state => {
    //   state.cards.push({
    //     id: state.cards.length + 1,
    //     columnId: props.columnId,
    //     title: title,
    //   });
    // });
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