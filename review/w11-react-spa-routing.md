## w11-220616-thu

### SPA & MPA
* SPA: 하나의 페이지 요청 / MPA: 서버에 미리 페이지를 두고 유저 요청에 맞는 페이지 전달

### react-router
* react 컴포넌트를 특정 path로 연결 -> path 진입 시 컴포넌트 렌더링
* <BrowserRouter>로 감싸 Router Context를 제공해야함
* Switch: 매칭되는 라우트 하나를 렌더링하게 함

### Link, NavLink
* to prop에 url을 받아, 클릭 시 네비게이션
* anchor tag를 래핑함
* NavLink의 경우, 매칭 시 어떤 스타일을 가질지 등 추가 기능이 있음
* to에 location object나 함수를 받을 수 있음

### react-router에서 사용하는 hook
* useHistory, useLocation, useParams, useRouteMatch
* 최상위 컴포넌트가 아니더라도, hook으로 react-router 관련 객체에 접근 가능
* history, location, params, match 객체에 접근
```jsx
// useHistory 사용
import { useHistory } from "react-router-dom"

const LoginPage = () => {
    const history = useHistory();
    ...
    history.push(`detail?var=${var1}&&var2=${var2})
}
```

### react-router로 페이지 구성하기 
* 공통 페이지 레이아웃
```jsx
// PageLayout.jsx
export default function PageLayout({ header, children }){
    return (
        <Layout>
            <Navigation />
            
            <header>
                <h2> {header} </h2>
            </header>

            <main>
                {children}
            </main>
        </Layout>
    )
}

const Layout = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
```

* 공통 페이지 네비게이션
```jsx
// Navigation.jsx
function Navigation() {
    return (
        <Nav>
            <NavLink to="/">Home </NavLink>
            ...
        </Nav>
    )
}

const Nav = styled.div`
    padding: 24px;
    & > a:not(:first-of-type) {
        margin-left: 24px;
    }
`

```
* 개별 페이지 컴포넌트
```jsx
// HomePage.jsx
function HomePage() {
    return (
        <PageLayout header="Home Page"> 홈페이지에 오신 것을 환영합니다.. </PageLayout>
    )
}
```

* 라우터 연결
```jsx
// App.jsx
function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>

                <Route exact path="/about">
                    <AboutPage />
                </Route>
                
                ...
            </Switch>
        </BrowserRouter>
    )
}
```

### react-router 응용 
* Private Route: 특정 조건이 충족되지 않았을 때 다른 페이지로 redirect (ex. 유저 상세 페이지 등)
* Private Route - declarative
```jsx
function PrivateRoute( { component: Component, ...props }){
    return <Route {...props} render={props => {
        const isLoggedIn = !!getUserInfo()
        if (!isLoggedIn) {
            return <Redirect to="/login" />
        }
        return <Component {...props} />
    }}
}
```
* Private Route - imperative
```jsx
function usePrivateRoute(validateFunc) {
    const history = useHistory()
    useEffect(() => {
        if (!validateFunc()) {
            history.push("/login")
        }
    }, [])
}
```

### query string 활용하기
* URL의 query string 정보 활용
* URLSearchParams API를 활용
```jsx
function ContactPage() {
    const location = useLocation();     //현재 url 저장
    const searchParams = new URLSearchParams(location.search);
    ...
    const email = searchParams.get("email");
    const address = searchParams.get("address");
    ...
}
```

