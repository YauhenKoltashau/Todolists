import React, {useState} from 'react';
import './App.css';
import {InArrayPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


export type filterValueType = "All" | "Active" | "Completed"
type TodolistsType = {
    id: string
    title: string
    filter: filterValueType
}
type TaskType = {
    [key: string]: Array<InArrayPropsType>


}

function App() {

    let todolistsId1 = v1()
    let todolistsId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: todolistsId1, title: "First todolist", filter: "All"},
            {id: todolistsId2, title: "Second todolist", filter: "All"},
        ]
    )

    const [tasks, setTasks] = useState<TaskType>({
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
        let todolistTasks = tasks[tlId]
        tasks[tlId] = todolistTasks.filter((el) => el.id !== id)
        setTasks({...tasks})

    }
    const addTask = (title: string, tlId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[tlId]
        tasks[tlId] = [task, ...todolistTasks]
        setTasks({...tasks})

    }
    const changeStatus = (taskId: string, isDone: boolean, tlId: string) => {
        let todolistTasks = tasks[tlId]
        const task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks});


    }
    const filterTask = (filterValue: filterValueType, tlId: string) => {
        let todolist = todolists.find((tl) => tl.id === tlId)
        if (todolist) {
            todolist.filter = filterValue
        }
        setTodolists([...todolists]);
    }
    const removeTodolist = (tlId: string) => {
        setTodolists(todolists.filter((tl) => tl.id !== tlId))
        delete tasks[tlId]
        setTasks({...tasks})

    }
    const addTodolist = (title: string) => {
        let newTodolistId = v1()
        let newTodolist: TodolistsType = {id: newTodolistId, title: title, filter: "All"}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})

    }
    const changeTitleTask = (title: string, taskId: string, tlId: string,) => {
        let todolistTasks = tasks[tlId]
        const task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.title = title
        }
        setTasks({...tasks})
    }
    const changeTitleTodolist = (title: string, tlId: string) => {
        let todolist = todolists.find(tl => tl.id === tlId)
        if (todolist) {
            todolist.title = title
        }
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
