import { dispatchCreatePost, dispatchUpdatePost } from '../../../utils/dispatchUtils';
import TextArea from '../../features/TextArea/TextArea';
import TextInput from '../../features/TextInput/TextInput';
import './PostForm.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const PostForm = props => {
  const navigate = useNavigate();
  const post = props.edit ? props.post : {};

  useEffect(() => {
    if (!post) {
      return navigate('/');
    }
  }, []); // eslint-disable-line

  const getStartingValue = (property) => {
    return props.edit ? property : '';
  }

  const [title, setTitle] = useState(getStartingValue(post.title));
  const [author, setAuthor] = useState(getStartingValue(post.author));
  const [published, setPublished] = useState(getStartingValue(post.published));
  const [content, setContent] = useState(getStartingValue(post.content));
  const [shortDescription, setShortDescription] = useState(getStartingValue(post.shortDescription));

  const dispatch = useDispatch();

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

  const updatePost = () => {
    const editedPost = {
      id: post.id,
      title: title,
      author: author,
      published: published,
      content: content,
      shortDescription: shortDescription,
    };

    dispatch(dispatchUpdatePost(editedPost));
    navigate(`/post/${post.id}`);
  }

  const submitForm = () => {
    if (props.create) {
      createPost();
    }

    if (props.edit) {
      updatePost();
    }
  }

  return (
    <div className='d-flex justify-content-center'>
      <div className='w-80 d-flex justify-content-start pt-5 flex-wrap'>
        <div className='w-100 h1'>Post Creator</div>
        <div className='w-100 mt-3 d-flex flex-column'>
          <div>Title</div>
          <TextInput name='title' onChange={setTitle} defaultValue={getStartingValue(post.title)} />
        </div>
        <div className='w-100 mt-3 d-flex flex-column'>
          <div>Author</div>
          <TextInput name='author name' onChange={setAuthor} defaultValue={getStartingValue(post.author)} />
        </div>
        <div className='w-100 mt-3 d-flex flex-column'>
          <div>Published</div>
          <TextInput name='published date' onChange={setPublished} defaultValue={getStartingValue(post.published)} />
        </div>
        <div className='w-100 mt-3 d-flex flex-column'>
          <div>Content</div>
          <TextArea name='content' onChange={setContent} defaultValue={getStartingValue(post.content)} />
        </div>
        <div className='w-100 mt-3 d-flex flex-column'>
          <div>Short shortDescription</div>
          <TextInput name='short description' onChange={setShortDescription} defaultValue={getStartingValue(post.shortDescription)} />
        </div>
        
        <div
          onClick={submitForm}
          className='d-flex justify-content-center align-items-center p-3 border border-primary text-primary h4 mt-5 rounded-2 cursor-pointer'>
          Create post
        </div>
      </div>
    </div>
  );
};

export default PostForm;