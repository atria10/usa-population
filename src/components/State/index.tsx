import { FC, useContext, useState } from 'react';
import { Props } from './state.interface';

import { makeStyles } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { isoCodes } from './ISO_CODES';
import { ThemeContext } from '../../App';


const State: FC<Props> = ({ state }) => {
    const { background, foreground } = useContext(ThemeContext);
    const useThemes = makeStyles({
        container: {
            alignItems: 'center',
            backgroundColor: background,
            border: `1px solid ${foreground}`,
            borderRadius: 15,
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '2%',
            padding: 15,
            minWidth: 150,
            width: 'fit-content',
        },
        text: {
            color: foreground,
            fontWeight: 'bold'
        }
    })
    const themes = useThemes();
    const styles = useStyles();
    const [isHover, setIsHover] = useState<boolean>(false);
    return (
        <div className={`${themes.container} ${isHover ? "" : styles.imageContainer}`} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {isHover ?
                <>
                    <div className={styles.name}>
                        <p className={themes.text}>{state.State}</p>
                    </div>
                    <div className={styles.infos}>
                        <p className={themes.text}>Year: {state.Year}</p>
                        <p className={themes.text}>Population:
                            <NumberFormat
                                className={themes.text}
                                value={state.Population}
                                decimalSeparator="."
                                displayType='text'
                                thousandSeparator={true}
                                allowNegative={true} />
                        </p>
                        {(state.Population > 2000000) ?
                            <p style={{ color: 'red' }}>Large Density</p> :
                            (state.Population < 2000000 && state.Population > 1000000) ?
                                <p style={{ color: 'gold' }}>Normal Density</p> :
                                <p style={{ color: 'green' }}>Low Density</p>
                        }
                    </div>
                </> :
                <>
                    <img className={styles.image} 
                    src={`https://flagcdn.com/w80/${isoCodes.find((state1=>state1.name.toLowerCase()===state.State.toLowerCase()))?.isoCode.toLowerCase()}.png`}
                    width="80" alt="Logo" />
                    <p className={themes.text}>{state.State}</p>
                </>
            }
        </div>
    )


}

export default State;
const useStyles = makeStyles({
   
    image: {
        borderRadius: 100
    },
    imageContainer: {
        height: 250,
    },
    infos: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
    },
    name: {
        alignItems: 'center',
        fontSize: '100%',
        fontWeight: 'bold',
        justifyContent: 'center',
    },
});
