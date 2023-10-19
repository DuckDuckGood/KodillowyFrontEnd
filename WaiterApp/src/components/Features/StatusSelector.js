import { BUSY } from "../../utils/fields";

const StatusSelector = props => {

  if (!props || !props.statuses || !props.statuses.length) {
    return <div></div>
  }

  const changedStatus = e => {
    props.onChange(e.target.value);
    
    if (e.target.value === BUSY) {
      console.log('heh');
      props.whenBusy();
    }
  }

  return (
    <select defaultValue={props.selectedStatus} className='w-25 bg-light border border-primary rounded-1 p-1 mx-1' onChange={changedStatus}>
      {
        props.statuses.map(status => 
          <option>
            {status}
          </option>
        )
      }
    </select>
  );
};

export default StatusSelector;