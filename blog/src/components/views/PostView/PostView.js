import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './PostView.css';

const PostView = props => {
  const post = props.post;

  return (
    <div className='d-flex border border-secondary flex-column p-3 mt-3 rounded-1 w-30'>
      <span className='fs-3 mb-3'>{post.title}</span>
      <span><b>Author: </b>{post.author}</span>
      <span><b>Published: </b>{post.published}</span>
      <span>{post.shortDescription}</span>
      <Nav className='mt-3'>
        <Nav.Link as={NavLink} className='text-light d-flex p3 bg-primary rounded-1' to={`/post/${post.id}`}>Read more</Nav.Link>
      </Nav>
    </div>
  );
};

export default PostView;