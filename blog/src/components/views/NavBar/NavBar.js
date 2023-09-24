import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <div className='d-flex bg-primary justify-content-between p-2 text-light rounded-1'>
    <div className='d-flex align-items-center mx-3'>
      Blog.app
    </div>
    <div className='d-flex align-items-center justify-content-end '>
      <Nav className='me-auto'>
        <Nav.Link as={NavLink} className='text-light' to='/home'>Home</Nav.Link>
        <Nav.Link as={NavLink} className='text-light' to='/about'>About</Nav.Link>
      </Nav>
    </div>
  </div>
);

export default NavBar;