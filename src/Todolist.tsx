import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {filterValueType} from "./App";



type TodolistPropsType = {
    topic?: string
    task: Array<InArrayPropsType>
    removeOneTask: (id: string)=>void
    filterTask:(filterValue:filterValueType)=>void
    addTask:(title: string)=>void

}

export type InArrayPropsType = {
    id: string,
    title: string,
    isDone: boolean
}



export const Todolist = (props: TodolistPropsType) => {
    const[newTaskTitle, setNewTaskTitle ]=useState('')
    const onChangeNewTaskTitleInput = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressAddNewTaskHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key == 'Enter'){
            setNewTaskTitle('');
            props.addTask(newTaskTitle)
        }
    }
    const onClickButtonAddNewTaskHandler = () => {
        setNewTaskTitle('');
        props.addTask(newTaskTitle)
    }
    const onClickAllTaskHandler = () => props.filterTask("All")
    const onClickActiveTaskHandler = () => props.filterTask("Active")
    const onClickCompletedTaskHandler = () => props.filterTask("Completed")

    return (
        <div>
            <h1>{props.topic}</h1>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeNewTaskTitleInput}
                       onKeyPress={onKeyPressAddNewTaskHandler}/>
                <button onClick={onClickButtonAddNewTaskHandler}>+</button>
            </div>
            <ul>
                {props.task.map((el, index) => {
                    const onClickRemoveTaskHandler = () => {
                        props.removeOneTask(el.id)
                    }
                    return (
                        <li key={index}>
                            <button onClick={onClickRemoveTaskHandler}>X</button>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button onClick={onClickAllTaskHandler}>All</button>
                <button onClick={onClickActiveTaskHandler}>Active</button>
                <button onClick={onClickCompletedTaskHandler}>Completed</button>
            </div>
        </div>
    )
}