import Button from '../Button/button';
import TextInput from '../TextInput/TextInput';
import styles from './search-form.module.scss';

const SearchForm = parameters => {
  return (
    <form className={styles.searchForm} onSubmit={parameters.onSubmit}>
      <TextInput placeholder="Search..." />
      <Button className={styles.button}>{parameters.buttonMsg ? parameters.buttonMsg : <span className='fa fa-search'></span>}</Button>
    </form>
  );
};
export default SearchForm;