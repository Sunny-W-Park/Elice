## w11-220617-fri

### 자바스크립트 비동기
* 자바스크립트는 기본적으로 싱글스레드! 따라서 동기가 아닌 비동기 처리를 통해 서버와 통신
* 동기: 해당 코드 블록을 실행할 때 thread의 제어권을 넘기지 않고 순서대로 실행하는 것을 의미
* 비동기: 코드의 순서와 다르게 실행
    * 비동기 처리 코드를 감싼 블록은 task queue에 넣어짐
    * event loop가 task queue에 넣어진 비동기 코드를 실행

### Promise
* promise: 객체 생성 당시에는 알려지지 않은 데이터에 대한 proxy(데이터가 있음을 가정하고~ 허수아비 같은 존재)
* pending / fulfilled / rejected
    * pending -> fulfilled / rejected
    * fulfilled / rejected: settled
    * pending: 비동기 실행이 끝나기를 기다림
* multiple promise handling
    * Promise.all(): 모든 promise fulfill
    * Promise.allSettled(): 모든 promise가 settled 되기를 기다림
    * Promise.race(): promise 중 하나라도 settled 되기를 기다림
    * Promise.any(): promise 중 하나라도 fullfill
* promise chaining, nested promise
    * Promise 객체는, settled 되더라도 계속 handler(then, catch, finally) 붙일 수 있음
    * 

### async/await
* promise 체인 대신 사용. promise를 직관적으로 사용할 수 있는 문법
```js
// async-await 사용
async function fetchUsers() {
    try {
        const users = await request('/users')   // resolved data
        console.log("users fetched")
        return users
    } catch (e) {
        console.log("error : ", e)
    }
}

// Promise 사용
function fetchUsers() {
    return request('/users')
        .then(users => console.log("users fetched."))
        .catch(e => console.log("error: ", e))
}
```

* 여러 개의 await 사용 가능
```js
async function fetchUserWithAddress(id) {
    try {
        const user = await request(`/user/${user.id}`);
        if (!user) throw new Error("No user found.")
    
        const address = await request(`/user/${user.id}/address`)
        if (!address.userId !== user.id) throw new Error("No address match with user")

        return {...user, address}
    } catch (e) {
        console.log("User fetch error: ", e)
    }
}
```
