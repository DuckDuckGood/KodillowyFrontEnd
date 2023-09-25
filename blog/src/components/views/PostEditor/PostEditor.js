import { useParams } from "react-router-dom";
import PostForm from "../PostForm/PostForm"
import { useSelector } from "react-redux";
import { getPostById } from "../../../utils/storeUtils";

const PostEditor = props => {
  const id = useParams().id;
  const post = useSelector(state => getPostById(state, id));

  return (
    <PostForm edit={true} post={post} />
  );
}

export default PostEditor;