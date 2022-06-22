## w11-220617-fri

### POST
```js
import React, { useState } from "react";
import axios from "axios";

function Users() {
  let [result, setResult] = useState("");

  // 삽입할 데이터 객체를 선언하세요.
  const data =  { "email": "eve.holt@reqres.in", "password": "cityslicka" }
  
  // axios.post를 호출하고 result에 반환되는 토큰 값을 저장하세요.
  axios
    .post('https://reqres.in/api/login', data)
    .then((response) => setResult(response.data.token))
  
  return (
    <div>
      <h4>React Axios로 HTTP POST 요청하기</h4>
      <div>Token: {result}</div>
    </div>
  );
}

export default Users;
```

### GET
* useEffect 복습(출처: https://reactjs.org/docs/hooks-effect.html)
    * 함수를 반환!
    * You tell React that your component needs to do something after render. 
    * React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates.
    * Does useEffect run after every render? Yes! By default, it runs both after the first render and after every update.
```js
import React, { useState, useEffect } from "react";
import axios from "axios";

function Users() {
  let [result, setResult] = useState("");

  useEffect(() => {     // 앱에 변경사항이 생길때마다 render가 되기 때문에 useEffect를 통해 이를 방지
    // axios.get을 호출하고 result에 반환되는 데이터를 저장하세요.
    axios
    .get('https://reqres.in/api/users/2')
    .then((response) => setResult(response.data.data))
  }, [])

  console.log(result)   // 반복 실행 여부 확인

  return (
    <div>
      <h4>React Axios로 HTTP GET 요청하기</h4>
      <div>
        <p> Name: {result.first_name} {result.last_name} </p>
        <p> Email: {result.email} </p>
      </div>
    </div>
  );
}

export default Users;
```

* async/await으로 비동기 처리하기 예제
```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
    // state인 users를 useState()로 선언하세요.
    const [users, setUsers] = useState([])
    
    // async와 await를 이용한 useEffect()를 선언하세요.
    useEffect(() => {
        async function getUsers() {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            console.log(response);
            setUsers(response.data)
        }
        getUsers();
    }, []);    
    
    const userName = users.map(
        (user) => (<li key={user.id}> {user.name} </li>)
    );

    return (
        <>
            <h4>사용자 리스트</h4>
            <div> {userName} </div>
        </>
    );
}

export default Users;
```

* try/catch 구문으로 에러 핸들링
```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function fetchUser() {
            // try ~ catch를 이용해 예외 처리를 하세요.
            try {
            const response = await axios.get(
                'https://jsonplaceholder.typicode.co/error'
            );
            setUsers(response.data);
            } catch (e) {
                setError(e)
            }
        };
        fetchUser();
    }, []);
    
    const userName = users.map(
        (user) => (<li key={user.id}> {user.name} </li>)
    );

    if (error) return <h4>에러 발생!</h4>;
    return (
        <>
            <h4>사용자 리스트</h4>
            <div> {userName} </div>
        </>
    );
}

export default Users;
```


### PUT
```js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  let [result, setResult] = useState("");
  
  // 수정할 데이터를 선언하세요.
  let data = { "first_name": "White", "last_name": "Rabbit" , "email": "alice@elice.io" }
  
  //  axios.put을 호출하고 result에 반환되는 사용자 데이터를 저장하세요.
  useEffect(() => {
      axios
        .put("https://reqres.in/api/users/2", data)
        .then((response) => setResult(response.data))
  }, [])

  return (
    <div>
      <h4>React Axios로 HTTP PUT 요청하기</h4>
      <div>
        Name: {result.first_name + " " + result.last_name} <br />
        Email: {result.email} <br />
        Update Date: {result.updatedAt} <br />
      </div>
    </div>
  );
}
export default Users;
```

### DELETE
```js
import React, { useState } from "react";
import axios from "axios";

function Users() {
  let [result, setResult] = useState("");

  // axios.delete를 호출하고 result에 반환되는 HTTP 상태 코드를 저장하세요.
  axios
    .delete("https://reqres.in/api/users/2")
    .then((response) => setResult(response.status))
  
  return (
    <div>
      <h4>React Axios로 HTTP DELETE 요청하기</h4>
      <div>
        Status: {result}
      </div>
    </div>
  );
}

export default Users;
```

### cancel token
* API 요청을 취소하는데 사용되는 토큰
* get 요청 시 cancel token을 함께 넘겨주어 페이지 정보가 바뀌는 것을 정리할 수 있음
```js
let cancel = undefined;
axios.get("url", {
    cancelToken: new axios.CancelToken((c) => cancel = c)
})
```

### useReducer
* 여러 개의 state를 동시에 관리하는 데에 유리
* useState와 유사한 문법. useReducer에서는 state로 초기값 지정, dispatch 함수로 업데이트
```js
// useReducer 문법

const reducer = (state, action) {
    switch (action.type) {
        case ...
        
        case ... 

        default:
            throw new Error();
    }
}

const [state, dispatch] = useReducer(reducer, initialArg, init);
```

```js
// 예제
import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

// reducer() 함수를 완성하세요.
function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: [],
                error: null,
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,                
            };
        case 'FAIL':
            return {
                loading: false,
                data: [],
                error: action.error,               
            };
        default:
            throw new Error();
    }
}

function Users() {
    // useReducer를 선언하세요.
    const initialState = { 
        loading: false, 
        data: [], 
        error: null 
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    
    async function fetchUser() {
        try {
            // dispatch를 이용해 state를 설정하는 코드입니다.
            dispatch({ type: 'LOADING' });
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );
            dispatch({ type: 'SUCCESS', data: response.data });
        } catch (e) {
            dispatch({ type: 'FAIL', error: e });
        }
    };
    
    useEffect(() => {
        fetchUser();
    }, []);
    
    // useReducer의 state를 불러오는 코드입니다.
    const { loading, data, error } = state;
    
    if(loading)
        return <h4>로딩중...</h4>;
    if(error)
        return <h4>에러 발생!</h4>;
    
    const userName = data.map(
        (user) => (<li key={user.id}> {user.name} </li>)
    );
    
    return (
        <>
            <h4>사용자 리스트</h4>
            <div> {userName} </div>
            <button onClick={fetchUser}>다시 불러오기</button>
        </>
    );
}

export default Users;
```