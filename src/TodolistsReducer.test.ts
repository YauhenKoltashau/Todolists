import {useState} from "react";
import {v1} from "uuid";
import {
    addTodolistAC,
    changeTitleTodolistAC, filterTaskTodolistAC,
    removeTodolistAC,
    TodolistsReducer,
    TodolistsType,
} from "./TodolistsReducer";

test('todolist should be added', ()=>{
    let todolistsId1 = v1()
    let todolistsId2 = v1()
    let todolists:TodolistsType = [
            {id: todolistsId1, title: "First todolist", filter: "All"},
            {id: todolistsId2, title: "Second todolist", filter: "All"},
        ]
    let todolistId = v1()
    let addedTodolists:TodolistsType = TodolistsReducer(todolists, addTodolistAC("newTitle", todolistId))
    expect(addedTodolists).not.toBe(todolists)
    expect(addedTodolists.length).toBe(3)
    expect(addedTodolists[0].title).toBe("newTitle")
    expect(addedTodolists[0].id).toBe(todolistId)

})
test('todolist should be removed', ()=>{
    let todolistsId1 = v1()
    let todolistsId2 = v1()
    let todolists:TodolistsType = [
        {id: todolistsId1, title: "First todolist", filter: "All"},
        {id: todolistsId2, title: "Second todolist", filter: "All"},
    ]
    let removedTodolists:TodolistsType = TodolistsReducer(todolists,removeTodolistAC(todolistsId1))
    expect(removedTodolists).not.toBe(todolists)
    expect(removedTodolists.length).toBe(1)
    expect(removedTodolists[0].id).toBe(todolistsId2)
})
test('todolist title should be changed', ()=>{
    let todolistsId1 = v1()
    let todolistsId2 = v1()
    let todolists:TodolistsType = [
        {id: todolistsId1, title: "First todolist", filter: "All"},
        {id: todolistsId2, title: "Second todolist", filter: "All"},
    ]
    let changedTitleTodolists = TodolistsReducer(todolists,changeTitleTodolistAC('newTodolistTitle',todolistsId2))
    expect(changedTitleTodolists).not.toBe(todolists)
    expect(changedTitleTodolists[1].title).toBe('newTodolistTitle')
    expect(todolists[1].title).toBe("Second todolist")
})

test('filter should be seted',()=>{
    let todolistsId1 = v1()
    let todolistsId2 = v1()
    let todolists:TodolistsType = [
        {id: todolistsId1, title: "First todolist", filter: "All"},
        {id: todolistsId2, title: "Second todolist", filter: "Completed"},
    ]
    let setFilterTodolists =TodolistsReducer(todolists,filterTaskTodolistAC('Completed', todolistsId1))
    expect(setFilterTodolists).not.toBe(todolists)
})
