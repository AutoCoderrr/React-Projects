
"use client"
// Import React and useState hook from 'react' package
import React, { useState } from 'react';


const Page = () => {
  // Define state variables using the useState hook
  const [title, setTitle] = useState(''); // State variable to store task title
  const [desc, setDesc] = useState(''); // State variable to store task description
  const [mainTask, setMainTask] = useState([]); // State variable to store main tasks array

 
  // Function to handle form submission
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Add new task to mainTask array with a unique id and reset title and description fields
    setMainTask([...mainTask, { id: mainTask.length + 1, title, desc }]);
    setTitle('');
    setDesc('');
  };

  // Function to handle task deletion
  const deleteHandler = (id) => {
    // Filter out the task with the specified id and update mainTask array
    const updatedTasks = mainTask.filter((task) => task.id !== id);
    // Reassign sequential serial numbers to remaining tasks
    const reindexedTasks = updatedTasks.map((task, index) => ({ ...task, id: index + 1 }));
    setMainTask(reindexedTasks);
  };

  // Function to handle task update
  const updateHandler = (id) => {
    // Find the task to update based on its id
    const taskToUpdate = mainTask.find((task) => task.id === id);
 
    const updatedTitle = prompt('Enter updated title:', taskToUpdate.title);
    const updatedDesc = prompt('Enter updated description:', taskToUpdate.desc);

    // If user provides updated title and description, update the task
    if (updatedTitle !== null && updatedDesc !== null) {
      const updatedTasks = mainTask.map((task) =>
        task.id === id ? { ...task, title: updatedTitle, desc: updatedDesc } : task
      );
      setMainTask(updatedTasks); // Update mainTask array
    }
  };

  // Initialize renderTask variable with a default value for cases where no tasks are available
  let renderTask = <tr><td colSpan="4" className='text-center'>No tasks available</td></tr>;

  // If there are tasks available in mainTask array, render them
  if (mainTask.length > 0) {
    renderTask = mainTask.map((task) => (
      // Render each task as a table row
      <tr key={task.id}>
        <td className='border px-4 py-2'>{task.id}</td> {/* Display task id */}
        <td className='border px-4 py-2'>{task.title}</td> {/* Display task title */}
        <td className='border px-4 py-2'>{task.desc}</td> {/* Display task description */}
        <td className='border px-4 py-2 align-middle text-center'> {/* Display action buttons */}
          {/* Update button */}
          <button
            onClick={() => updateHandler(task.id)}
            className='bg-yellow-400 text-white px-4 py-2 mr-2 font-bold rounded'
          >
            Update
          </button>
          {/* Delete button */}
          <button
            onClick={() => deleteHandler(task.id)}
            className='bg-red-400 text-white px-4 py-2 font-bold rounded'
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  // Return JSX representing the component structure
  return (
    <>
      <h1 className='bg-black text-white px-4 py-2 text-5xl text-center'>ToDo List</h1>
      {/* Form to add new tasks */}
      <form onSubmit={submitHandler}>
        <input
          type='text'
          className='text border-zinc-800 border-2 m-5 px-4 py-2'
          placeholder='Enter task here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          className='text border-zinc-800 border-2 m-5 px-4 py-2'
          placeholder='Enter description here'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className='text bg-black text-white px-4 py-2 text-2xl font-bold rounded'>Add Task</button>
      </form>
      <hr />
      {/* Container for displaying tasks */}
      <div className='p-8 bg-blue-200'>
        <table className='w-full'>
          {/* Table header */}
          <thead>
            <tr>
              <th className='border px-4 py-2' style={{ width: '50px' }}>Serial Number</th> {/* Serial Number column */}
              <th className='border px-4 py-2'>Task</th> {/* Task column */}
              <th className='border px-4 py-2'>Description</th> {/* Description column */}
              <th className='border px-4 py-2' style={{ width: '300px' }}>Actions</th> {/* Actions column */}
            </tr>
          </thead>
          {/* Table body containing rendered tasks */}
          <tbody>{renderTask}</tbody>
        </table>
      </div>
    </>
  );
};

// Export the component as the default export
export default Page;
