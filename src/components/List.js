import React from 'react'

const List = ({id, title, completed, todoData, setTodoData, provided, snapshot}) => {
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
        <div key={id}
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} 
                                    flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}>
            <div className='items-center'>
                <input type="checkbox" defaultChecked={false}
                    onChange={() => handleCompleteChange(id)} />
                <span className={completed ? 'line-through' : undefined}>{title}</span>
            </div>
            <div className='items-center'>
                <button
                    className='px-4 py-2 float-right'
                    onClick={() => handleClick(id)}>X</button>
            </div>
        </div>
    )
}

export default List