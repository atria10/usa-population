import React, { FC, useContext, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Props } from './filter.interface';
import { Years } from '../States/props.interface';
import { ThemeContext } from '../../App';




const Filter: FC<Props> = ({ changeYear }) => {
    const { background, foreground } = useContext(ThemeContext);
    const StyledMenu = withStyles({
        paper: {
            border: `1px solid ${foreground}`,
        },
    })((props: MenuProps) => (
        <Menu
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            {...props}
        />
    ));
    
    const StyledMenuItem = withStyles((theme) => ({
        root: {
            '&:focus': {
                backgroundColor: background,
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: foreground,
                },
            },
        },
    }))(MenuItem);
    const useThemes = makeStyles({
        buttonBackground: {
            backgroundColor: background,
            border:`1px solid ${foreground}`,
            '&:hover': {
                backgroundColor: foreground,
                border:`1px solid ${background}`,
                color: background
            }
        },
        buttonItem: {
            backgroundColor: background,
        },
        text: {
            color: foreground,
            marginTop: '-1%',

        }
    })
    const themes = useThemes();
    const styles = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const years = [2013, 2014, 2015, 2016, 2017, 2018, 2019];

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleYear = (year: Years) => {
        changeYear(year);
    }

    return (
        <div className={styles.container}>
            <Button className={`${themes.buttonBackground} ${themes.text}`}
                aria-controls="customized-menu" aria-haspopup="true" variant="contained" onClick={handleClick}>
                Change Year
            </Button>
            <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                {years.map(year =>
                    <StyledMenuItem key={year}>
                        <ListItemText primary={year} onClick={() => handleYear(year as Years)} />
                    </StyledMenuItem>
                )}
            </StyledMenu>
        </div>
    );
}
const useStyles = makeStyles({
    container: {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
    },
});

export default Filter;
