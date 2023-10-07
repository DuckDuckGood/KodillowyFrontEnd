import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ABOUT, BLOG_APP, HOME } from '../../../utils/fields';

const NavBar = () => (
  <div className='d-flex bg-primary justify-content-between p-2 text-light rounded-1'>
    <div className='d-flex align-items-center mx-3'>
      {BLOG_APP}
    </div>
    <div className='d-flex align-items-center justify-content-end '>
      <Nav className='me-auto'>
        <Nav.Link as={NavLink} className='text-light' to='/home'>{HOME}</Nav.Link>
        <Nav.Link as={NavLink} className='text-light' to='/about'>{ABOUT}</Nav.Link>
      </Nav>
    </div>
  </div>
);

export default NavBar;