import {TasksType} from "./App";
import {v1} from "uuid";
type ChangeStatusTaskACType = {
    type: 'CHANGE-STATUS-TASK'
    taskId: string
    isDone: boolean
    tlId: string
}
type ChangeTitleTaskACType = {
    type: 'CHANGE-TITLE-TASK',
    title: string
    taskId: string
    todolistId: string
}
type RemoveTaskACType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
type AddTaskACType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type ACTypes = AddTaskACType | RemoveTaskACType | ChangeTitleTaskACType | ChangeStatusTaskACType

export const addTaskAC = (title: string, todolistId: string): AddTaskACType => {
    return {
        type: 'ADD-TASK',
        title: title,
        todolistId: todolistId
    }
}
export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskACType => {
    return {
        type: 'REMOVE-TASK',
        todolistId: todolistId,
        taskId: taskId
    }
}
export const changeTitleTaskAC = (title: string, taskId: string, todolistId: string): ChangeTitleTaskACType => {
    return {
        type: 'CHANGE-TITLE-TASK',
        title: title,
        taskId: taskId,
        todolistId: todolistId
    }
}
export const changeStatusTaskAC = (taskId: string, isDone: boolean, tlId: string):ChangeStatusTaskACType => {
    return {
        type: 'CHANGE-STATUS-TASK',
        taskId: taskId,
        isDone: isDone,
        tlId: tlId
    }
}

export const TasksReducer = (state: TasksType, action: ACTypes): TasksType => {
    switch (action.type) {
        case 'ADD-TASK': {
            let task = {id: v1(), title: action.title, isDone: false}
            return {...state,[action.todolistId]:[task, ...state[action.todolistId]]}
        }
        case 'REMOVE-TASK': {
            return {...state,[action.todolistId]:state[action.todolistId].filter(t => t.id !== action.taskId)}
        }
        case "CHANGE-TITLE-TASK": {
            return {...state,[action.todolistId]:state[action.todolistId].map(t=>t.id===action.taskId?{...t,title:action.title}:t)}
        }
        case "CHANGE-STATUS-TASK":{
            return {...state,[action.tlId]:state[action.tlId].map(t => t.id === action.taskId?{...t,isDone:action.isDone}:t)}
        }



    }
    return state
}