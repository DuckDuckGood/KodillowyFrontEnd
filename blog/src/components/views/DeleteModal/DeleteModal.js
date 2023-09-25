import { Modal as BootstrapModal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import './DeleteModal.css';
import { useDispatch } from "react-redux";
import { dispatchDeletePost } from "../../../utils/dispatchUtils";

const DeleteModal = props => {
  const dispatch = useDispatch();
  const post = props.post;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deletePost = () => {
    dispatch(dispatchDeletePost(post.id));
  }

  return (
    <>
      <div className='text-danger d-flex py-2 px-4 rounded-1 h-25 align-items-center border border-danger cursor-pointer' onClick={handleShow}>
        Delete
      </div>

      <BootstrapModal show={show} onHide={handleClose}>
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title className='text-danger'>Warning!</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>Are you sure, you want to delete post "{post.title}"?</BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No!
          </Button>
          <Button variant="danger" onClick={deletePost}>
            Yes, delete
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
}

export default DeleteModal;