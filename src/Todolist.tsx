import React from "react";

type TodolistPropsType={
    topic?: string
    arr:Array<InArrayPropsType>

}
type InArrayPropsType={
    id: number,
    title: string,
    isDone: boolean
}
export const Todolist=(props: TodolistPropsType)=>{
    return(
        <div>
            <h1>{props.topic}</h1>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.arr.map((element)=>{
                    return(
                        <li><input type="checkbox" checked={element.isDone}/> <span>{element.title}</span></li>
                    )
                })}

            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}