import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const TodoListTitle_1 = "what to learn"
    const TodoListTitle_2 = "what to buy"
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, isDone: true, title: "React"},
        {id: 2, isDone: false, title: "JS"},
        {id: 3, isDone: true, title: "Html"},
        {id: 4, isDone: false, title: "Redux"}
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

    const removeTask = (taskId: number) => {
        const nextState: Array<TaskType> = []
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id != taskId) {
                nextState.push(tasks[i])
            }
        }
        setTasks(nextState)
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
