import { dispatchCreatePost } from '../../../utils/dispatchUtils';
import TextInput from '../../features/TextInput/TextInput';
import './PostCreator.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const PostCreator = () => {

  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [published, setPublished] = useState();
  const [content, setContent] = useState();
  const [shortDescription, setShortDescription] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createPost = () => {
    const newPost = {
      title: title,
      author: author,
      published: published,
      content: content,
      shortDescription: shortDescription,
    };

    dispatch(dispatchCreatePost(newPost));
    navigate('/');
  }

  return (
    <div className='d-flex justify-content-center'>
      <div className='w-80 d-flex justify-content-start pt-5 flex-wrap'>
        <div className='w-100 h1'>Post Creator</div>
        <div className='w-100 mt-3 d-flex flex-column'>
          <div>Title</div>
          <TextInput name='title' onChange={setTitle} />
        </div>
        <div className='w-100 mt-3 d-flex flex-column'>
          <div>Author</div>
          <TextInput name='author name' onChange={setAuthor} />
        </div>
        <div className='w-100 mt-3 d-flex flex-column'>
          <div>Published</div>
          <TextInput name='published date' onChange={setPublished} />
        </div>
        <div className='w-100 mt-3 d-flex flex-column'>
          <div>Content</div>
          <TextInput name='content' onChange={setContent} />
        </div>
        <div className='w-100 mt-3 d-flex flex-column'>
          <div>Short shortDescription</div>
          <TextInput name='short description' onChange={setShortDescription} />
        </div>
        
        <div
          onClick={createPost}
          className='d-flex justify-content-center align-items-center p-3 border border-primary text-primary h4 mt-5 rounded-2 cursor-pointer'>
          Create post
        </div>
      </div>
    </div>
  );
};

export default PostCreator;