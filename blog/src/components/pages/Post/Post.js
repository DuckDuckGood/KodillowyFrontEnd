import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostById } from "../../../redux/storeUtils";

const Post = () => {
  const id = useParams().id;
  const post = useSelector(state => getPostById(state, id));

  console.log(post);

  return (
    <div className='d-flex m-5 p-5 border border-secondary rounded-1 flex-column'>
      <span className='fs-1'>{post.title}</span>
      <span>{post.author}</span>
      <span>{post.published}</span>
      <span className='fs-4'>{post.content}</span>
    </div>
  );
};

export default Post;