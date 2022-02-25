import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { useQueryParams } from '../../utils/customHooks/useQueryParams';
import useFollowLink from '../../utils/customHooks/useFollowLink';
const useStyles = makeStyles((theme) => ({

}));

const PaginationPrimary = ({ numberOfPages }) => {

    const classes = useStyles();
    
    //Читаем текущую страницу из queryParams
    const queryParams = useQueryParams(); 
    const currentPageNum = Number(queryParams.get('page')) || 1;
    const followLink = useFollowLink();

    return (
        <Pagination 
            count={numberOfPages}
            page={currentPageNum}
            onChange={(event, value) => {followLink(`?page=${value}`, false)}}
            shape="rounded" 
            color="primary" 
            size="medium"
        />
    )
}

export default PaginationPrimary

//Устанавливаем и передаем текущую страницу в queryParams
    // const [page, setPage] = useState(currentPageNum);
    // const handleChange = (event, value) => {
    //     setPage(value);
    //     console.log(value)
    // };