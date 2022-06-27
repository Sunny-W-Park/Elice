## w12-220621-tue

### Flux pattern vs MVC pattern
* MVC에서는 view에서 데이터 업데이트를 하면 bi-directional, 연쇄적인 Model-View 업데이트 발생
* Flux는 uni-directional 업데이트. store -> view 방향으로
    * Action -> Dispatcher -> Store -> View 순으로 업데이트
    * View -> Action
* store는 업데이트 어떻게?

### useState

### useRef
* 상태가 바뀌어도 리렌더링하지 않는 상태를 정의
* 상태가 UI의 변경과 무관할 때 사용
* useRef 예제: ref 객체를 활용하여 DOM에 접근하기 & current.focus와 current.value 활용하기
```js
import React, { useEffect, useState, useRef } from "react";
import "./ValidCheck.css";

export default function ValidCheck() {
  const [isCorrect, setIsCorrect] = useState(false);
  /* input과 select HTML Element를 제어할 수 있도록 ref 객체를 선언해주세요. */
  const inputRef = useRef(null);
  const selectRef = useRef(null);
  
  useEffect(() => {
    /* 컴포넌트 생성 시점에 input 태그가 focusing 되도록 코드를 추가해주세요. */
    inputRef.current.focus();
    
  }, []);
  
  const handleClick = () => {
    /* 버튼 클릭 이벤트를 처리하는 이벤트 핸들러를 작성해주세요. */
    const inputValue = inputRef.current.value;
    const selectValue = selectRef.current.value;
    if (inputValue === selectValue){
        setIsCorrect(true);
    }
    inputRef.current.value = ""
    selectRef.current.value = null
  };
  
  return (
    <div className="validcheck">
      <div className="validcheck-title">ValidCheck</div>
      <div className="validcheck-content">
        <div className="validcheck-content-input">
          <input
            /* ref객체를 사용해 DOM에 접근할 수 있도록 프로퍼티를 추가해주세요. */
            ref={inputRef}
            type="text"
          />
          <select
            /* ref객체를 사용해 DOM에 접근할 수 있도록 프로퍼티를 추가해주세요. */
            ref={selectRef}
          >
            <option value="null">--Select Fruit--</option>
            <option value="apple">apple</option>
            <option value="banana">banana</option>
            <option value="mango">mango</option>
            <option value="watermelon">watermelon</option>
          </select>
        </div>
        <div className="validcheck-content-btn">
          <button onClick={handleClick}>Submit</button>
        </div>
      </div>
      <div className="validcheck-footer">
        {isCorrect ? "Correct" : "Incorrect"}
      </div>
    </div>
  );
}
```

### useContext
* 컴포넌트와 컴포넌트 간 상태를 공유할 때 사용
* 앱 부분/전체 상태관리를 모두 구현
* useContext -> Context API 생성 -> Context API의 Provider를 통해 상태값을 전역적으로 관리
```jsx
// GlobalState.jsx

// Context API 정의
const GlobalStateContext = createContext(null);

// Context를 return하는 함수 정의 -> Counter.jsx에서 활용
export const useGlobalStateContext = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("Use Context inside Provider");
  }
  return context;
}

function useGlobalState() {
  const [count, setCount] = useState(0);
  return { count, setCount };
}

export default function GlobalState() {
  // 관리 대상 상태값을 반환 
  const values = useGlobalState();
  return (
    // Provider의 property인 value로 넘겨주기
    <GlobalStateContext.Provider value={values}>
        <StateWrapper>
          <StateWrapper>
          <StateWrapper>
            <Counter />
          </StateWrapper>
        </StateWrapper>
      </StateWrapper>
    </GlobalStateContext.Provider>
  );
}

// Counter.jsx

import {useGlobalStateContext} from './GlobalState';

export default function Counter(){
  const {count, setCount} = useGlobalStateContext();
  ...
}
```

### useReducer
* 여러 상태를 동시에 관리할 때 사용
* const [state, dispatch] = useReducer(reducer, initialState)
    * state: reducer 함수에 의해 처리되는 상태 객체
    * dispatch: reducer 함수에 action 객체를 전달하는 함수
* reducer 함수 구현
```js
const reducer = (state, action) {
    switch(action.type) {
      case "case1":
        return {
          //state 변경 내용..
        }
      case "case2":
        return {
          //state 변경 내용..
        }
      default:
        return {
          //state default 값
        }
    }
}
```

* useReducer 예제: 카운터 구현하기
```js
import React, { useReducer } from "react";
import "./ReducerCounter.css";

function myReducer(state, action) {
  switch (action.type) {
    case "INC":
      /* "INC" action에 대해 state를 변경해주세요.  */
      return {
          count: state.count+1
      };
    case "DEC":
      /* "DEC" action에 대해 state를 변경해주세요. */
      return {
          count: state.count-1
      };
    case "ZERO":
      /* "ZERO" action에 대해 state를 변경해주세요. */
      return {
          count: 0
      };
    default:
      return state;
  }
}

const initialState = {
  count: 0,
};

export default function ReducerCounter() {
  /* useReducer를 활용하여 state와 dispatch함수를 정의해주세요. */
  const [state, dispatch]  = useReducer(myReducer, initialState);
  
  const handleMinus = () => {
    /* 카운터 값을 감소시키는 액션을 발생시킵니다. */
    dispatch({type: 'DEC'})
  };

  const handleZero = () => {
    /* 카운터 값을 0으로 초기화시키는 액션을 발생시킵니다. */
    dispatch({type: 'ZERO'})
  };

  const handlePlus = () => {
    /* 카운터 값을 증가시키는 액션을 발생시킵니다. */
    dispatch({type: 'INC'})
  };

  return (
    <div className="reducercounter">
      <div className="reducercounter-title">Counter</div>
      <div className="reducercounter-content">{state.count}</div>
      <div className="reducercounter-footer">
        <button onClick={handleMinus}>-</button>
        <button onClick={handleZero}>0</button>
        <button onClick={handlePlus}>+</button>
      </div>
    </div>
  );
}
```

