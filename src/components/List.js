import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function List({ todoData, setTodoData }) {

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

    const handelEnd = (result) => {
        console.log('result', result);

        // 목적지가 없으면 이 함수 종료
        if (!result.destination) return;

        const newTodoData = todoData;

        // 변경시키는 아이템을 배열에서 지워준다    -------- 인덱스에서, 하나를 지운다.
        // retuen 값으로 지워진 아이템을 잡아준다
        const [recorderedItem] = newTodoData.splice(result.source.index, 1);

        newTodoData.splice(result.destination.index, 0, recorderedItem);
        setTodoData(newTodoData);
    }

    return (
        <div>
            <DragDropContext onDragEnd={handelEnd}>
                <Droppable droppableId="todo">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                        {todoData.map((data, index) => (
                            <Draggable
                                key={data.id}
                                draggableId={data.id.toString()}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div key={data.id}
                                    {...provided.draggableProps} 
                                    ref={provided.innerRef} 
                                    {...provided.dragHandleProps}
                                    className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} 
                                    flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}>
                                            <div className='items-center'>
                                                <input type="checkbox" defaultChecked={false}
                                                    onChange={() => handleCompleteChange(data.id)} />
                                                <span className={data.completed ? 'line-through' : undefined}>{data.title}</span>
                                            </div>
                                            <div className='items-center'>
                                                <button
                                                    className='px-4 py-2 float-right'
                                                    onClick={() => handleClick(data.id)}>X</button>
                                            </div>
                                          </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
