import React, {FC, useRef} from "react";
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (nextFilterValue: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (

    {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask
    }) => {

    const titleInput = useRef<HTMLInputElement>(null)
    const listItems: Array<JSX.Element> = tasks.map(t => {
        const onClickRemoveTaskHandler = () => removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onClickRemoveTaskHandler}>x</button>
            </li>
        )
    })
    const tasksList: Array<JSX.Element> | JSX.Element = tasks.length
        ? <ul> {listItems} </ul>
        : <span>Your tasks List is empty</span>
    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input ref={titleInput}/>
                <button onClick={()=> {
                    if(titleInput.current !== null) {
                        addTask(titleInput.current.value)
                        titleInput.current.value = ""
                    }
                }}>+</button>
            </div>
            {tasksList}
            <div>
                <button onClick={()=>changeFilter("all")}>All</button>
                <button onClick={()=>changeFilter("active")}>Active</button>
                <button onClick={()=>changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}

export default TodoList