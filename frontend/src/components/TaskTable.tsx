import { useState, useEffect } from 'react';
import axios from 'axios';
import useGetTasks from '../hooks/getTasks';
import TaskRow from './TaskRow';

const TaskTable: React.FC = () => {
    const tasks = useGetTasks();

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Done</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task => (
                    <TaskRow key={task.id.timestamp} task={task} />
                ))}
            </tbody>
        </table>
    );
};

export default TaskTable;