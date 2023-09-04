import styles from './flex-box-container.module.scss';

const FlexBoxContainer = props => (
  <div className={styles.container}>{props.children}</div>
);
export default FlexBoxContainer;