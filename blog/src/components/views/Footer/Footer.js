import { BLOG_APP, COPYRIGHT } from '../../../utils/fields';
import './Footer.css';

const Footer = () => (
  <div className='text-center text-muted mt-5'>
    {COPYRIGHT}<i class="bi bi-c-circle"></i>{BLOG_APP}
  </div>
);

export default Footer;