import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const TodoListTitle_1 = "what to learn"
    const TodoListTitle_2 = "what to buy"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: crypto.randomUUID(), isDone: true, title: "React"},
        {id: crypto.randomUUID(), isDone: false, title: "JS"},
        {id: crypto.randomUUID(), isDone: true, title: "Html"},
        {id: crypto.randomUUID(), isDone: false, title: "Redux"}
    ])

    const [filter, setFilter] = useState<FilterValuesType>("active")
    const getFilteredTaskForRender = (allTasks: Array<TaskType>, filterValue: FilterValuesType): Array<TaskType> => {
        switch (filterValue) {
            case "active":
                return allTasks.filter(t => t.isDone === false)
            case "completed":
                return allTasks.filter(t => t.isDone === true)
            default:
                return allTasks
        }
    }
    const filteredTaskForRender: Array<TaskType> = getFilteredTaskForRender(tasks, filter)

    const removeTask = (taskId: string) => {
        // const nextState: Array<TaskType> = []
        // for (let i = 0; i < tasks.length; i++) {
        //     if (tasks[i].id != taskId) {
        //         nextState.push(tasks[i])
        //     }
        // }
        // const nextState: Array<TaskType> = tasks.filter(t => t.id !== taskId)
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const addTasks = (title: string) => {
        const newTask: TaskType = {
            id: crypto.randomUUID(),
            title,
            isDone: false
        }

        setTasks([...tasks, newTask])
    }

    const changeFilter = (nextFilterValue: FilterValuesType) => {
        setFilter(nextFilterValue)
    }

    return (
        <div className="App">
            <TodoList
                tasks={filteredTaskForRender}
                title={TodoListTitle_1}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
