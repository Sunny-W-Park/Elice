## w10-220610-fri

### form 만들기
* 입력받은 데이터를 console.log로 확인해보기
```js
// InsertForm.js
import React from 'react';
import {useState} from 'react';

const InsertForm = (props) => {
    const [inputValue, setInputValue] = useState("")
    const handleChange = (e) => {
        setInputValue(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof props.onInsert === "function"){
            props.onInsert(inputValue);
        }
        setInputValue("")
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input value={inputValue} onChange={handleChange}/>
                <button type="submit" >등록</button>
        </form>
    )
}

export default InsertForm

// React.js
import React from 'react';
import InsertForm from './components/InsertForm';

function App() {
  return (
    <div className="App">
        <InsertForm onInsert={(value) => {  // insert된 값을 console.log로 출력해주는 함수(function)를 넘겨주기
            console.log(value);
        }}/>
    </div>
  );
}

export default App;
```

* 전달받은 값을 리스트에 저장, 화면에 출력해보기
    * array에 저장
    * map 메소드를 활용하여 return 해주기
```js
// InsertForm.js
import React, { useState, useCallback } from "react";

const InsertForm = ({ onInsert }) => {
    const [inputValue, setInputValue] = useState("");
    const handleSubmit = useCallback((event) => {   // useCallback을 활용
        event.preventDefault(); 
        if(typeof onInsert === "function" && inputValue) {
            onInsert(inputValue);
        }
        setInputValue("");
    },[onInsert, inputValue]) // useCallback 조건
    
    return (
        <form onSubmit={handleSubmit}>
            <input value={inputValue} onChange={(event) => {
                setInputValue(event.target.value);
            }} />
            <button type="submit">등록</button>
        </form>
    )
}

export default InsertForm;

// ListView.js
import React from 'react';

const ListView = ({ todoList} ) => {
    return(
        <div>
            <ol> 
                {todoList.map((item) => {
                    return (
                        <li key={item.key}>
                            <span> {item.value} </span>
                            <button type="button"> 완료 </button>
                            <button type="button"> 삭제 </button>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
} 

export default ListView;

// App.js
import React, {useState} from 'react';
import InsertForm from "./components/InsertForm";
import ListView from "./components/ListView";

function App() {
  const [todoList, setTodoList] = useState([]);
  const handleInsert = (value) => {
    setTodoList((current) => {
        const newTodoList = [...current];   // 기존 array에서 값을 복사한 뒤
        newTodoList.push({      // 기존 array에 값 추가
             key: new Date().getTime(),
             value: value,
             isCompleted: false
        })
        return newTodoList;
    })
  }

  return (
    <div className="App">
        <ListView todoList={todoList} />
        <InsertForm onInsert={handleInsert} />
    </div>
  );
}

export default App;
```

* 완료/삭제 기능 및 버튼 추가하기
```js
// App.js 
import React, { useState } from 'react';
import InsertForm from "./components/InsertForm";
import ListView from "./components/ListView";

function App() {
  const [todoList, setTodoList] = useState([]);
  
  const handleInsert = (value) => {
    setTodoList((current) => {
      const newList = [...current];
      newList.push({
        key: new Date().getTime(),
        value,
        isCompleted: false,
      });
      return newList;
    })
  }
  
  const handleOnComplete = (index) => {
    setTodoList((current) => {
      const newList = [...current];
      newList[index].isCompleted = true;
      return newList
    })
  }
  
  const handleOnRemove = (index) => {
    setTodoList((current) => {
      const newList = [...current];
      newList.splice(index, 1);
      return newList
    })  
  }
  
  return (
    <div className="App">
        <ListView todoList={todoList} onComplete={handleOnComplete} onRemove={handleOnRemove} />
        <InsertForm onInsert={handleInsert} />
    </div>
  );
}

export default App;

// ListView.js
import React from "react";

const ListView = ({todoList, onComplete, onRemove}) => {
  return (
    <div>
      <ol>
        {todoList.map((item, index) => {
          return (
            <li key={item.key}>
              <span>{item.value}</span>
              <button type="button" onClick={() => {onComplete(index)}}>완료</button>
              <button type="button" onClick={() => {onRemove(index)}}>삭제</button>
              // () => {반드시 묶어줘야함.. 안묶어주면 바로 실행}
            </li>
          );
        })}
      </ol>
    </div>
  )

}

export default ListView;
```

