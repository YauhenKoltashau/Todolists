import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    const arr1=[
        {id: 1, title: "HTML&CSS1", isDone: true},
        {id: 2, title: "JS1", isDone: true},
        {id: 3, title: "ReactJS1", isDone: false},
        {id: 4, title: "Rest API1", isDone: false},

    ]

    const arr2=[
        {id: 1, title: "HTML&CSS22", isDone: true},
        {id: 2, title: "JS22", isDone: true},
        {id: 3, title: "ReactJS22", isDone: false},
        {id: 4, title: "Rest API22", isDone: false},
        {id: 5, title: "GraphQL22", isDone: false},
    ]
    const arr3=[
        {id: 1, title: "HTML&CSS333", isDone: true},
        {id: 2, title: "JS333", isDone: true},
        {id: 3, title: "ReactJS333", isDone: false},
        {id: 4, title: "Rest API333", isDone: false},
        {id: 5, title: "GraphQL333", isDone: false},
        {id: 5, title: "GraphQL333", isDone: false},
    ]


    return (
        <div className="App">
            <Todolist topic={"Simple string"} arr={arr1}/>
            <Todolist topic={"Second string"} arr={arr2}/>
            <Todolist topic={"Third string"} arr={arr3}/>

        </div>
    );
}

export default App;
