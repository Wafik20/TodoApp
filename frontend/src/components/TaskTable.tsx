import useGetTasks from '../hooks/getTasks';
import TaskRow from './TaskRow';
import Stack from '@mui/material/Stack';

const TaskTable: React.FC = () => {
    const tasks = useGetTasks();
    

    return (
    <Stack direction="column" spacing={2}>
    {tasks.map(task => ( 
         <TaskRow key={task.id} task={task} />
    ))}
    </Stack>
    );
};

export default TaskTable;