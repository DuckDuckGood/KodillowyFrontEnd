import { useState } from "react";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/button";
import shortid from "shortid";
import styles from './column-creator.module.scss';

const ColumnCreator = parameters => {
  const [value, setValue] = useState();
  const [icon, setIcon] = useState();

  const submitHandler = e => {
    e.preventDefault();

    setIcon(e.target[0].value);
    e.target[0].value = '';

    setValue(e.target[1].value);
    e.target[1].value = '';
  }

  if (value && value !== '') {
    parameters.columnsCallback([...parameters.columns, {key: shortid(), icon: icon, title: value}]);
    setValue('');
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