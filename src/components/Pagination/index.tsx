import { makeStyles } from '@material-ui/core';
import { FC, useContext } from 'react';
import { usePagination } from '../../Hooks/PaginationHook';
import { Props } from './pagination.interface';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { ThemeContext } from '../../App';

const Pagination: FC<Props> = ({ onPageChange, totalCount, currentPage, pageSize }) => {

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize
  });
  const { background, foreground } = useContext(ThemeContext);
  const useThemes = makeStyles({
    button: {
      backgroundColor: background,
      borderRadius: '100%',
      color: foreground,
      height: 40,
      margin: 0 | 10,
      width: 'fit-content',
      '&:hover': {
        backgroundColor: foreground,
        color: background,
      }
    }
  })
  const themes = useThemes();
  const styles = useStyles();

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange ? paginationRange[paginationRange!.length - 1] : 0;
  return (
    <div className={styles.container}>
      <button className={themes.button} onClick={onPrevious} style={{ display: currentPage === 1 ? 'none' : '' }}>
        <KeyboardArrowLeftIcon />
      </button>
      <button className={themes.button} onClick={onNext} style={{ display: currentPage === lastPage ? 'none' : '' }}
      ><KeyboardArrowRightIcon /></button>
    </div>
  )
};
export default Pagination;

const useStyles = makeStyles({
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '5%',
    marginBottom: '-5%'
  },
});