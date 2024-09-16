import React from "react";
import { useState } from "react";
import './styles.css'

export default function App() {
  const [counts, setCounts] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [eachTask, setEachTask] = useState("");
  const [checkedTask, setCheckedTask] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);


  function increase() {
    var x;
    if (counts.length === 0) x = 1;
    else
      x = counts[counts.length - 1] + 1

    setCounts([...counts, x]);
    setTasks([...tasks, []]);
  }
  function addTask() {
    if (selectedIndex == null) return;
    var newarray = [...tasks];
    newarray[selectedIndex] = [...newarray[selectedIndex], eachTask];
    setTasks(newarray);

    setEachTask("");
  }
  function handleCheck(dayIndex, taskIndex) {
    var newarray1 = { ...checkedTask };
    const taskKey = `${dayIndex}+${taskIndex}`;
    newarray1[taskKey] = !newarray1[taskKey];
    setCheckedTask(newarray1);
  }

  function deleteDay(dayIndex) {
    const newdays = counts.filter(function (_, index) {
      return dayIndex !== index;
    })
    const newTasks = tasks.filter(function (_, index) {
      return dayIndex !== index;
    })
    const newCheckedTask = { ...checkedTask }; //since it is an object you have to use "for-each"
    Object.keys(newCheckedTask).forEach((key) => {
      if (key.startsWith(`${dayIndex}+`)) {
        delete newCheckedTask[key];
      }
    });

    setCounts(newdays);
    setTasks(newTasks);
    setCheckedTask(newCheckedTask);
  }

  const strike = { textDecoration: "line-through" };
  function display() {
    return (
      <div className='flex-wrap'>
        {counts.map((count, dayIndex) => (
          <div className="box">
            <h6>Day {count}</h6>
            <div>
              {tasks[dayIndex]?.map((task, taskIndex) => (
                <div className="inline inline-box">
                  <input type="checkbox" onClick={() => handleCheck(dayIndex, taskIndex)} className="small" />
                  <p style={checkedTask[`${dayIndex}+${taskIndex}`] ? strike : {}} >{task}</p>
                </div>

              ))}
            </div>

            <div className="inline">
              <input placeholder="Enter your tasks"
                value={(selectedIndex === dayIndex) ? eachTask : ""}
                onClick={() => setSelectedIndex(dayIndex)}
                onChange={(e) => setEachTask(e.target.value)} />
              <button onClick={addTask} >Add</button>
              <button onClick={() => deleteDay(dayIndex)}>Delete</button>
            </div>


          </div>
        ))
        }
      </div>
    );
  }
  return (
    <>
    <h1 style={{ textAlign: "center" }}>TO DO LIST!</h1>  
    <div className="main">
      <h3>Enter your daily routine to get started!</h3>
      <button onClick={increase}>Add</button>

      {display()}
    </div>
    </>
  )
}