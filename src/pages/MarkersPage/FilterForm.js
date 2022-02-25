import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import DropDownLink from '../../components/Link/DropDownLink';

import LinkRegular from '../../components/Link/LinkRegular'
import DropDownChip from '../../components/Button/DropDownChip';
import SearchInput from '../../components/Form/Input/SearchInput'
import ButtonTertiary from '../../components/Button/ButtonTertiary';

const useStyles = makeStyles((theme) => ({
    filterBlock: {
        ...theme.typography.body1,
       paddingBottom: theme.spacing(1)
    },

    filterList: {
        paddingTop: theme.spacing(1)
    },

    filter: {
        margin: theme.spacing(0.6),
        ...theme.typography.body2,
    },

    buttonCategory: {
        marginLeft: theme.spacing(1),
        padding: 0,
    },

    results: {
        paddingTop: theme.spacing(0.5)
    },

    clearFilter: {
        ...theme.typography.caption,
        paddingLeft: theme.spacing(0.5)
    },

    sorting: {
        paddingTop: theme.spacing(0.5)
    },

    dropDownLink: {
        ...theme.typography.caption,
        padding: 0,
        
    }
}))

const FilterForm = () => {

    const classes = useStyles();

    //Управление способа сортировки
    const [sortMenu, setSortMenu] = useState({
        currentItem: {id: 1, name: 'Популярное'},
        items: [
            {id: 1, name: 'Популярное'},
            {id: 2, name: 'Свежее'},
        ]
    })

    const changeSortMenu = (id) => {
        setSortMenu({
            ...sortMenu, 
            currentItem: sortMenu.items.find(item => {
            return item.id === id
        })})
    }

    //TMP категории мест
    const [attractionCategory, setAttractionCategory] = useState({
        currentItem: {id: 1, name: 'Все'},
        items: [
            {id: 1, name: 'Все'},
            {id: 2, name: 'Из книги'},
            {id: 3, name: 'Из фильма'},
            {id: 4, name: 'Из песни'},
            {id: 5, name: 'По событию'}
        ]
    })

    const changeAttractionCategory = (id) => {
        setAttractionCategory({
            ...attractionCategory, 
            currentItem: attractionCategory.items.find(item => {
            return item.id === id
        })})
    }

    return (
        <div className={classes.filterBlock}>
            
            <div className={classes.results}>
                Найдено 4 места:
                <LinkRegular className={classes.clearFilter}>Очистить фильтры</LinkRegular>
            </div>

            <div className={classes.results}>
                Сортировка:
                <LinkRegular className={classes.clearFilter}>
                    <DropDownLink className={classes.dropDownLink} menu={sortMenu} setMenu={changeSortMenu} />
                </LinkRegular>
            </div>

        </div>
    )
}

export default FilterForm
