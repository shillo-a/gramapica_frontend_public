import React from 'react'
import { useState } from 'react'

const initialState = {
    firstName: 'Alexey',
    lastName: 'Shillo'
}

const ObjectUseState = () => {

    const [person, setPerson] = useState(initialState);

    console.log('render: ObjectUseState')

    const changeName = () => {
        setPerson({firstName: 'Test', lastName: 'Test'})
    }

    return (
        <div>
            <div>{person.firstName} {person.lastName}</div>
            <button onClick={changeName}>Change name</button>
        </div>
    )
}

export default ObjectUseState;

