import { useSelector } from 'react-redux';
import { getAllPosts } from '../../../redux/storeUtils';
import PostView from '../../views/PostView/PostView';

const Home = () => {
  const posts = useSelector(state => getAllPosts(state));
  return (
  <div className='d-flex flex-wrap justify-content-around'>
    {posts.map(post => <PostView post={post} />)}
  </div>
  );
};

export default Home;