import { useState, useEffect } from 'react';
import axios from 'axios';
import Task from '../entities/Task';

const useGetTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get<Task[]>('http://localhost:8080/api/v1/tasks');
          setTasks(result.data);
        };

    fetchData();
  }, []);

  return {tasks, setTasks};
}

export default useGetTasks;
