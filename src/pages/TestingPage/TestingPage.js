import { CodeSharp } from '@material-ui/icons';
import React from 'react';
import { useState } from 'react';
import ArrayUseState from './ImmutableState/ArrayUseState';
import ObjectUseState from './ImmutableState/ObjectUseState';
import Parent from './ParentChild/Parent';
import ThisPage from './ThisPage';
import UseReducer from './UseReducer';
import UseState from './UseState';

const TestingPage = () => {

    const users = [
        {id: '1', name: 'Александр'},
        {id: '2', name: 'Иван'},
        {id: '3', name: 'Дмитрий'},
    ]

    const [searchValue, setSearchValue] = useState('');
    const [activeUsers, setActiveUsers] = useState(users);


    const handleSearch = () => {

        //1. Получаем array значений из инпута
        let searchUserNames = searchValue.split(',');
        
        //2. Ищем, есть ли в списке эти люди
        let findedUsers = [];

        for (const searchUserName of searchUserNames){
            console.log(searchUserName)
            let user = users.find(user => user.name === searchUserName)
            if(user){
                findedUsers.push(user)
            }
        }

        console.log(findedUsers)
      
        setActiveUsers(findedUsers)

    }

    return (
        <div style={{margin: '1rem'}}>
            <input type='text'
                value={searchValue}
                onChange={(e)=>setSearchValue(e.target.value)}
            />
            <button 
                type='button'
                onClick={handleSearch}
            >Search</button>
            <ul>
                {activeUsers.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default TestingPage



// console.log('render: TestingPage')

//     console.log(ThisPage)

//     {/* 1 <UseState/> */}
//             {/* 2 <UseReducer/> */}
//             {/* 3 <ObjectUseState/> */}
//             {/* 3 <ArrayUseState/> */}
//             {/* <Parent/> */}
//             {/* <ThisPage/> */}