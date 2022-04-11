import React from "react";
import {filterValueType} from "./App";



type TodolistPropsType = {
    topic?: string
    task: Array<InArrayPropsType>
    removeOneTask: (id: string)=>void
    filterTask:(filterValue:filterValueType)=>void
    addTask:()=>void

}

export type InArrayPropsType = {
    id: string,
    title: string,
    isDone: boolean
}



export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h1>{props.topic}</h1>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map((el, index) => {
                    return (
                        <li key={index}>
                            <button onClick={()=>{props.removeOneTask(el.id)}}>X</button>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button onClick={()=>{props.filterTask("All")}}>All</button>
                <button onClick={()=>{props.filterTask("Active")}}>Active</button>
                <button onClick={()=>{props.filterTask("Completed")}}>Completed</button>
            </div>
        </div>
    )
}