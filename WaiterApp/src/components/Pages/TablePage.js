import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllStatuses, getTableById } from "../../redux/storeUtils";
import StatusSelector from "../Features/StatusSelector";
import NumberInput from "../Features/NumberInput";
import { useState } from "react";
import { UPDATE } from "../../utils/fields";

const TablePage = () => {
  const id = useParams().id;
  const table = useSelector(state => getTableById(state, id));
  const statuses = useSelector(state => getAllStatuses(state));

  const [status, setStatus] = useState(table.status);
  const [seats, setSeats] = useState(table.seats);
  const [occupiedSeats, setOccupiedSeats] = useState(table.occupiedSeats);
  const [bill, setBill] = useState(table.bill);

  const navigate = useNavigate();

  if (!table) {
    navigate('/');
  }

  const updateTable = () => {
    const modifiedTable = {
      status: status,
      occupiedSeats: occupiedSeats,
      seats: seats,
      bill: bill,
    };

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(modifiedTable),
    };

    fetch(`http://localhost:3131/tables/${id}`, options)
      .then(() => navigate('/'));
  }

  return (
    <div className='d-flex mt-3 flex-wrap'>
      <span className='h1 w-100'>Table {table.id}</span>
      <div className='w-100 my-1 align-items-center'>
        Status:
        <StatusSelector
          statuses={statuses}
          selectedStatus={status}
          onChange={setStatus}
          whenBusy={() => setBill(0)}
        />
      </div>
      <div className='d-flex flex-nowrap w-100 my-1 align-items-center'>
        People: <NumberInput min='0' max='10' value={occupiedSeats} onChange={setOccupiedSeats} /> / <NumberInput min='0' max='10' value={seats} onChange={setSeats} />
      </div>
      <div className='d-flex flex-nowrap w-100 my-1 align-items-center'>
        Bill: $ <NumberInput value={bill} onChange={setBill} />
      </div>
      <div className='d-flex flex-nowrap w-100 mt-3'>
        <div className='mx-1 py-2 px-3 bg-primary text-light rounded cursor-pointer' onClick={updateTable}>
          {UPDATE}
        </div>
      </div>
    </div>
  );
};

export default TablePage;