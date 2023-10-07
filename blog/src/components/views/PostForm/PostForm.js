import { dispatchCreatePost, dispatchUpdatePost } from '../../../utils/dispatchUtils';
import TextInput from '../../features/TextInput/TextInput';
import './PostForm.css';
import 'react-quill/dist/quill.snow.css'
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setStartDate, changeDate, correctDate } from './postFormUtils';
import { useForm } from 'react-hook-form';
import { AUTHOR, AUTHOR_NAME, CONTENT, POST_CREATOR, POST_EDITOR, PUBLISHED, SHORT_DESCRIPTION, TITLE } from '../../../utils/fields';
import DatePickerForm from '../../features/DatePickerForm/DatePickerForm';
import ReactQuillForm from '../../features/ReqctQuillForm/ReactQuillForm';

const PostForm = props => {
  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const getStartingValue = (property) => {
    return props.edit ? property : '';
  }
  const post = props.edit ? props.post : {};

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [datePickerValue, setDatePickerValue] = useState();
  const [title, setTitle] = useState(getStartingValue(post.title));
  const [author, setAuthor] = useState(getStartingValue(post.author));
  const [published, setPublished] = useState(getStartingValue(post.published));
  const [content, setContent] = useState(getStartingValue(post.content));
  const [shortDescription, setShortDescription] = useState(getStartingValue(post.shortDescription));
  const [dateError, setDateError] = useState(false);
  const [contentError, setContetError] = useState(false);


  useEffect(() => {
    if (!post) {
      return navigate('/');
    }
    setStartDate(props.edit, setDatePickerValue, post.published);
  }, []); // eslint-disable-line

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
    if (dateError || contentError) {
      return;
    }

    if (props.create) {
      createPost();
    }

    if (props.edit) {
      updatePost();
    }
  }

  const handleChangeDate = changedDate => {
    setDateError(!correctDate(changedDate));

    changeDate(changedDate, setDatePickerValue, setPublished);
  }

  const handleChangeContent = changedContent => {
    setContetError(!(changedContent && changedContent.length > 19));

    setContent(changedContent);
  }

  return (
    <div className='d-flex justify-content-center'>
      <div className='w-80 d-flex justify-content-start pt-5 flex-wrap'>
        <div className='w-100 h1'>{props.edit ? POST_EDITOR : POST_CREATOR}</div>
        <div className='w-100 mt-3 d-flex flex-column'>
          <div>{TITLE}</div>
          <TextInput
            name={TITLE}
            onChange={setTitle}
            defaultValue={getStartingValue(post.title)}
            formHook={{...register(TITLE, { required: true })}}
            error={errors[TITLE]}
            errorMessage='This field is required!'
          />
        </div>
        <div className='w-100 mt-3 d-flex flex-column'>
          <div>{AUTHOR}</div>
          <TextInput
            name={AUTHOR_NAME}
            onChange={setAuthor}
            defaultValue={getStartingValue(post.author)}
            formHook={{...register(AUTHOR_NAME, { required: true, minLength: 3 })}}
            error={errors[AUTHOR_NAME]}
            errorMessage='This field is required and should have min. 3 chars'
          />
        </div>
        <div className='w-100 mt-3 d-flex flex-column'>
          <div>{PUBLISHED}</div>
          <DatePickerForm
            onSelect={handleChangeDate}
            selected={datePickerValue}
            error={dateError}
          />
        </div>
        <div className='w-100 mt-3 d-flex flex-column'>
          <div>{CONTENT}</div>
          <ReactQuillForm
            onChange={handleChangeContent}
            defaultValue={getStartingValue(post.content)}
            error={contentError}
          />
        </div>
        <div className='w-100 mt-3 d-flex flex-column'>
          <div>{SHORT_DESCRIPTION}</div>
          <TextInput
            name={SHORT_DESCRIPTION}
            onChange={setShortDescription}
            defaultValue={getStartingValue(post.shortDescription)}
            formHook={{...register(SHORT_DESCRIPTION, { required: true, minLength: 20 })}}
            error={errors[SHORT_DESCRIPTION]}
            errorMessage='This field is required and should have min. 20 chars'
          />
        </div>
        
        <div
          onClick={validate(submitForm)}
          className='d-flex justify-content-center align-items-center p-3 border border-primary text-primary h4 mt-5 rounded-2 cursor-pointer'>
          {props.edit ? 'Update post' : 'Create post'}
        </div>
      </div>
    </div>
  );
};

export default PostForm;