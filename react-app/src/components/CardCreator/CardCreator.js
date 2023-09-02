import { useState } from "react";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/button";
import styles from './card-creator.module.scss';

const CardCreator = parameters => {
  const [title, setTitle] = useState();
  const handleSubmit = e => {
    console.log(title);
    e.preventDefault();
    parameters.action({ title: title }, parameters.columnId);
    setTitle('');
  }

  return (
    <form className={styles.cardForm} onSubmit={handleSubmit}>
        <TextInput value={title} onChange={e => setTitle(e.target.value)} />
        <Button>Add card</Button>
    </form>
  );
}
export default CardCreator;