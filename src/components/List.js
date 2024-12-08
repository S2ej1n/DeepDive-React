import React from 'react'

export default function List({ todoData, setTodoData }) {

    // css 
    const btnStyle = {
        color: "#fff",
        border: "none",
        padding: "5px 9px",
        borderRadius: "50%",
        cursor: "pointer",
        float: "right"
    };

    // 동적으로 처리해야해서 함수 형태로 스타일 만듬
    const getStyle = (completed) => {
        return {
            padding: "10px",
            borderBottom: "1px #ccc dotted",
            textDecoration: completed ? 'line-through' : 'none'
        }
    }

    const handleCompleteChange = (id) => {
        let newTodoData = todoData.map(data => {
            if (data.id === id) {
                data.completed = !data.completed;
            }
            return data;
        })

        setTodoData(newTodoData);
    };

    // 지울 때 사용하는 함수가 filter
    // 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환함
    // 누른 id랑 같은건 지워버리고, 남은건 남김.
    const handleClick = (id) => {
        let newTodoData = todoData.filter((data) =>
            data.id !== id)
        // 다르면 통과 (안눌렀다는거.)
        setTodoData(newTodoData)
    }


    return (
        <div>
            {todoData.map((data) => (
                <div style={getStyle(data.completed)} key={data.id}>
                    <input type="checkbox" defaultChecked={false}
                        onChange={() => handleCompleteChange(data.id)} />
                    {data.title}
                    <button style={btnStyle}
                        onClick={() => handleClick(data.id)}>X</button>
                </div>
            ))}
        </div>
    )
}
