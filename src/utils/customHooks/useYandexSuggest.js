import React, { useEffect, useState } from "react";

const useYandexSuggest = (valueForSearch) => {
    //Результаты поиска через Yandex API (suggest)
    const [searchResults, setSearchResults] = useState([]);

    //Осуществляем текстовый поиск мест 
    useEffect(() => {
        if(valueForSearch){
            ymaps.suggest(valueForSearch)
            .then(items => {
                setSearchResults(items)
            });
        }
    }, [valueForSearch])

    return searchResults;
}

export default useYandexSuggest;