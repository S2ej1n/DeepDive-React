import React, { useState, useCallback } from "react";
import "./App.css";
import Lists from "./components/Lists";
import Form from "./components/Form";

const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];

export default function App() {
  // 렌더링 되는지 확인용
  console.log("App render");

  const [todoData, setTodoData] = useState(initialTodoData);
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
    localStorage.setItem("todoData", JSON.stringify([...todoData, newTodo]));
    setValue("");
  }

      // 지울 때 사용하는 함수가 filter
    // 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환함
    // 누른 id랑 같은건 지워버리고, 남은건 남김.
    const handleClick = useCallback(
      (id) => {
      let newTodoData = todoData.filter((data) =>
          data.id !== id)
      // 다르면 통과 (안눌렀다는거.)
      setTodoData(newTodoData)
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    },
    [todoData]
    );

    const handleRemoveClick = () => {
      setTodoData([]);
      localStorage.setItem("todoData", JSON.stringify([]));
    }

  return (
    // 리턴 안에 유아이 작성, class는 className 으로 작성.
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1> 할 일 목록 </h1>
          <button onClick={handleRemoveClick}> Delete All </button>
        </div>
        <Lists handleClick={handleClick} todoData={todoData} setTodoData={setTodoData}/>
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue}/>
      </div>
    </div>
  );
}