import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postTokenValidity } from '../../store/slices/authenticationSlice';
import { getRegions } from '../../store/slices/regionsSlice';

export const usePreloadData = () => {

    const dispatch = useDispatch();
    
    const [appIsLoaded, setAppIsLoaded] = useState();
    
    useEffect(() => {
        //Запускаем цепочку асинхронных запросов (выполнились они успешно или нет не важно!)

        async function launchAsyncChain(){
            //1. Проверяем, авторизован ли пользователь (действителен ли token в local storage)
            const test = await dispatch(postTokenValidity());
            
            //2. Получаем сведения о доступных Регионах
            await dispatch(getRegions());

            //Устанавливаем статус, что приложение загружено
            setAppIsLoaded(true);

        }

        launchAsyncChain();
    }, [])

    return appIsLoaded;

}



// const useMountFinished = () => {
//   const isMountRef = useRef(false);
//   useEffect(() => {
//     isMountRef.current = true;
//   }, []);
//   return isMountRef.current;
// };

// export default useMountFinished

// useEffect(()=>{
//     dispatch(postTokenValidity())
// },[])

//проверяем, авторизован ли пользователь (действителен ли token в local storage)
    //Это можно засунуть в Navbar (+ в отедльный hook)
    // const tokenValidityStatus = useSelector(selectTokenValidityStatus)