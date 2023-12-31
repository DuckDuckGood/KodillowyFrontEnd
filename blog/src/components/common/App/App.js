import { Routes, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Home from "../../pages/Home/Home";
import NotFound from "../../pages/NotFound/NotFound";
import Post from "../../pages/Post/Post";
import Header from "../../views/Header/Header";
import Footer from "../../views/Footer/Footer";
import PostCreator from "../../views/PostCreator/PostCreator";
import PostEditor from "../../views/PostEditor/PostEditor";
import Categories from "../../pages/Categories/Categories";

const App = () => (
  <Container>
    <Header />
    <Routes>
      <Route path='' element={<Home />} />
      <Route path='home' element={<Home />} />
      <Route path='posts' element={<Home />} />
      <Route path='post' element={<Post />} />
      <Route exact path='add' element={<PostCreator />} />
      <Route exact path='post/add' element={<PostCreator />} />
      <Route exact path='categories' element={<Categories />} />
      <Route exact path='post/:id' Component={Post} />
      <Route exact path='edit/:id' Component={PostEditor} />
      <Route exact path='post/edit/:id' Component={PostEditor} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    <Footer />
  </Container>
);

export default App;