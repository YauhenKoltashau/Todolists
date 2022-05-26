import React, {ChangeEvent} from "react";
import styles from "./App.module.css"
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";
import {filterValueType} from "./TodolistsReducer";


type TodolistPropsType = {
    tlId: string
    title: string
    tasks: Array<InArrayPropsType>
    removeOneTask: (id: string, tlId: string) => void
    filterTask: (filterValue: filterValueType, tlId: string) => void
    addTask: (title: string, tlId: string) => void
    changeStatus: (taskId: string, isDone: boolean, tlId: string) => void
    filter: filterValueType
    removeTodolist: (tlId: string) => void
    changeTitleTask: (title: string, taskId: string, tlId: string) => void
    changeTitleTodolist:(title: string, tlId: string) => void

}

export type InArrayPropsType = {
    id: string,
    title: string,
    isDone: boolean
}


export const Todolist = (props: TodolistPropsType) => {
    // const [newTaskTitle, setNewTaskTitle] = useState('')
    // const [error, setError] = useState<string | null>(null)
    //
    // const onChangeNewTaskTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    //     setNewTaskTitle(e.currentTarget.value)
    // }
    // const onKeyPressAddNewTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null)
    //     if (newTaskTitle.trim() === "") {
    //         return
    //     }
    //     if (e.key == 'Enter') {
    //         setNewTaskTitle('');
    //         props.addTask(newTaskTitle, props.tlId)
    //     }
    // }
    //
    // const onClickButtonAddNewTaskHandler = () => {
    //     if (newTaskTitle.trim() === "") {
    //         setError("Title is required")
    //         return
    //     }
    //     setNewTaskTitle('');
    //     props.addTask(newTaskTitle.trim(), props.tlId)
    // }
    const onClickAllTaskHandler = () => props.filterTask("All", props.tlId)
    const onClickActiveTaskHandler = () => props.filterTask("Active", props.tlId)
    const onClickCompletedTaskHandler = () => props.filterTask("Completed", props.tlId)
    const addTask = (title: string) => {
        props.addTask(title, props.tlId)
    }

    const changeTitleTodolist = (title: string) => {
      props.changeTitleTodolist(title,props.tlId)
    }

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan
                        title={props.title}
                        editTitle={changeTitleTodolist}

                    />

                    <button onClick={() => props.removeTodolist(props.tlId)}>X</button>
                </h3>

            </div>
            <AddItemForm
                addItem={addTask}
                name={'add task'}
            />

            <ul>
                {props.tasks.map((el, index) => {
                    const onClickRemoveTaskHandler = () => {
                        props.removeOneTask(el.id, props.tlId)
                    }
                    const onChangeClickCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(el.id, e.currentTarget.checked, props.tlId)
                    }
                    const changeTitle = (title:string) => {
                        props.changeTitleTask(title, el.id,props.tlId )

                    }
                    return (
                        <li key={index} className={el.isDone ? styles.isDone : ""}>
                            <button onClick={onClickRemoveTaskHandler}>X</button>
                            <input type="checkbox"
                                   onChange={onChangeClickCheckboxHandler}
                                   checked={el.isDone}/>
                            <EditableSpan
                                key={el.id}
                                title={el.title}
                                editTitle={changeTitle}



                            />

                        </li>
                    )
                })}

            </ul>
            <div>
                <button className={props.filter === 'All' ? styles.activeFilter : ""}
                        onClick={onClickAllTaskHandler}>All
                </button>
                <button className={props.filter === 'Active' ? styles.activeFilter : ""}
                        onClick={onClickActiveTaskHandler}>Active
                </button>
                <button className={props.filter === 'Completed' ? styles.activeFilter : ""}
                        onClick={onClickCompletedTaskHandler}>Completed
                </button>
            </div>
        </div>
    )
}