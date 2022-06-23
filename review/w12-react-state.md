## w12-220621-tue

### Flux pattern vs MVC pattern
* MVC에서는 view에서 데이터 업데이트를 하면 bi-directional, 연쇄적인 Model-View 업데이트 발생
* Flux는 uni-directional 업데이트. store -> view 방향으로
    * Action -> Dispatcher -> Store -> View 순으로 업데이트
    * View -> Action
* store는 업데이트 어떻게?

### useState
s
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

### useReducer
* 여러 상태를 동시에 관리할 때 사용
* const [state, dispatch] = useReducer(reducer, initialState)
