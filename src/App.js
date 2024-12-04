import React, {Component} from "react";
// 리액트 라이브러리에서 컴포넌트 가져옴
import "./App.css";

// 컴포넌트를 사용할 수 있게 extends 확장해줌
export default class App extends Component {
  // 컴포넌트가 있으면 render 메소드 사용 가능
  render() {
    return(
      // 리턴 안에 유아이 작성, class는 className 으로 작성.
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1> 할 일 목록 </h1>
          </div>
          <div>
            <input type="checkbox" defaultChecked={false} />
            공부하기
            <button>X</button>
          </div>
        </div>
      </div>
    )
  }
}