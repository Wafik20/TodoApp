import { useState, useEffect } from 'react';
import axios from 'axios';
import useGetTasks from '../hooks/getTasks';

interface Task {
  id: string;
  name: string;
  description: string;
  done: boolean;
}

interface Props {
    task: Task;
  }
  
const TaskRow: React.FC<Props> = ({ task }) => {
  const [isChecked, setIsChecked] = useState(task.done); // use state to save the checkbox status

  const handleCheckboxChange = async () => {
    try {
      const success: Boolean = await axios.put('http://localhost:8080/api/v1/tasks/'+task.id);
      if(!success) throw new Error('Error updating task');
      setIsChecked(!isChecked);
    } catch (error) {
      console.log(error);
      return 
    }
  };

    return (
      <tr>
        <td>{task.id}</td>
        <td>{task.name}</td>
        <td>{task.description}</td>
        <td><input type="checkbox" checked={isChecked} onClick={handleCheckboxChange} /></td>
      </tr>
    );
  };
  
export default TaskRow;
