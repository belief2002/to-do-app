"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [editTodoInfo, setEditTodoInfo] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editMode, setEditMode] = useState(false);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callback=/todos");
    },
  });
  // console.log(session);
  useEffect(() => {
    // console.log("email::", emailch);

    axios.get("/api/todos").then((response) => {
      // console.log("Client fetch", response);
      const datas = response.data.todos;
      setTodos(datas);
      // console.log("Datas", datas);
    });
  }, []);

  async function addTodo() {
    const response = await axios.post("/api/todos", {
      desc: inputText,
      email: session?.user?.email,
    });
    // console.log("Response post" + response);
    await axios.get("/api/todos").then((response) => {
      const datas = response.data.todos;
      setTodos(datas);
    });
    setInputText("");
  }
  async function clearTodo() {
    await axios.delete("/api/todos").then((response) => {
      console.log("delete ALL success");
    });
    await axios.get("/api/todos").then((response) => {
      const datas = response.data.todos;
      setTodos(datas);
    });
  }
  async function deleteTodo(id) {
    await axios.delete(`/api/todos/${id}`).then((response) => {
      console.log("delete success");
    });
    await axios.get("/api/todos").then((response) => {
      const datas = response.data.todos;
      setTodos(datas);
    });
  }
  async function editTodo(todo) {
    console.log(todo);
    setEditMode(true);
    setEditTodoInfo(todo);
  }
  async function updateTodo() {
    const data = {
      desc: editTodoInfo.desc,
      completed: editTodoInfo.completed,
    };
    const response = await axios.put(`/api/todos/${editTodoInfo.id}`, data);
    console.log("Response put" + response);
    setEditMode(false);
    //refetch
    await axios.get("/api/todos").then((response) => {
      const datas = response.data.todos;
      setTodos(datas);
    });
  }

  if (editMode) {
    return (
      <div
        id={editTodoInfo.id}
        className="flex flex-col items-center  pt-8 gap-8 h-full"
      >
        <div className=" text-2xl">Edit Todo</div>
        <div className="flex gap-2 ">
          <div className="">Edit desc:</div>
          <input
            className=" rounded shadow-md px-1"
            type="text"
            placeholder="Enter new desc..."
            value={editTodoInfo["desc"]}
            onChange={(e) => {
              setEditTodoInfo({ ...editTodoInfo, desc: e.target.value });
            }}
          />
        </div>
        <div className="flex gap-2">
          <div>Edit completed:</div>
          <input
            type="checkbox"
            checked={editTodoInfo.completed}
            onChange={(e) => {
              setEditTodoInfo({
                ...editTodoInfo,
                completed: !editTodoInfo.completed,
              });
            }}
          />
        </div>
        <button
          className=" bg-green-500 text-xl rounded-md px-2 font-normal text-white hover:bg-green-600"
          onClick={() => {
            updateTodo();
          }}
        >
          Submit
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center pt-8 gap-8">
      <div className="text-2xl font-semibold">Todos</div>
      <div className="flex gap-2 py-2">
        <input
          className="text-xl rounded-lg border-none px-1 shadow"
          type="text"
          placeholder="Enter your task"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="bg-blue-500 rounded-md py-1 px-2 text-white hover:bg-blue-600"
          onClick={addTodo}
        >
          Add
        </button>
        <button
          onClick={clearTodo}
          className="bg-gray-500 rounded-md py-1 px-2 text-white hover:bg-gray-600"
        >
          Clear All
        </button>
      </div>
      <div className="flex gap-3 flex-col  w-1/2">
        {todos.map((todos) => (
          <div
            key={todos["id"]}
            className="flex pl-2 rounded-lg justify-between bg-slate-300 items-center "
          >
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={todos["completed"]}
                onChange={() => {}}
              />
              <div>{todos["desc"]}</div>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-green-500 rounded-md px-1 text-white hover:bg-green-600"
                onClick={() => {
                  editTodo(todos);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 rounded-md px-2 text-white hover:bg-red-600"
                onClick={() => {
                  deleteTodo(todos["id"]);
                }}
              >
                Delete{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
