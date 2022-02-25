import React, { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(()=>{

        const timeout = setTimeout(()=>{
            setDebouncedValue(value)
        }, delay)

        //выполняем СБРОС эффекта, когда запускается новый useEffect
        return () => {
            clearTimeout(timeout)
        }

    }, [value])

    return debouncedValue;
}
export default useDebounce;