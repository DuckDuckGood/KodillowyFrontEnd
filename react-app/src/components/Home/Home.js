import Hero from "../Hero/hero";
import CardFilter from "../CardFilter/CardFilter";
import List from "../List/list";

const Home = () => (
  <div>
    <Hero title='MY FIRST REACT APP' subtitle='A simple to-do app, with lists, columns and cards'/>
    <CardFilter />
    <List />
  </div>
);

export default Home;