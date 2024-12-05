import React, { useState } from "react";
import "./App.css";
export default function App() {

  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  // css 
  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }

  // 동적으로 처리해야해서 함수 형태로 스타일 만듬
  const getStyle = (completed) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? 'line-through' : 'none'
    }
  }

  // 지울 때 사용하는 함수가 filter
  // 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환함
  // 누른 id랑 같은건 지워버리고, 남은건 남김.
  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) =>
      data.id !== id)
    // 다르면 통과 (안눌렀다는거.)
    setTodoData(newTodoData)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

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

  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map(data => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    })

    setTodoData(newTodoData);
  }

  return (
    // 리턴 안에 유아이 작성, class는 className 으로 작성.
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1> 할 일 목록 </h1>
        </div>
        
        {todoData.map((data) => (
          <div style={getStyle(data.completed)} key={data.id}>
            <input type="checkbox" defaultChecked={false}
              onChange={() => handleCompleteChange(data.id)} />
            {data.title}
            <button style={btnStyle}
              onClick={() => handleClick(data.id)}>X</button>
          </div>
        ))}

        <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
          <input
            type="text"
            name="value"
            style={{ flex: '10', padding: '5px' }}
            placeholder="해야 할 일을 입력하세요."
            value={value}
            onChange={handleChange}
          />
          <input
            type="submit"
            value="입력"
            className="btn"
            style={{ flex: '1' }}
          />
        </form>
      </div>
    </div>
  );
}