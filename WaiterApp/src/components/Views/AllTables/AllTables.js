import { useSelector } from "react-redux";
import { getAllTables } from "../../../redux/storeUtils";
import TableView from "./TableView";
import shortid from "shortid";

const AllTables = () => {
  const allTables = useSelector(state => getAllTables(state));

  return (
    <div>
      {allTables.length && allTables.map(table => <TableView table={table} key={shortid()} />)}
    </div>
  );
}

export default AllTables;