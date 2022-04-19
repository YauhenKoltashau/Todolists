import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from "react";
import {filterValueType} from "./App";
import styles from "./App.module.css"


type TodolistPropsType = {
    topic?: string
    task: Array<InArrayPropsType>
    removeOneTask: (id: string) => void
    filterTask: (filterValue: filterValueType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: filterValueType

}

export type InArrayPropsType = {
    id: string,
    title: string,
    isDone: boolean
}


export const Todolist = (props: TodolistPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const[error, setError] = useState<string|null>(null)
    const onChangeNewTaskTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressAddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (newTaskTitle.trim() === "") {
            return
        }
        if (e.key == 'Enter') {
            setNewTaskTitle('');
            props.addTask(newTaskTitle)
        }
    }
    const onClickButtonAddNewTaskHandler = () => {
        if (newTaskTitle.trim() === "") {
            setError("Title is required")
            return
        }
        setNewTaskTitle('');
        props.addTask(newTaskTitle.trim())
    }
    const onClickAllTaskHandler = () => props.filterTask("All")
    const onClickActiveTaskHandler = () => props.filterTask("Active")
    const onClickCompletedTaskHandler = () => props.filterTask("Completed")

    return (
        <div>
            <h1>{props.topic}</h1>
            <div>
                <input className={error ? styles.error: ""}
                    value={newTaskTitle}
                    onChange={onChangeNewTaskTitleInput}
                    onKeyPress={onKeyPressAddNewTaskHandler}/>
                <button onClick={onClickButtonAddNewTaskHandler}>+</button>
            </div>
            { error && <div className={styles.errorMessage}>{error}</div> }
            <ul>
                {props.task.map((el, index) => {
                    const onClickRemoveTaskHandler = () => {
                        props.removeOneTask(el.id)
                    }
                    const onChangeClickCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(el.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={index} className={el.isDone ? styles.isDone : ""}>
                            <button onClick={onClickRemoveTaskHandler}>X</button>
                            <input type="checkbox"
                                   onChange={onChangeClickCheckboxHandler}
                                   checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}

            </ul>
            <div>
                <button className={props.filter === 'All' ? styles.activeFilter: ""} onClick={onClickAllTaskHandler}>All</button>
                <button className={props.filter === 'Active' ? styles.activeFilter: ""} onClick={onClickActiveTaskHandler}>Active</button>
                <button className={props.filter === 'Completed' ? styles.activeFilter: ""} onClick={onClickCompletedTaskHandler}>Completed</button>
            </div>
        </div>
    )
}