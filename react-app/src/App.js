import CardFilter from './components/CardFilter/CardFilter';
import Container from './components/Container/container';
import Hero from './components/Hero/hero';
import List from './components/List/list';

const App = () => (
  <Container>
    <Hero />
    <CardFilter />
    <List />
  </Container>
);
export default App;