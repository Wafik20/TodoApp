import Button from '@mui/material/Button';
import useGetTasks from '../hooks/getTasks';
import TaskRow from './TaskRow';
import Stack from '@mui/material/Stack';
import {GoPlus} from 'react-icons/go';
import Task from '../entities/Task';
import axios from 'axios';

const TaskTable = () => {
    const {tasks, setTasks} = useGetTasks();

    const addNewTask = async () => {
        try {
            const newTask = await axios.post<Task>('http://localhost:8080/api/v1/tasks', {
                name: '',
                description: '',
            });
            if(!newTask){
                throw new Error('Error adding task');
            }
            if(Array.isArray(tasks)){
                setTasks([...tasks, newTask.data]);
            }
            
        } catch (error) {
            console.log(error);  
        }
    }

    const deleteTask = async (id: string) => {
        try {
            const success: Boolean = await axios.delete('http://localhost:8080/api/v1/tasks/'+id);
            if(!success) throw new Error('Error deleting task');
            if(Array.isArray(tasks)){
                setTasks(tasks.filter((task: Task) => task.id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <div>
        <Button variant="text" className='w-20 h-20' onClick={addNewTask}><GoPlus></GoPlus></Button>
        <Stack direction="column" spacing={3}>
            {Array.isArray(tasks) && tasks.map((task: Task) => ( 
            <TaskRow key={task.id} task={task} deleteTask={()=>deleteTask(task.id)} />
            ))}
        </Stack>
    </div>
    );
};

export default TaskTable;