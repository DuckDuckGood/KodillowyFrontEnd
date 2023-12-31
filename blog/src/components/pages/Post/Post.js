import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getPostById } from "../../../utils/storeUtils";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import DeleteModal from "../../views/DeleteModal/DeleteModal";
import { AUTHOR, CATEGORY, EDIT, PUBLISHED } from "../../../utils/fields";

const Post = () => {
  const id = useParams().id;
  const poste = useSelector(state => getPostById(state, id));

  if (!poste) {
    return <Navigate to='/' />
  }

  return (
    <div className='d-flex m-5 p-5 border border-secondary rounded-1 justify-content-center'>
      <div className='d-flex w-50'>
        <div className='d-flex w-80 flex-column'>
          <span className='fs-1'>{poste.title}</span>
          <span><b>{AUTHOR}</b>: {poste.author}</span>
          <span><b>{PUBLISHED}</b>: {poste.published}</span>
          <span className='pb-2'><b>{CATEGORY}</b>: {poste.category}</span>
          <span className='fs-4' dangerouslySetInnerHTML={{__html: poste.content}}></span>
        </div>
        <div className='d-flex justify-content-end'>
          <Nav className='d-flex flex-nowrap'>
            <Nav.Link as={NavLink} className='text-primary d-flex py-3 px-4 rounded-1 h-25 align-items-center border border-primary mx-2' to={`/edit/${poste.id}`}>{EDIT}</Nav.Link>
          </Nav>
          <DeleteModal post={poste} />
        </div>
      </div>
    </div>
  );
};

export default Post;