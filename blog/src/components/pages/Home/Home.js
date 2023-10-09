import { useSelector } from 'react-redux';
import { getAllPosts, getSelectedCategory } from '../../../utils/storeUtils';
import PostView from '../../views/PostView/PostView';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import shortid from 'shortid';
import { ALL_POSTS, CREATE_POST } from '../../../utils/fields';

const Home = () => {
  let posts = useSelector(state => getAllPosts(state));
  const selectedCategory = useSelector(state => getSelectedCategory(state));
  const navigator = useNavigate();

  const addPost = () => {
    navigator('/post/add');
  }

  if (posts.some(post => post.category === selectedCategory)) {
    posts = posts.filter(post => post.category === selectedCategory);
  }

  return (
  <div className='d-flex flex-wrap justify-content-around'>
    <div className='d-flex flex-nowrap w-100 justify-content-center mt-3'>
      <div className='w-45 h1'>{ALL_POSTS}</div>
      <div className='w-45 d-flex justify-content-end'>
        <div className='d-flex text-primary border border-primary rounded-1 h-50 p-3 mt-3 align-items-center cursor-pointer' onClick={addPost}>
          {CREATE_POST}
        </div>
      </div>
    </div>
    {posts.map(post => <PostView key={shortid()} post={post} />)}
  </div>
  );
};

export default Home;