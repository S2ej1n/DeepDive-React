import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from './List.js';

const Lists = (({ todoData, setTodoData }) => {
    console.log('Lists render');

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
                                        <List
                                            key={data.id}
                                            id={data.id}
                                            title={data.title}
                                            completed={data.completed}
                                            todoData={todoData}
                                            setTodoData={setTodoData}
                                            provided={provided}
                                            snapshot={snapshot}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
});

export default Lists
