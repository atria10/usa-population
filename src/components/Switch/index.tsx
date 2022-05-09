import { FC } from 'react';
import Switch from '@mui/material/Switch';
import { Props } from '../SideBar/sidebar.interface';
import { useDispatch, useSelector } from 'react-redux';
import { selectSwitcher } from '../../store/switch/switch.selector';
import { switcher } from '../../store/switch/switch.actions';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const SwitchTheme: FC<Props> = ({ setTheme }) => {
    const isChecked = useSelector(selectSwitcher);
    const dispatch = useDispatch();
    return (
        <Switch onClick={() => (setTheme(), dispatch(switcher(!isChecked)))}{...label} checked={isChecked} />
    );
}
export default SwitchTheme;