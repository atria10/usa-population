import { FC, useContext, useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { makeStyles } from '@material-ui/core';
import { Props } from './sort.interface';
import { ThemeContext } from '../../App';


const Sort: FC<Props> = ({ sortBy }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { background, foreground } = useContext(ThemeContext);
    const useThemes = makeStyles({
        button: {
            backgroundColor: background,
            borderBottom: '1px solid',
            color: foreground,
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: foreground,
                color: background,
            }
        },
        popover: {
            backgroundColor: background,
            border: `1px solid ${foreground}`,
        }
    })
    const themes = useThemes();
    const styles = useStyles();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button aria-describedby={id} className={themes.popover} onClick={handleClick}>
                <span style={{ color: foreground }}>Order by:</span>
            </Button>
            <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}>
                <div className={styles.container}>
                    <Typography variant='button' className={themes.button} sx={{ p: 1 }} onClick={() => sortBy('high')}>
                        <ArrowUpwardIcon />Population (high to low) </Typography>
                    <Typography className={themes.button} variant='button' sx={{ p: 1 }} onClick={() => sortBy('low')}>
                        <ArrowDownwardIcon />Population (low to high)</Typography>
                    <Typography className={themes.button} variant='button' sx={{ p: 1 }} onClick={() => sortBy('a-z')}>
                        <ArrowUpwardIcon />Alphabetical Order (a-z)</Typography>
                    <Typography className={themes.button} variant='button' sx={{ p: 1 }} onClick={() => sortBy('z-a')}>
                        <ArrowDownwardIcon />Alphabetical Order (z-a)</Typography>
                </div>
            </Popover>
        </div>
    );
}
export default Sort;
const useStyles = makeStyles({
    container: {
        alignItems: 'center',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'column',
    },
});