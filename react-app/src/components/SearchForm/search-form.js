import Button from '../Button/button';
import TextInput from '../TextInput/text-input';
import styles from './search-form.module.scss';

const SearchForm = () => (
  <form className={styles.searchForm}>
    <TextInput placeholder="Search..." />
    <Button className={styles.button}><span className='fa fa-search'></span></Button>
  </form>
);
export default SearchForm;