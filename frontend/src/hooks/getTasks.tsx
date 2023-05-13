import { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
  id: string;
  name: string;
  description: string;
  done: boolean;
}

function useGetTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios.get<Task[]>('http://localhost:8080/api/v1/tasks');
          setTasks(result.data);
        };

    fetchData();
  }, []);

  return tasks;
}

export default useGetTasks;
