import Container from './components/Container/container';
import Hero from './components/Hero/hero';
import List from './components/List/list';
import SearchForm from './components/SearchForm/search-form';

const App = () => (
  <Container>
    <Hero />
    <SearchForm />
    <List />
  </Container>
);
export default App;