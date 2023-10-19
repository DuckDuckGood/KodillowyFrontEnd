const NumberInput = props => {

  const setValue = e => {
    const inputValue = parseInt(e.target.value);
    const min = parseInt(props.min);
    const max = parseInt(props.max);

    const value = 
      !inputValue || inputValue < min
        ? min
        : (inputValue > max
          ? max
          : inputValue);

    props.onChange(value);
  }

  return (
    <input
      className='d-flex w-10 mx-2 justify-content-center align-items-center'
      value={props.value}
      onChange={setValue}
    />
  );
};

export default NumberInput;