import React, {useState} from 'react';
import './App.css';
import {InArrayPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    addTodolistAC,
    changeTitleTodolistAC, filterValueType,
    removeTodolistAC,
    TodolistsReducer,
    TodolistsType
} from "./TodolistsReducer";
import {
    addTaskAC,
    changeStatusTaskAC,
    changeTitleTaskAC,
    removeTaskAC,
    TasksReducer
} from "./TasksReducer";



export type TasksType = {
    [key: string]: Array<InArrayPropsType>


}

function App() {

    let todolistsId1 = v1()
    let todolistsId2 = v1()

    let [todolists, setTodolists] = useState<TodolistsType>(
        [
            {id: todolistsId1, title: "First todolist", filter: "All"},
            {id: todolistsId2, title: "Second todolist", filter: "All"},
        ]
    )

    const [tasks, setTasks] = useState<TasksType>({
        [todolistsId1]: [
            {id: v1(), title: "HTML&CSS1", isDone: true},
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
    })
    const removeOneTask = (id: string, tlId: string) => {
        setTasks(TasksReducer(tasks,removeTaskAC(tlId, id)))

    }
    const addTask = (title: string, tlId: string) => {
        setTasks(TasksReducer(tasks,addTaskAC(title, tlId)))
    }
    const changeTitleTask = (title: string, taskId: string, tlId: string,) => {
        setTasks(TasksReducer(tasks, changeTitleTaskAC(title,taskId,tlId)))
    }

    const changeStatus = (taskId: string, isDone: boolean, tlId: string) => {
        // let todolistTasks = tasks[tlId]
        // const task = todolistTasks.find(t => t.id === taskId)
        // if (task) {
        //     task.isDone = isDone
        // }
        setTasks(TasksReducer(tasks,changeStatusTaskAC(taskId,isDone,tlId)));
    }
    const filterTask = (filterValue: filterValueType, tlId: string) => {
        let todolist = todolists.find((tl) => tl.id === tlId)
        if (todolist) {
            todolist.filter = filterValue
        }
        setTodolists([...todolists]);
    }

    const removeTodolist = (tlId: string) => {
        setTodolists(TodolistsReducer(todolists,removeTodolistAC(tlId)))
        delete tasks[tlId]
        setTasks({...tasks})

    }
    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        setTodolists(TodolistsReducer(todolists,addTodolistAC(title,newTodolistId)))
        setTasks({...tasks, [newTodolistId]: []})

    }
    const changeTitleTodolist = (title: string, tlId: string) => {
        setTodolists(TodolistsReducer(todolists,changeTitleTodolistAC(title, tlId)))
        setTasks({...tasks})
    }


    return (
        <div className="App">
            <AddItemForm
                name={'add todoList'}
                addItem={addTodolist}
            />

            {todolists.map((tl) => {
                    let changeFilter = tasks[tl.id]
                    if (tl.filter === "Active") {
                        changeFilter = tasks[tl.id].filter((el) => !el.isDone)
                    }
                    if (tl.filter === "Completed") {
                        changeFilter = tasks[tl.id].filter((el) => el.isDone)
                    }

                    return (
                        <div>

                            <Todolist
                                key={tl.id}
                                tlId={tl.id}
                                title={tl.title}
                                tasks={changeFilter}
                                removeOneTask={removeOneTask}
                                filterTask={filterTask}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTitleTask={changeTitleTask}
                                changeTitleTodolist={changeTitleTodolist}
                            />
                        </div>


                    )

                }
            )}


        </div>)
}

export default App;
