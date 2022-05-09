import React, { ChangeEvent, FC, useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, alpha, Theme, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Props } from './navbar.interface';
import { ThemeContext } from '../../App';



const Navbar: FC<Props> = ({ searchTerm, setSideBar }) => {
    const { background, foreground } = useContext(ThemeContext);

    const useThemes = makeStyles({
        nav: {
            background: background
        },
        text: {
            color: foreground
        }
    })
    const themes = useThemes();
    const classes = useStyles();
    const [term, setTerm] = useState<string>("");
    const handleSearch =
        (e: ChangeEvent<HTMLInputElement>) => {
            setTerm(e.currentTarget.value);
            searchTerm(e.currentTarget.value);
        }
    return (
        <div className={classes.root}>
            <AppBar position="static" className={themes.nav}>
                <Toolbar>
                    <IconButton edge="start" className={`${classes.menuButton} ${themes.text}`} aria-label="open drawer"
                        onClick={() => setSideBar()}>
                        <MenuIcon />
                    </IconButton>
                    <Typography className={`${classes.title} ${themes.text}`} variant="h6" noWrap>
                        USA POPULATION
                    </Typography>
                    <div className={`${classes.search} ${themes.text}`}>
                        <div className={`${classes.searchIcon} ${themes.text}`}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            onChange={handleSearch}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            value={term}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default Navbar;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }),
);