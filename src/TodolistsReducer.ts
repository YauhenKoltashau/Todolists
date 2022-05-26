export type filterValueType ="All" | "Active" | "Completed"
export type TodolistType = {
    id: string
    title: string
    filter: filterValueType
}
export type TodolistsType = Array<TodolistType>

// type changeTitleTodolistACType = ReturnType<typeof changeTitleTodolistAC>
// type filterTaskTodolistACType = ReturnType<typeof filterTaskTodolistAC>
// type removeTodolistACType = ReturnType<typeof removeTodolistAC>
// type addTodolistACType = ReturnType<typeof addTodolistAC>
// type TodolistACTypes = addTodolistACType | removeTodolistACType | filterTaskTodolistACType |changeTitleTodolistACType

export type TodolistACTypes = RemoveTodolistACType|AddTodolistACType|ChangeTitleTodolistACType|FilterTaskTodolistACType
export type RemoveTodolistACType = {
    type: "REMOVE-TODOLIST"
    tlId: string
}
export type AddTodolistACType = {
    type: "ADD-TODOLIST"
    title: string
    tlId: string
}
export type ChangeTitleTodolistACType = {
    type: "CHANGE-TITLE-TODOLIST"
    title: string
    tlId: string

}
export type FilterTaskTodolistACType = {
    type: "FILTER-TASK-TODOLIST"
    filterValue: filterValueType
    tlId: string

}

export const changeTitleTodolistAC = (title: string, tlId: string):ChangeTitleTodolistACType =>{
    return {
        type: 'CHANGE-TITLE-TODOLIST',
        title: title,
        tlId:tlId
    }as const
}
export const addTodolistAC = (title: string,tlId: string):AddTodolistACType =>{
    return {
        type: 'ADD-TODOLIST',
        title: title,
        tlId:tlId
    }as const
}
export const removeTodolistAC = (tlId: string):RemoveTodolistACType =>{
    return {
        type: 'REMOVE-TODOLIST',
        tlId: tlId
    }as const
}
export const filterTaskTodolistAC = (filterValue:filterValueType,tlId: string):FilterTaskTodolistACType => {
    return {
        type: 'FILTER-TASK-TODOLIST',
        filterValue: filterValue,
        tlId: tlId
        }as const
}


export const TodolistsReducer = (state:TodolistsType, action: TodolistACTypes):TodolistsType => {
switch (action.type) {
    case "ADD-TODOLIST":
        let newTodolist: TodolistType = {id: action.tlId, title: action.title, filter: "All"}
        return [newTodolist,...state]
    case "REMOVE-TODOLIST":
        return [...state.filter((tl) => tl.id !== action.tlId)]
    case "CHANGE-TITLE-TODOLIST":
        return [...state.map(tl=>tl.id===action.tlId?{...tl,title:action.title}:tl)]
    case "FILTER-TASK-TODOLIST":
        return [...state.map((tl) => tl.id === action.tlId ? {...tl, filter: action.filterValue} : tl)]
    





}return state
}