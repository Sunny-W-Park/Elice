## w10-220610-fri

### hooks 개요
* react 함수(컴포넌트, hook) 내에서만 사용 가능

### state hook
* useState: 컴포넌트 내 동적인 데이터 관리
* state는 읽기 전용이므로 직접 수정x
* state가 변경되면 자동으로 컴포넌트가 재랜더링됨

### effect hook
* 함수 컴포넌트에서 side effect 수행
* 지정한 state나 props가 변경될 때마다 내가 정의한 함수(콜백) 실행
* 두번째 인자로 배열을 넘겨줌으로써 조건부 실행 지정:
    > "You can tell React to skip applying an effect if certain values haven’t changed between re-renders. "

```js
const App = () => {
    const [count, setCount] = useState(0)
    
    useEffect(() => {
        console.log(`버튼을 ${count}회 클릭했습니다.`),
    }, [count]) // only re-run the effect if count changes
}
```

### 기타 hooks
* useMemo: 지정한 state가 변경될 경우 해당 값을 활용해 계산된 값을 메모이제이션. 변수 메모이제이션
```js
import React from 'react';
import {useState, useMemo} from 'react';

function App() {
  const [foo, setFoo] = useState(0)
  const [bar, setBar] = useState(0)
  
  const multi = useMemo(() => foo*bar, [foo, bar])
  
  const handleFoo = (e) => {
    setFoo(parseInt(e.target.value))
  }
  
  const handleBar = (e) => {
    setBar(parseInt(e.target.value))
  }

  return (
    <div className="App">
        <input value={foo} onChange={handleFoo} />
        <input value={bar} onChange={handleBar} />
        <div> {multi} </div>
    </div>
  );

export default App;
```

* useCallback: 함수 메모이제이션. 컴포넌트가 재렌더링될때 발생하는 불필요한 함수 실행 방지
```js
import React from 'react';
import {useState, useCallback} from 'react'

function App() {
  const [foo, setFoo] = useState(0)
  const [bar, setBar] = useState(0)
  
  const calc = useCallback(() => foo+bar, [foo, bar])
  
  const handleFoo = (e) => {
    setFoo(parseInt(e.target.value))
  }
  
  const handleBar = (e) => {
    setBar(parseInt(e.target.value))
  }
  
  return (
    <div className="App">
        <input value={foo} onChange={handleFoo} />
        <input value={bar} onChange={handleBar} /> 
        <div> {calc()} </div>
    </div>
  );
}

export default App;
```
* useRef: 컴포넌트 생애 주기 내에서 유지할 ref 객체 반환. 
    * 인자로 넘어온 초기 값을 current 속성에 저장
    * current 속성은 컴포넌트가 재렌더링되어도 값이 변경되지 않음
```js
import React from 'react';
import {useState, useRef} from 'react'

function App() {
  const inputRef = useRef()
  
  const handleClick = () => {
    alert(inputRef.current.value)
  }
  
  return (
    <div className="App">
        <input ref={inputRef} />
        <button onClick={handleClick}> 버튼 </button>
    
    </div>
  );
}

export default App;
```

### 나만의 hook 만들기
```js
// App.js
import React from 'react';
import useToggle from './hooks/useToggle'

function App() {
  const {isOn, toggle} = useToggle(false); // default state를 false로 지정, return된 toggle 함수 불러오기 

  return (
    <div className="App">
        {isOn && <button onClick={toggle}> 켜짐 </button>}
        {!isOn && <button onClick={toggle}> 꺼짐 </button>}
    </div>
  );
}

export default App;

// UseToggle.js 
import React from 'react'
import {useState} from 'react'

const useToggle = (def) => {
    const [isOn, setIsOn] = useState(def)
    
    const toggle = () => {
        if (isOn == true){
            setIsOn(false)
        }
        else {
            setIsOn(true)
        }
    }
    
    return {isOn, toggle} // isOn state 와 toggle 함수를 묶어서 출력
}

export default useToggle
```