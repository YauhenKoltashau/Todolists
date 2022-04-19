import React, {useState} from 'react';
import './App.css';
import {InArrayPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterValueType = "All" | "Active" | "Completed"

function App() {

    const [tasks, setTasks] = useState<Array<InArrayPropsType>>(
        [
            {id: v1(), title: "HTML&CSS1", isDone: true},
            {id: v1(), title: "JS1", isDone: true},
            {id: v1(), title: "ReactJS1", isDone: false},
            {id: v1(), title: "Rest API1", isDone: false},
        ])
    console.log(tasks)
    const removeOneTask = (id: string) => {
        setTasks(tasks.filter((el) => el.id !== id))
        console.log(id)
    }
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks((newTasks))
    }
    let [filterValue, setFilterValue] = useState<filterValueType>("All")
    let changeFilter = tasks
    if (filterValue === "Active") {
        changeFilter = tasks.filter((el) => !el.isDone)
    }
    if (filterValue === "Completed") {
        changeFilter = tasks.filter((el) => el.isDone)
    }

    const filterTask = (filterValue: filterValueType) => {
        setFilterValue(filterValue)

    }
    function changeStatus (taskId: string, isDone: boolean){
        const task = tasks.find(t=> t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks]);


    }



    return (
        <div className="App">
            <Todolist topic={"Simple string"}
                      task={changeFilter}
                      removeOneTask={removeOneTask}
                      filterTask={filterTask}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filterValue}


            />


        </div>
    );
}

export default App;
