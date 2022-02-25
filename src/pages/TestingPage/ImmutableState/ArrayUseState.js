import React, { useState } from 'react'

const ArrayUseState = () => {

    const initState = ['Bruce', 'Alexey'];

    const [names, setNames] = useState(initState);

    console.log('render: ArrayUseState')

    const handleAdd = () => {
        setNames(prevState => [...prevState, 'New name'])
    }
    return (
        <div>
            <ul>{
                names.map(name => <li key={name}>{name}</li> )
            }</ul>

            <button onClick={handleAdd}>Add</button>

        </div>
    )
}

export default ArrayUseState
