import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { fetchStatuses, fetchTables } from "../../../redux/reduxUtils";
import { dispatchFetchedStatuses, dispatchFetchedTables } from '../../../redux/dispatchUtils';
import { Container, Spinner } from 'react-bootstrap';
import Header from '../../Views/Header/Header';
import AllTables from '../../Views/AllTables/AllTables';
import TablePage from '../../Pages/TablePage';

const App = () => {

  const [spinner, setSpinner] = useState(true);

  const dispatch = useDispatch();

  fetchTables()
    .then(res => dispatch(dispatchFetchedTables(res)));

  fetchStatuses()
    .then(res => dispatch(dispatchFetchedStatuses(res)))
    .then(() => setSpinner(false));

  return (
    <Container>
      <Header />
      {
        spinner 
          ? <div className='d-flex w-100 py-5 justify-content-center'>
              <Spinner animation='border' variant='primary' />
            </div>

          : <Routes>
              <Route path='/table/:id' Component={TablePage} />
              <Route path='*' element={<AllTables />} />
            </Routes>
      }
    </Container>
  );
}

export default App;
