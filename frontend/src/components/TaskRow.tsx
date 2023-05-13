import { useState, useEffect } from 'react';
import axios from 'axios';
import useGetTasks from '../hooks/getTasks';

interface Task {
  id: {
    timestamp: number;
    data: string;
  };
  name: string;
  description: string;
  done: boolean;
}


interface Props {
    task: Task;
  }
  
const TaskRow: React.FC<Props> = ({ task }) => {
    return (
      <tr>
        <td>{task.id.timestamp}</td>
        <td>{task.name}</td>
        <td>{task.description}</td>
        <td><input type="checkbox" checked={task.done} /></td>
      </tr>
    );
  };
  
export default TaskRow;
