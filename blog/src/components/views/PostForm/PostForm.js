import { dispatchCreatePost, dispatchUpdatePost } from '../../../utils/dispatchUtils';
import TextInput from '../../features/TextInput/TextInput';
import './PostForm.css';
import 'react-quill/dist/quill.snow.css'
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';

export const PostForm = props => {
  const navigate = useNavigate();
  const [datePickerValue, setDatePickerValue] = useState();
  const post = props.edit ? props.post : {};

  const setStartDate = (property) => {
    const startingDate = new Date();

    if (!props.edit || !property) {
      setDatePickerValue(startingDate);
    } else {

      const dateFragments = property.split('.');

      if (dateFragments.length !== 3
            || !isFinite(dateFragments[0])
            || !isFinite(dateFragments[1])
            || !isFinite(dateFragments[2])) {
        setDatePickerValue(startingDate);
      } else {
        startingDate.setDate(dateFragments[0]);
        startingDate.setMonth(parseInt(dateFragments[1]) + 1);
        startingDate.setFullYear(dateFragments[2]);
        setDatePickerValue(startingDate);
      }
    }
  }

  useEffect(() => {
    if (!post) {
      return navigate('/');
    }
    setStartDate(post.published);
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

  const changeDate = changedDate => {
    const date = new Date(changedDate);
    setDatePickerValue(date);
    const parsedDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`;
    setPublished(parsedDate);
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
          <DatePicker dateFormat='dd-MM-yyyy' onSelect={changeDate} selected={datePickerValue}/>
        </div>
        <div className='w-100 mt-3 d-flex flex-column pb-5'>
          <div>Content</div>
          <ReactQuill theme='snow' onChange={setContent} defaultValue={getStartingValue(post.content)} />
        </div>
        <div className='w-100 mt-3 d-flex flex-column'>
          <div>Short shortDescription</div>
          <TextInput name='short description' onChange={setShortDescription} defaultValue={getStartingValue(post.shortDescription)} />
        </div>
        
        <div
          onClick={submitForm}
          className='d-flex justify-content-center align-items-center p-3 border border-primary text-primary h4 mt-5 rounded-2 cursor-pointer'>
          {props.edit ? 'Update post' : 'Create post'}
        </div>
      </div>
    </div>
  );
};

export default PostForm;