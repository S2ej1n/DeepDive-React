import React, { useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";

export default function App() {

  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지가 리로드 되는 것을 막아줌
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false
    };

    // 원래 있던 할 일에 새로운 할 일 더해주기
    // Setter에서 이전 State를 가지고 오기 위해서는 인수에 함수를 이용해서 할 수 있따.
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  }

  return (
    // 리턴 안에 유아이 작성, class는 className 으로 작성.
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1> 할 일 목록 </h1>
        </div>
        <h1 class="text-3xl font-bold underline">
          Hello world!
        </h1>

        <List todoData={todoData} setTodoData={setTodoData}/>
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue}/>
      </div>
    </div>
  );
}