import { makeStyles } from '@material-ui/core';
import { FC, SetStateAction, useContext, useEffect, useMemo, useState } from 'react'
import NumberFormat from 'react-number-format';
import { ThemeContext } from '../../App';
import API from '../../axios/api';
import { ResponseStates, State as StateInterface } from '../../models/states.interface';
import Filter from '../Filter';
import Pagination from '../Pagination';
import Sort from '../Sort';
import State from '../State';
import { Props, Years } from './props.interface';

let PageSize = 8;

const States: FC<Props> = ({ searchTerm }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [statesInfo, setStatesInfo] = useState<StateInterface[]>();
    const [responseApi, setResponseApi] = useState<number>();
    const [year, setYear] = useState<Years>(2019);
    const [sortBy, setSortBy] = useState<'high' | 'low' | 'a-z' | 'z-a' | undefined>(undefined);
    const { background, foreground } = useContext(ThemeContext);
    const useThemes = makeStyles({
        colorBackground: {
            background: background
        },
        infosText: {
            fontSize: 35,
            color: foreground
        },
    })
    const themes = useThemes();
    const styles = useStyles();

    const currentDatas = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return statesInfo?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, statesInfo]);

    const getStatesInfos = async () => {
        const response = await API.get<ResponseStates>(`data?drilldowns=State&measures=Population&year=${year}`);
        setResponseApi(response.status);
        (searchTerm !== "") ?
            setStatesInfo(response.data.data.filter(state => state.State.toLowerCase().includes(searchTerm.toLowerCase()))) :
            setStatesInfo(response.data.data);
        (sortBy === 'high') &&
            setStatesInfo(response.data.data.sort((a, b) => b.Population - a.Population));
        (sortBy === 'low') &&
            setStatesInfo(response.data.data.sort((a, b) => a.Population - b.Population));
            (sortBy === 'a-z') &&
            setStatesInfo(response.data.data);
            (sortBy === 'z-a') &&
            setStatesInfo(response.data.data.reverse());
    }
    useEffect(() => {
        getStatesInfos();
    }, [searchTerm, year, sortBy])

    return (
        <>
            <div className={styles.yearInfos}>
                <div>
                    <p className={themes.infosText}>Population information relative to: {year}</p>
                    <p className={themes.infosText}>Total citiziens:
                        <NumberFormat
                            style={{ marginLeft: '3%' }}
                            className={themes.infosText}
                            value={statesInfo?.reduce((acc, state) => acc + state.Population, 0) as number}
                            decimalSeparator="."
                            displayType='text'
                            thousandSeparator={true}
                            allowNegative={true} />
                    </p>
                </div>
                <div className={styles.filtering}>
                    <Filter changeYear={setYear} />
                    <Sort sortBy={setSortBy} />
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalCount={statesInfo?.length!}
                pageSize={PageSize}
                onPageChange={(page: SetStateAction<number>) => setCurrentPage(page)}
            />
            <div className={styles.states}>
                <div className={styles.container}>
                    {responseApi === 200 ?
                        currentDatas?.map((state, index) =>
                            <State key={index} state={state} />
                        ) :
                        <p className={themes.infosText}>Loading data {responseApi}</p>
                    }
                </div>
            </div>
        </>
    )
}

export default States;
const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '55%',
    },
    filtering:{
        alignItems: 'center',
        display: 'flex',
    },
    states: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '5%'
    },
    yearInfos: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-evenly',
        marginBottom: '-2%'
    }
});