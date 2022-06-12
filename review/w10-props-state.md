### props
* 컴포넌트에 전달되어 사용

### state
* 컴포넌트 내부에서 정의되어 사용
* 함수형 컴포넌트에서 사용 불가 -> 클래스형으로 바꿔서 사용

```js
import React from "react";
import ReactDOM from "react-dom";

// 1. [props 활용] Clock 컴포넌트를 함수형으로 구현
const Clock = (props) => {
    return (
        <div>
            <h1> {props.date.toLocaleTimeString()} </h1>
        </div>
    )
}
function App() {
  //Clock 컴포넌트를 호출합니다.
  const element = <Clock date={new Date()} />;
  //ReactDOM에 element을 렌더링합니다.
  ReactDOM.render(element, document.getElementById('root'));
}
export default App;


// 2. [props 활용] Clock 컴포넌트를 클래스형으로 구현
class Clock extends React.Component {
    render() {
        return (
            <div>
                <h1> {this.props.date.toLocaleTimeString()} </h1>
            </div>
        )
    }
}

// 3. [state 활용] Clock 컴포넌트를 클래스형으로 구현
class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {date: new Date()}
    }

    render(){
        return (
            <div>
                <h1> {this.state.date.toLocaleTimeString()} </h1>
            </div>
        )
    }
}

ReactDOM.render(
    return (
        <Clock />
        document.getElementById('root')
    )
)
```

### state 생명주기
* constructor(): state 데이터를 초기화
* render(): 클래스형 컴포넌트에서 반드시 구현되어야 하는 메소드
* componentDidMount(): 컴포넌트 마운트 직후 호출 메소드
* componentDidUpdate(): 컴포넌트 업데이트 진행 직후 호출 메소드
* componentWillUnmount(): 컴포넌트 마운트가 해제되어 제거되기 직전에 호출 메소드

```js
class Clock extends React.Component {
    // 1. state 데이터 초기화 & this.state에 새로운 date 데이터 저장
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }

    // 2. 마운트 이후 setInterval로 1초에 한 번씩 tick 함수 호출
    // setInterval(func, delay)
    componentDidMount(){
        //interval을 this.timerID 변수에 저장
        this.timerID = setInterval(
            //this.tick() 함수 호출 callback
            () => this.tick(), 
            1000)
    }

    // 3.
    componentWillUnmount(){
        clearInterval(this.timerID)
    }

    // * tick 함수 (setState: 시각 업데이트)
    tick(){
        this.setState({
            date: new Date();
        })
    }

    // 4. render로 구현할 내용
    render(
        return(

        )
    )
}

ReactDOM.render(<Clock />, getElementById('root'))

```