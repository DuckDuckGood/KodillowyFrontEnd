import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import shortid from "shortid";

const ColumnCreator = parameters => {
  console.log(parameters.columnsCallback);
  const [value, setValue] = useState();
  
  const submitHandler = e => {
    e.preventDefault();
    setValue(e.target[0].value);
  }

  if (value && value !== '') {
    parameters.columnsCallback([...parameters.columns, {key: shortid(), title: value}]);
    setValue('');
  }

  return (
    <SearchForm onSubmit={e => submitHandler(e)} buttonMsg='Create column' />
  );
};
export default ColumnCreator;