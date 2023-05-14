import { useState, useEffect, SetStateAction } from 'react';
import axios from 'axios';
import * as React from 'react';
import Item from '@mui/material/ListItem';
import { ListItemButton } from '@mui/material';


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
  const [getName, setName] = useState(task.name);
  const [getDescription, setDescription] = useState(task.description);

  const handleCheckboxChange = async () => {
    try {
      const success: Boolean = await axios.put('http://localhost:8080/api/v1/tasks/'+task.id+'/tick');
      if(!success) throw new Error('Error updating task');
      setIsChecked(!isChecked);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = async (newName: string | null) => {
    if(newName != null){
      try {
        const success: Boolean = await axios.put('http://localhost:8080/api/v1/tasks/'+task.id, {
          name: newName,
        });
        if(!success) throw new Error('Error updating task');
        setName(newName);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDescriptionChange = async (newDescription: string | null) => {
    if(newDescription != null){
      setDescription(newDescription);
      try {
        const success: Boolean = await axios.put('http://localhost:8080/api/v1/tasks/'+task.id, {
          description: newDescription,
        });
        if(!success) throw new Error('Error updating task');
        setDescription(newDescription);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='flex flex-row'>
      <ListItemButton>
          <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="form-checkbox h-10 w-10 text-blue-600"/>
      </ListItemButton> 
      <Item>
        <p
          className="inline-block w-full min-w-max p-2 border rounded-lg cursor-text"
          contentEditable
          onBlur={(e)=> handleNameChange(e.target.textContent)}
        >
          {getName}
        </p>
      </Item>
      <Item>
      <textarea
          className="w-full p-2 border rounded-lg"
          name=""
          id=""
          onBlur={(e)=> handleDescriptionChange(e.target.value)}
          defaultValue={getDescription}
        ></textarea>  
      </Item>    
    </div>
  );
  };  
  
export default TaskRow;
