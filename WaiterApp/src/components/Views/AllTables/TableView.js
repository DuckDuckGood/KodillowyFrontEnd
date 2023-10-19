import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BUSY, READ_MORE } from "../../../utils/fields";

const TableView = props => {

  const { table } = props;
  if (!table) {
    return (<div></div>);
  }

  return (
    <div className='d-flex flex-nowrap m-1 border-bottom border-dark py-1'>
      <div className='d-flex w-50 align-items-center my-1'> {/* left side */}
        <span className='d-flex fs-3'>Table {table.id}</span>
        <span className='d-flex px-3'>
          <span className='fw-bold'>
            Status:
          </span>
          &nbsp;{table.status}
        </span>
        {
          table.status === BUSY
            ? ''
            : <span className='d-flex px-3'>
                <span className='fw-bold'>
                  Bill:
                </span>
                &nbsp;{table.bill}
              </span>
        }
      </div>
      <div className='d-flex justify-content-end w-50 align-items-center my-1'> {/* right side */}
        <Nav>
          <Nav.Link as={NavLink} className='d-flex p-2 bg-primary text-light rounded' to={`/table/${table.id}`}>{READ_MORE}</Nav.Link>
        </Nav>
      </div>
    </div>
  );
};

export default TableView;