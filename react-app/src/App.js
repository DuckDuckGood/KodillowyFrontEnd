import Container from './components/Container/container';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import About from './components/About/About';
import Favorite from './components/Favorite/Favorite';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './components/PageNotFound/PageNotFound';
import List from './components/List/list';

const App = () => (
  <Container>
    <NavBar />
    <Routes>
      <Route path='home' element={<Home />} />
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='favorite' element={<Favorite />} />
      <Route path='*' element={<PageNotFound />} />
      <Route exact path='/list/:listId' Component={List} />
    </Routes>
  </Container>
);
export default App;