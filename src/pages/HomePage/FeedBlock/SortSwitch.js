import { Button, IconButton, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import clsx from 'clsx';
import ButtonTertiary from '../../../components/Button/ButtonTertiary';
import SelectTopArticlesDropDown from '../../../parts/DropDown/SelectTopArticlesDropDown';
import useFollowLink from '../../../utils/customHooks/useFollowLink';


const useStyles = makeStyles((theme) => ({

    button: {
        // marginRight: theme.spacing(1),
        // '&:last-child': {
        //     marginRight: 0
        // }
    },

    sortButtonContainer: {
        // display:'flex',
        // flexDirection: 'column'
    },
    

}))

const SortSwitch = ({ className, currentSortType, currentSortSubtype }) => {

    const classes = useStyles();
    const followLinkHandler = useFollowLink();

    return (
        <div className={clsx(className, classes.sortButtonContainer)}>

            {/* Есть два типа кнопОк: одни - сейчас активные и работают, как dropDown, другие - неактивны и только переключают вкладку*/}
            {/* На время загрузки надо блокировать кнопки? */}

            {currentSortType === '' || currentSortType === 'top' ?
                <SelectTopArticlesDropDown currentSortSubtype={currentSortSubtype}/> : //dropdown
                <Button className={classes.button}
                    onClick={() => followLinkHandler('/top')}
                >Популярное</Button> //change page
            }

            {currentSortType === 'new' ?
                <ButtonTertiary className={classes.button}>Свежее</ButtonTertiary> : //dropdown
                <Button className={classes.button}
                    onClick={() => followLinkHandler('/new')}
                >Свежее</Button> //change page
            }



            
        </div>
    )
}

export default SortSwitch


  // //Управление способа сортировки
    // const [sortMenu, setSortMenu] = useState({
    //     currentItemId: 1,
    //     items: [
    //         {id: 1, name: 'Популярное'},
    //         {id: 2, name: 'Свежее'},
    //     ]
    // })

{/* <ButtonTertiary>Свежее</ButtonTertiary> */}

            {/* <TabButton 
                className={classes.popularButton}
                onClick={() => setSortMenu({...sortMenu, currentItemId: 1})} 
                state={sortMenu.currentItemId===1 ? 'active' : 'non-active'} 
            >Популярное</TabButton> */}


{/* <ButtonTertiary className={classes.button}>Популярное</ButtonTertiary>
            <ButtonTertiary className={classes.button}>Свежее</ButtonTertiary>

            
            <TabButton 
                className={classes.button}
                onClick={() => setSortMenu({...sortMenu, currentItemId: 2})}
                // state={sortMenu.currentItemId===2 ? 'active' : 'non-active'} 
            >Свежее</TabButton> */}

// alternative - ButtonTertiary

//<SelectPopularArticlesDropDown/>

{/* <SelectPopularArticlesDropDown/> */}
