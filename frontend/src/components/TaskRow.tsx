import { useState, useEffect, SetStateAction } from 'react';
import Task from '../entities/Task';
import axios from 'axios';
import * as React from 'react';
import Item from '@mui/material/ListItem';
import { ListItemButton } from '@mui/material';
import {RiDeleteBin6Line} from 'react-icons/ri';


interface Props {
    task: Task,
    deleteTask: (id: string) => void,
  }
  
const TaskRow: React.FC<Props> = ({ task, deleteTask }) => {
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
    <div className=''>
      <div className='flex flex-row ml-32 mr-32'>
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
      <ListItemButton onClick={() => {deleteTask(task.id)}} className="transition duration-700 hover:scale-110">
         <RiDeleteBin6Line className='w-20 h-20 text-red-500'></RiDeleteBin6Line>
      </ListItemButton>
      </div>
    </div>
  );
  };  
  
export default TaskRow;
