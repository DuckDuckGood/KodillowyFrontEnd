import Hero from "../Hero/hero";
import ListCreator from "../ListCreator/ListCreator";
import Lists from "../Lists/Lists";

const Home = () => (
  <div>
    <Hero title='MY FIRST REACT APP' subtitle='A simple to-do app, with lists, columns and cards'/>
    <ListCreator />
    <Lists />
  </div>
);

export default Home;