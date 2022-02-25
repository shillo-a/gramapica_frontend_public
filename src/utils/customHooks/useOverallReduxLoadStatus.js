import { useState } from "react"
import { useSelector } from "react-redux"
import { idle, failed, loading, succeeded } from "../apis/config/statuses"

// Проверяем по переданным селекторам со статусами, загрузилась ли вся необходимая информация
export const useOverallReduxLoadStatus = (selectorFunctions) => {

    //1. Сохраняем все статусы
    let statuses = new Map();
    for (const selectorFunction of selectorFunctions){
        statuses.set(selectorFunction.name, useSelector(selectorFunction))
    }

    //2. Определяем общий статус
    //'idle', 'loading', 'rejected', 'succeeded' = 'idle'
    //'rejected', 'succeeded' = 'rejected'
    //'succeeded' = 'succeeded'

    let overallStatus = idle.status;
    for (const status of statuses.values()){

        switch(status.status){

            case idle.status: {
                return overallStatus = idle.status;
            }

            case loading.status: {
                return overallStatus = loading.status;
            }

            case failed.status: {
                return overallStatus = failed.status;
            }

            default: {
                return overallStatus = succeeded.status;
            }
            
        }
        
    }

    return overallStatus

}


// console.log(selectors)

// import { useDispatch, useSelector } from 'react-redux';

// if(status.status === idle.status){
//     overallStatus = idle.status;
//     return
// }

// if(status.status === idle.status){
//     overallStatus = idle.status;
//     return
// }

// if(status.status === failed.status){
//     overallStatus = failed.status
//     return
// }
