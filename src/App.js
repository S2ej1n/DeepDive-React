import React, {Component} from "react";
// 리액트 라이브러리에서 컴포넌트 가져옴

// 컴포넌트를 사용할 수 있게 extends 확장해줌
export default class App extends Component {
  // 컴포넌트가 있으면 render 메소드 사용 가능
  render() {
    return(
      // 리턴 안에 유아이 작성
      <div>
        안녕하세요.
      </div>
    )
  }
}