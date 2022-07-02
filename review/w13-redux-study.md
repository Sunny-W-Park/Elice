## w13-220628-tue
(textbook: "Learning React")

### 상태(state)
* 모든 상태 데이터를 한 곳의 객체에서 저장 및 관리
* 상태 객체 내부는 변경 불가능함

### 액션(action)
* 상태를 갱신하는 방법. 어떤 부분을 바꿀지 지시하고, 그런 변경에 필요한 데이터를 제공
* 액션에는 타입(type) 필드가 반드시 존재

### payload
* 상태 변화에 필요한 데이터

### reducer
* 함수를 사용해 상태 트리 일부를 갱신
* reducer(state, action) => new state: 현재 상태와 액션을 인자로 받아 새로운 상태를 만들어 반환
* switch문: 여러 액션을 action.type으로 구분하고 case문에서 각 액션 유형을 처리
```js
export const reducer = (state = {}, action) => {
    switch (action.type) {
        case 1: 
            return {

            }
        case 2:
            return {

            }
        ...
        default:
            return state
    }
}
```

### store
* 앱의 상태 데이터를 저장, 상태 갱신을 처리
* store = createStore() 로 하나의 store만을 생성

### react-redux: Provider
* provider: 컨텍스트에 스토어를 설정할 때 사용할 수 있는 컴포넌트
* provider로 react element를 감싸기만 하면 element의 모든 자식은 자동으로 컨텍스트를 통해 스토어에 접근 가능

### 문제(1) 카운터 앱 만들기
```jsx
// store.jsx
import React from "react";
import Counter from "./Component/Counter";
import {Provider} from 'react-redux';
import {createStore} from "redux";
/* 필요한 모듈을 추가로 import 하세요! */

/* 초기상태입니다. 수정하지 마세요! */
const initialState = {
  number: 0,
};

function reducer(state, action) {
  switch (action.type) {
    /* 문제 지시사항대로 카운터를 위한 reducer를 정의해주세요! */
    case "counter/div_two": 
        return {
            number: state.number/2
        }
    break

    case "counter/sub_one": 
        return {
            number: state.number-1
        }
    break

    case "counter/add_one": 
        return {
            number: state.number+1
        }
    break

    case "counter/mul_two": 
        return {
            number: state.number * 2
        }
    break

    default:
      return state;
  }
}

/* 초기 상태와 정의한 reducer로 store를 구성하세요. */
const store = createStore(reducer, initialState)

/* 지사사항에 정의된 네 가지의 액션 생성함수를 정의하세요. */
export function div_two(){
    return ({type: 'counter/div_two'}) 
}

export function sub_one(){
    return ({type: 'counter/sub_one'}) 
}

export function add_one(){
    return ({type: 'counter/add_one'}) 
}

export function mul_two(){
    return ({type: 'counter/mul_two'}) 
}

export default function CounterContainer() {
  /* Counter 컴포넌트가 전역 상태를 사용할 수 있도록 코드를 추가해주세요. */
  return (
      <Provider store={store}>
        <Counter />
      </Provider>
  );
}

// Counter.jsx
import React from "react";
import * as ACTION from "../store";
import "./Counter.css";
import {useDispatch, useSelector} from 'react-redux';
/* 필요한 모듈을 추가로 import 하세요! */

export default function Counter() {
  /* react-redux의 Hook을 사용해 dispatch 객체를 생성하고 state를 가져오세요. */
  const dispatch = useDispatch()
  const number = useSelector((state) => state.number);
  
  const handleClick = (e) => {
    switch (e.target.name) {
      /* 버튼별로 action을 생성해 dispatch 하세요. */
      case "div2": {
          dispatch(div_two())
      }
      break
        
      case "sub1": {
          dispatch(sub_one())
      }
      break
        
      case "add1": {
          dispatch(add_one())
      }
      break
        
      case "mul2": {
          dispatch(mul_two())
      }
      break
        
      default:
        break;
    }
  };

  return (
    <div className="counter">
      <div className="counter-header">Counter</div>
      <div className="counter-content">{number}</div>
      <div className="counter-footer">
        <button name="div2" onClick={handleClick}>
          / 2
        </button>
        <button name="sub1" onClick={handleClick}>
          - 1
        </button>
        <button name="add1" onClick={handleClick}>
          + 1
        </button>
        <button name="mul2" onClick={handleClick}>
          x 2
        </button>
      </div>
    </div>
  );
}
```

### 문제(2) 유저 정보 관리 앱 만들기
```jsx
// AccountsContainer.jsx
import React from "react";
import Accounts from "../Component/Accounts";
/* 필요한 모듈을 추가로 import 해주세요. */
import {createStore} from "redux";
import {Provider} from "react-redux";

/* 초기상태입니다. 수정하지 마세요!*/
const initialState = {
  users: [],
  globalID: 0,
};

function reducer(state, action) {
  switch (action.type) {
    /* 지시사항에 따라 계정 정보 관리를 위한 reducer를 정의해주세요. */
    case "accounts/register":
        return {
        ...state,
        users: [
            ...state.users,
            {
            key: state.globalID,
            id: action.payload.id,
            password: action.payload.password
            },
        ],
        globalID: state.globalID + 1,
        };

    case "accounts/delete":
        return {
            ...state,
            users: state.users.filter((user) => user.id !== action.payload.id)
        };

    default:
      return state;
  }
}

/* 초기 상태와 정의한 reducer로 store를 구성하세요. */
const store = createStore(reducer, initialState)

const ACCOUNTS_REGISTER = "accounts/register";
const ACCOUNTS_DELETE = "accounts/delete";

export const ACTIONS = {
  /* registerUser와 deleteUser 액션 생성함수를 정의하세요. */
  registerUser: (id, pwd) => ({
        type: ACCOUNTS_REGISTER,
        payload: {
            id: id,
            password: pwd
        }
  }),

  deleteUser: (id) => ({
        type: ACCOUNTS_DELETE,
        payload: {
            id: id
        }
  })
};

export const usersSelector = (state) => state.users;

export default function AccountsContainer() {
  /* Accounts 컴포넌트가 store에 접근할 수 있도록 코드를 추가해주세요. */
  return (
    <Provider store={store}>
      <Accounts />
    </Provider>
  );
}


// Accounts.jsx
import React, { useRef } from "react";
import "./Accounts.css";
import User from "./User";
/* 필요한 모듈을 추가로 import 해주세요. */
import {ACTIONS, usersSelector} from "../Container/AccountsContainer";
import {useSelector, useDispatch} from "react-redux";

export default function Accounts() {
  const idRef = useRef(undefined);
  const pwdRef = useRef(undefined);
  /* react-redux의 Hook을 사용해 dispatch 객체를 생성하세요. */
  const dispatch = useDispatch()
  const users = useSelector(usersSelector) 
  
  const handleClick = () => {
    /* 지시사항에 따라 action을 생성하고 dispatch 후 입력값들을 초기화하세요. */
    const idValue = idRef.current.value;
    const pwdValue = pwdRef.current.value;
    const checkUser = users.filter((u) => u.id === idValue);
    if (checkUser.length < 1){
        dispatch(ACTIONS.registerUser(idValue, pwdValue))
    }
    idRef.current.value = undefined;
    pwdRef.current.value = undefined; 
  };

  return (
    <div className="accounts">
      <div className="accounts-header">Accounts</div>
      <div className="accounts-content">
        <div className="accounts-content-id">
          <label htmlFor="id">ID</label>
          <input autoComplete="off" ref={idRef} id="id" placeholder="ID" />
        </div>
        <div className="accounts-content-pwd">
          <label htmlFor="pwd">PassWord</label>
          <input
            autoComplete="off"
            ref={pwdRef}
            id="pwd"
            placeholder="PassWord"
          />
        </div>
        <button onClick={handleClick}>Register</button>
      </div>
      <div className="accounts-footer">
        {users.map((item) => (
          <User key={item.key} id={item.id} pwd={item.password} />
        ))}
      </div>
    </div>
  );
}


// User.jsx
import React from "react";
import styled from "styled-components";
/* 필요한 모듈을 추가로 import 해주세요. */
import {ACTIONS} from "../Container/AccountsContainer";
import {useDispatch} from "react-redux";

export default function User({ id, pwd }) {
  /* react-redux의 Hook을 사용해 dispatch 객체를 생성하고 state를 가져오세요. */
  const dispatch = useDispatch()

  const handleClick = () => {
    /* 지시사항에 따라 action을 생성하고 dispatch하세요. */
    dispatch(ACTIONS.deleteUser(id));
  };

  return (
    <UserInfo role="userInfo" onClick={handleClick}>
      <IDPos>ID: {id}</IDPos>
      <PWDPos>PassWord: {pwd}</PWDPos>
    </UserInfo>
  );
}

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  flex: 0 0 60px;

  width: 250px;
  height: 60px;

  border: 1px solid black;

  cursor: pointer;

  & + & {
    margin: 20px 0px 0px 0px;
  }
  
  &:hover {
    background-color: lightgray;
  }
`;

const IDPos = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 50%;
  margin: 0px 0px 0px 10px;
`;

const PWDPos = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 50%;
  margin: 0px 0px 0px 10px;
`;
```