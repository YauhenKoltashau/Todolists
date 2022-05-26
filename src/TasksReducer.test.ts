import {v1} from "uuid";
import {
    addTaskAC,
    changeStatusTaskAC,
    changeTitleTaskAC,
    removeTaskAC,
    TasksReducer
} from "./TasksReducer";
import {TasksType} from "./App";

let todolistsId1 = v1()
let todolistsId2 = v1()
const tasks = {
    [todolistsId1]: [
        {id: v1(), title: "HTML&CSS1", isDone: false},
        {id: v1(), title: "JS1", isDone: true},
        {id: v1(), title: "ReactJS1", isDone: false},
        {id: v1(), title: "Rest API1", isDone: false},
    ],
    [todolistsId2]: [
        {id: v1(), title: "HTML&CSS1", isDone: true},
        {id: v1(), title: "JS1", isDone: true},
        {id: v1(), title: "ReactJS1", isDone: false},
        {id: v1(), title: "Rest API1", isDone: false},
    ]
}
test('one task should be added', ()=>{
    let updateTasks:TasksType = TasksReducer(tasks,addTaskAC('newTitle',todolistsId1))
    expect(updateTasks).not.toBe(tasks)
    expect(updateTasks[todolistsId1].length).toBe(5)
    expect(updateTasks[todolistsId1][0].title).toBe('newTitle')
})

test('one task should be removed', ()=>{
    const action = removeTaskAC(todolistsId1,tasks[todolistsId1][0].id)
    let updateToRemovedTasks = TasksReducer(tasks, action)
    expect(updateToRemovedTasks).not.toBe(tasks)
    expect(updateToRemovedTasks[todolistsId1].length).toBe(3)
    expect(tasks[todolistsId1].length).toBe(4)

} )
test('task title should be changed', ()=>{
    let updatedTitleTasks = TasksReducer(tasks, changeTitleTaskAC('newTaskTitle',tasks[todolistsId1][0].id,todolistsId1))
    expect(updatedTitleTasks).not.toBe(tasks)
    expect(updatedTitleTasks[todolistsId1][0].title).toBe('newTaskTitle')

})
test('status task should be changed',()=>{
    let changedStatusTasks = TasksReducer(tasks,changeStatusTaskAC(tasks[todolistsId1][0].id,true,todolistsId1))
    expect(changedStatusTasks).not.toBe(tasks)
    expect(changedStatusTasks[todolistsId1][0].isDone).toBe(true)
    expect(tasks[todolistsId1][0].isDone).toBe(false)

})