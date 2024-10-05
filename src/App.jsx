import { useState } from 'react'
import './App.css'
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  const tasks = useQuery(api.tasks.get);
  const addEntry = useMutation(api.myFunctions.createTask);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
      e.preventDefault();

      // Call Convex API to add a new guestbook entry
      await addEntry({ name, message });

      // Clear the form
      setName("");
      setMessage("");
  };

  const formatDate = (timestamp) => new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
  });

  return (
    <section>
      <h2>Guest Book</h2>
      <p>Leave a comment or just say hello!</p>
      <div>

        <form onSubmit={submitHandler}>
          <p><b>Name</b></p>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <p><b>Message</b></p>
          <textarea
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <br/>
          <button type="submit" className="btn">Submit</button>
        </form>
      <br/>
      <br/>
        <div>
          {tasks && tasks.map(task => {
            return (
              <div id={task._id}>
                <div>
                  <b>{task.name}</b>
                </div>
                <p>{task.message}</p>
                <p>{formatDate(task._creationTime)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default App
