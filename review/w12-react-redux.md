## w12-220623-thu

### Redux
* 앱 전체 상태를 관리할 때 
* Redux vs (useState, useReducer, useContext)
    * 규약(?)의 유무. 상태 관리 패턴
* Redux 핵심 원칙
    * Single source of truth: Store는 단 하나. 모든 앱 상태는 이곳에 모아서 보관
    * Immutability: 상태는 read-only. 변경하려면 모든 상태가 변경되어야 함
    * Pure function: 사이드 이펙트(x)

### Redux - Action
* 상태의 변경을 나타내는 개념
* 주로 type, payload(변경 내용)을 포함하는 객체
* Action Creator: Action을 만드는 함수
```js
const addObj = (id) => ({
    type: ...
    payload: ...
})
```

### Redux - Store
* 상태 보관소
* Action에 따라 reducer에서는 새로운 상태를 만들어 냄
```js
const store = createStore(reducer, initialState)
```

### Redux - Reducer
* Action을 받아 새로운 State를 만들어냄
```js
const reducer = (state, action) => {
    switch (action, type) {
        case ...:
            const obj = {id: action.payload.id}
            return {...state, obj}  // obj를 추가한 뒤 state에 저장
        default:
            return state
    }
}
```

### Redux - Dispatch
* Action을 redux로 보내는 함수

### Redux - Selector
* 특정 state 조각을 store로부터 가져오는 함수
* store의 state는 raw data를 저장, 계산된 값 등을 selector로 가져오는 패턴이 자주 쓰임

### Redux를 위한 비동기 처리
* redux에서 비동기 처리를 하기 위해서는 미들웨어를 사용해야함
* redux-thunk: Promise를 이용한 비동기 Action을 쉽게 처리하는 middleware

### createAsyncThunk
* createAsyncThunk API: fulfilled, rejected, pending 3가지 상태에 대해 각각 reducer를 작성
* 기본 문법: createAsyncThunk(action type, async callback=payload creator)
```js
// createAsyncThunk를 활용한 미들웨어 작성
const addPost = createAsyncThunk('posts/addPost', 
    async (title) => {
        const result = await PostAPI.addPost({ title })
        return result.data
    }
)

// Component에서 활용
useEffect(() => {
    dispatch(addPost("post 1"))
}, [])
```

### Redux로 타이머 구현하기
```js
import React, { useEffect, useRef, useMemo } from "react";
import { useDispatch, Provider, useSelector } from "react-redux";
import { createStore } from "redux";
import styled from "styled-components";

const initialState = {
  isRunning: false,
  startTime: 10,
  currentTime: 10,
  duration: 1000,
};

const palette = ["hotpink", "aquamarine", "coral", "cyan"];

// reducer를 정의하세요.
// action에 따른 state 변경 로직을 구현하세요.
// 주어진 initialState를 변경해 보세요.
const reducer = (state, action) => {
  switch (action.type) {
    case "timer/reset": {
      // currentTime을 초기화하고, 타이머를 중단합니다.
      return {
          ...state,
          currentTime: state.startTime,
          isRunning: false
      };
    }

    case "timer/start": {
      // 타이머를 시작합니다.
      return {
          ...state,
          isRunning: true
      };
    }

    case "timer/stop": {
      // 타이머를 중단합니다.
      return {
          ...state,
          isRunning: false
      };
    }

    case "timer/tick": {
      // 시간을 1초 줄입니다.
      // 시간이 0이 되면 타이머를 멈춥니다.
      return {
          ...state,
          currentTime: state.currentTime - 1,
          isRunning: state.currentTime - 1 > 0
      };
    }

    case "timer/setDuration": {
      // duration을 세팅합니다.
      return {
          ...state,
          duration: action.payload.duration
      };
    }

    case "timer/setStartTime": {
      // startTime을 세팅합니다.
      return {
          ...state,
          duration: action.payload.startTime
      };
    }

    default:
      return state;
  }
};

// action creator를 생성하세요.
// timer/reset
const reset = () => ({type: 'timer/reset'})
// timer/start
const start = () => ({type: 'timer/start'})
// timer/stop
const stop = () => ({type: 'timer/stop'})
// timer/tick
const tickTimer = () => ({type: 'timer/tick'})
// timer/setDuration
const setDuration = (duration) => ({type: 'timer/setDuration', payload: {duration}})
// timer/setStartTime
const setStartTime = (startTime) => ({type: 'timer/setStartTime', payload: {startTime}})

const store = createStore(reducer, initialState);

const durationSelector = (state) => state.duration;
const currentTimeSelector = (state) => state.currentTime;
const isRunningSelector = (state) => state.isRunning;
const startTimeSelector = (state) => state.startTime;
nlimited
export default function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

function Counter() {
  // dispatch 사용
  const dispatch = useDispatch()

  // startTime을 조정하는 input에 대한 ref입니다.
  const startTimeInputRef = useRef();
  // duration을 조정하는 input에 대한 ref입니다.
  const durationInputRef = useRef();

  const duration = useSelector(durationSelector);
  const currentTime = useSelector(currentTimeSelector);
  const isRunning = useSelector(isRunningSelector);
  const startTime = useSelector(startTimeSelector);

  // 상황에 맞게 액션을 dispatch 하세요.
  const handleStop = () => dispatch(stop()) 
  const handleReset = () => dispatch(reset())
  const handleTimer = () => dispatch(start())

  const isResetted = useMemo(() => currentTime === startTime, [
    startTime,
    currentTime,
  ]);

  const isDone = useMemo(() => currentTime === 0, [currentTime]);

  useEffect(() => {
    // isRunning이 true일 경우, 타이머를 동작합니다.
    if (!isRunning) return;

    let timerId = null;

    const tick = () => {
      timerId = setTimeout(() => {
        if (!isRunning) return;
        // timer 상태 중 currentTime을 줄이세요.
        dispatch(tickTimer());
        tick();
      }, duration);
    };

    tick();

    return () => clearTimeout(timerId);
  }, [duration, isRunning]);

  return (
    <Container>
      <Time duration={duration} currentTime={currentTime} stopped={!isRunning}>
        {currentTime}
      </Time>

      <Button onClick={handleStop} disabled={!isRunning}>
        Stop
      </Button>

      <Button onClick={handleReset} disabled={isRunning || isResetted}>
        Reset
      </Button>

      <Button onClick={handleTimer} disabled={isRunning || isDone}>
        Start
      </Button>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const duration = Number(durationInputRef.current.value);
          // state의 duration 값을 변경하세요.
          console.log("Duration : ", duration);
          // duration을 변경한 경우, 타이머를 리셋하세요.
          dispatch(setDuration(duration))
        }}
      >
        <label htmlFor="duration">Duration(ms)</label>
        <input
          ref={durationInputRef}
          id="duration"
          type="text"
          name="duration"
          defaultValue={duration}
        />
        <input type="submit" value="Set" disabled={isRunning} />
      </Form>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          // state의 startTime 값을 변경하세요.
          const startTime = Number(startTimeInputRef.current.value);
          console.log("startTime : ", startTime);
          // startTime을 변경한 경우, 타이머를 리셋하세요.
          dispatch(setStartTime(startTime))
        }}
      >
        <label htmlFor="duration">Start Time(sec)</label>
        <input
          ref={startTimeInputRef}
          id="start-time"
          type="text"
          name="start-time"
          defaultValue={startTime}
        />
        <input type="submit" value="Set" disabled={isRunning} />
      </Form>
    </Container>
  );
}

const Button = styled.button`
  display: block;
  padding: 8px;
  margin: 4px 0;
`;

const Time = styled.div`
  box-sizing: border-box;

  margin: 12px 0;
  width: 400px;
  height: 400px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 100%;

  transition: background-color ${({ duration }) => duration}ms;
  background-color: ${({ currentTime }) =>
    palette[currentTime % palette.length]};

  font-size: 2rem;
  font-weight: bold;
  color: black;

  opacity: ${({ stopped }) => (stopped ? 0.4 : 1)};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  margin-top: 8px;

  label {
    display: inline-block;
    min-width: 120px;
  }

  input[type="text"] {
    margin-right: 8px;
  }
`;
```