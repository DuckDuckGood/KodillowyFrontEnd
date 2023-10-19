import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HOME, WAITER_APP } from "../../../utils/fields";

const Header = () => (
  <Nav>
    <div className='d-flex flex-nowrap w-100 p-1 bg-primary rounded-bottom'>
      <div className='w-50 text-light'> {/* left side */}
        <Nav.Link as={NavLink} className='text-light' to='/'>{WAITER_APP}</Nav.Link>
      </div>

      <div className='d-flex w-50 text-light justify-content-end'> {/* right side */}
        <Nav.Link as={NavLink} className='text-light' to='/'>{HOME}</Nav.Link>
      </div>
    </div>
  </Nav>
);

export default Header;