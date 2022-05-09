import { makeStyles } from '@material-ui/core';
import React, { FC, useContext } from 'react'
import { Provider } from 'react-redux';
import { ThemeContext } from '../../App';
import store from '../../store';
import SwitchTheme from '../Switch';
import { Props } from './sidebar.interface';

const SideBar: FC<Props> = ({ setTheme }) => {
    const { background, foreground } = useContext(ThemeContext);
    const useThemes = makeStyles({
        colorBackground: {
            background: background
        },
        text: {
            color: foreground
        }
    })
    const themes = useThemes();
    const styles = useStyles();
    return (
        <Provider store={store}>
            <div className={`${styles.container} ${themes.colorBackground}`}>
                <h1>SideBar</h1>
                <div className={styles.switch}>
                    <p className={`${themes.text}`}>Change Theme:</p>
                    <SwitchTheme setTheme={setTheme} />
                </div>
            </div>
        </Provider>
    )
}

export default SideBar;
const useStyles = makeStyles({
    container: {
        minHeight: document.documentElement.offsetHeight,
        position: 'absolute',
        top: '10%',
        width: '12%'
    },
    switch: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    }
});