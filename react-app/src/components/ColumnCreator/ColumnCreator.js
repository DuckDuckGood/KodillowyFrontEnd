import TextInput from "../TextInput/TextInput";
import Button from "../Button/button";
import styles from './column-creator.module.scss';
import { useDispatch } from "react-redux";
import { addColumn } from "../../redux/storeUtils";

const ColumnCreator = parameters => {
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();

    const icon = e.target[0].value;
    e.target[0].value = '';

    const title = e.target[1].value;
    e.target[1].value = '';

    dispatch(addColumn({icon: icon, title: title}));
  }

  return (
    <form onSubmit={submitHandler} className={styles.columnCreator}>
      <div>
        Icon: <TextInput placeholder="Icon..." />
      </div>
      <div>
        Column name: <TextInput placeholder="Column name..." />
      </div>
      <Button>Create column!</Button>
    </form>
  );
};
export default ColumnCreator;