import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './PostView.css';
import { AUTHOR, CATEGORY, PUBLISHED, READ_MORE } from '../../../utils/fields';

const PostView = props => {
  const post = props.post;

  return (
    <div className='d-flex border border-secondary flex-column p-3 mt-3 rounded-1 w-30'>
      <span className='fs-3 mb-3'>{post.title}</span>
      <span><b>{AUTHOR}: </b>{post.author}</span>
      <span><b>{PUBLISHED}: </b>{post.published}</span>
      <span><b>{CATEGORY}: </b>{post.category}</span>
      <span>{post.shortDescription}</span>
      <Nav className='mt-3'>
        <Nav.Link as={NavLink} className='text-light d-flex p3 bg-primary rounded-1' to={`/post/${post.id}`}>{READ_MORE}</Nav.Link>
      </Nav>
    </div>
  );
};

export default PostView;