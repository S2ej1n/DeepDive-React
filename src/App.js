import React, {Component} from "react";
// 리액트 라이브러리에서 컴포넌트 가져옴
import "./App.css";

// 컴포넌트를 사용할 수 있게 extends 확장해줌
export default class App extends Component {
  // 컴포넌트가 있으면 render 메소드 사용 가능
  // css 
  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right"
  }

  // 동적으로 처리해야해서 함수 형태로 스타일 만듬
getStyle = () => {
  return{
    padding: "10px",
    borderBottom: "1px #ccc dotted",
    textDecoration: 'none'
  }
}

  // 할일 목록 데이터 만들기
  state = {
    todoData : [
      { 
        id: 1, 
        title: "공부하기", 
        completed: false 
      },
      {
        id: 2, 
        title: "청소하기", 
        completed: false
      }
    ]
  }

  // 지울 때 사용하는 함수가 filter
  // 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환함
  // 누른 id랑 같은건 지워버리고, 남은건 남김.
  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter((data) => 
      data.id!== id)
    // 다르면 통과 (안눌렀다는거.)
    this.setState({todoData: newTodoData});
  }
  
  render() {
    return(
      // 리턴 안에 유아이 작성, class는 className 으로 작성.
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1> 할 일 목록 </h1>
          </div>

          {/* 클래스형 컴포넌트이기에 this를 사용함. */}
          {/* map을 사용하여 새로운 JSX 요소를 반환한다.*/}

          {this.state.todoData.map((data) => (
            <div style={this.getStyle()} key={data.id}>
              <input type="checkbox" defaultChecked={false} />
                {data.title}
              <button style={this.btnStyle} 
              onClick={()=>this.handleClick(data.id)}>X</button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}