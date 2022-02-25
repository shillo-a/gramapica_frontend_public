import React from 'react'
import { useState } from 'react';

const UseState = () => {

    const [count, setCount] = useState(0);

    console.log('render: UseState')

    return (
        <div>
            <div>{count}</div>
            <button onClick={() => setCount(prevState => prevState +1)}>Increment</button>
            <button onClick={() => setCount(0)}>Count to 0</button>
            <button onClick={() => setCount(5)}>Count to 5</button>      
        </div>
    )
}

export default UseState
