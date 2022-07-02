## w12-220624-fri

### Assertion
* assertion matchers 활용
* expect(): assertion 함수
    * expect().toBe(): 객체 내용을 비교
    * expect().toEqual(): 객체 자체를 비교
    * expect().toMatch()
    * expect().toContain(): 배열 내에 값이 포함되어 있는지
    * expect().not.toContain(): toContain()과 반대
```js
// code
function isPythagorean(a, b, c){
    return a*a + b*b === c*c
}

function createTodo(id, title, content){
    return {id, title, content}
}

function transformUser(user){
    const {name, age, address} = user
    return [name, age, address]
}

// test code
test('Should 3, 4, 5 pythagrean', () => {
    expect(isPythagorean(3, 4, 5)).toBe(true)
})

test('Should create todo', () => {
    const id = 1, title = "Test todo", content = "Test content";
    expect(createTodo(id, title, content)).toEqual({id, title, content})
})

test('Should create todo', () => {
    const id = 1, title = "Test todo", content = "Test content";
    expect(createTodo(id, title, content).title).toMatch("Test todo")
})
```

### Async assertion
* assertion 함수의 비동기 처리

### Mock function
* jest.fn()을 활용하여 mock function 객체 생성

### Lifecycle functions
* beforeEach()
* afterEach()
* beforeAll()
* afterAll()

### react-testing-library: queries
* get: 원소가 반드시 페이지에 존재해야만 하는 경우 활용
    * getBy: 원하는 요소를 찾지 못할 경우나 여러개의 요소를 찾을 경우 에러
    * getAllBy: 여러 요소를 찾아 배열 반환. 원하는 요소를 찾지 못할 경우 에러
* find: 원하는 요소가 없더라도 비동기적으로 기다림 (Promise return)
    * findBy: 여러 요소를 찾거나, timeout 동안 찾지 못하면 에러
    * findAllBy: 여러 원소를 탐색해 배열 반환
* query: 특정 요소를 찾을 수 없음을 assertion 기준으로 둘 때 활용 
    * queryBy: getBy와 유사, 원하는 요소를 찾지 못하면 null값, 여러 개 찾으면 에러
    * queryAllBy: 원하는 요소 찾지 못하면 빈 배열 반환
* container: 컴포넌트를 렌더한 결과를 감싸는 원소

### jest-dom

### react-testing-library: query의 우선 순위
* 유저가 페이지를 이동하는 방식에 가까운 쿼리일수록 우선순위 높음
* ByRole
    * getByRole, findByRole, queryByRole...
* Text
    * ByLabelText
    * ByPlaceholderText
    * ByText
    * ByDisplayValue: input, textarea, select 등의 value를 기준으로 원소를 찾음
* TestID

### testing 예제(1) 유저정보 토글앱 구현
```jsx
// App.js
import React, {useState} from "react";

function SimpleToggle() {
  const [show, setShow] = useState(false);

  const handleClick = () => {
      setShow(!show);
  }

  return (
      <div>
        {!show && <p>유저 정보를 보려면 버튼을 누르세요.</p>}
        {
            show && (
                <ul>
                    <li> Email - elice@elicer.com </li>
                    <li> Address - 서울시 강남구 테헤란로 401 </li>
                </ul>
            )}
        }
        {<button onClick={handleClick}> 
            {!show ? "유저정보 보기" : "유저정보 가리기"}
        </button>}
      </div>
    )
};
export default SimpleToggle;


// App.test.js
import { screen, render } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import SimpleToggle from "./App";

describe("앱을 렌더링합니다.", () => {
  test("버튼이 있습니다.", () => {
    render(<SimpleToggle />);
    // "유저정보 보기" 버튼을 찾습니다.
    // screen.getByRole을 이용합니다.
    // 버튼이 존재하는지 체크합니다.
    // toBeInTheDocument matcher를 이용합니다.
    const button = screen.getByRole('button', {
        name: '유저정보 보기',
    })
    expect(button).toBeInTheDocument();
  });

  test("버튼을 누르지 않았을 시, 유저 정보 안내문이 보입니다.", () => {
    render(<SimpleToggle />);
    // 텍스트를 찾습니다.
    // 텍스트 - "유저 정보를 보려면 버튼을 누르세요."
    // screen.getByText를 이용합니다.
    // 텍스트가 존재하는지 체크합니다.
    const text = screen.getByText("유저 정보를 보려면 버튼을 누르세요.")
    expect(text).toBeInTheDocument();
  });
});

describe("토글 기능을 테스트합니다.", () => {
  test("버튼을 눌렀을 시, 유저 정보가 보입니다.", () => {
    render(<SimpleToggle />);
    const infoText = "유저 정보를 보려면 버튼을 누르세요."

    // 텍스트를 찾습니다.
    // 텍스트 - "유저 정보를 보려면 버튼을 누르세요."
    // 텍스트가 존재하는지 체크합니다.
    const text = screen.getByText(infoText)
    expect(text).toBeInTheDocument()

    // Toggle 버튼을 찾습니다.
    // 버튼을 클릭합니다.
    // 위에서 찾은 텍스트가 보이지 않는지 체크합니다.
    // screen.queryByText를 이용합니다.
    const button = screen.getByRole('button', {
        name: '유저정보 보기',
    })
    userEvent.click(button)
    expect(
        screen.queryByText(infoText)
    ).not.toBeInTheDocument()

    // 이메일 정보를 찾습니다.
    // 이메일 정보 - "Email - elice@elicer.com"
    // screen.getByText를 이용합니다.
    // 이메일 정보가 문서에 존재하는지 체크합니다.
    const email = screen.getByText("Email - elice@elicer.com")
    expect(email).toBeInTheDocument()

    // 주소 정보를 찾습니다.
    // 주소 정보 - "Address - 서울시 강남구 테헤란로 401"
    // screen.getByText를 이용합니다.
    // 주소 정보가 문서에 존재하는지 체크합니다.
    const address = screen.getByText("Address - 서울시 강남구 테헤란로 401")
    expect(address).toBeInTheDocument()

    // 버튼의 텍스트가 "유저정보 가리기" 로 바뀌는지 체크합니다.
    // toHaveTextContent matcher를 이용합니다.
    expect(button).toHaveTextContent("유저정보 가리기")

  });

  test("버튼을 두번 누르면, 유저 정보가 보이지 않습니다.", () => {
    render(<SimpleToggle />);

    // 버튼을 찾습니다.
    // 버튼을 클릭합니다.
    // userEvent.click을 이용합니다.
    // 이메일 정보가 문서에 있는지 체크합니다.
    const button = screen.getByRole('button', {name: '유저정보 보기'})
    userEvent.click(button, {clickCount: 1});   // 1회 클릭 명시
    const email = screen.getByText("Email - elice@elicer.com")
    expect(email).toBeInTheDocument()

    // Toggle 버튼을 클릭합니다.
    // 이메일 정보가 문서에서 사라졌는지 체크합니다.
    // screen.queryByText를 이용합니다.
    userEvent.click(button, {clickCount: 1})    // 1회 클릭 명시
    expect(email).not.toBeInTheDocument()
  });
});
```

### testing 예제(2) ShoppingCart 컴포넌트 구현
```jsx
// App.js
import React from "react";

const getDiscountPrice = (price, quantity, discount) => (price - price * discount) * quantity

const getTotalPrice = (carts) => 
        carts
        .map(({price, quantity, discount}) => getDiscountPrice(price, quantity, discount))
        .reduce((acc, cur) => acc + cur, 0)

function ShoppingCart({ carts }) {
  return (
    <div>
        <h2> 쇼핑 목록</h2>

      <p> 테스트 코드에 따라 카트 내용을 보여주세요. </p>

      <ul>
        {carts.map(({id, image, name, quantity, price, discount}) => (
            <Cart
                key={id}
                image={image}
                name={name}
                quantity={quantity}
                price={getDiscountPrice(price, quantity, discount)}
            />
        ))}
      </ul>

      <div>총 가격 : {getTotalPrice(carts)}원</div>
    </div>
  );
}

export default ShoppingCart;

function Cart({image, name, quantity, price }){
    return(
    <li>
        <div>
            <img src={image} alt={name} />
        </div>

        <div>
            <div>개수 : {quantity}</div>
            <p>상품 가격 : {price}원</p>
        </div>
    </li>
    )
}

// App.test.js
import { screen, render } from "@testing-library/react";
import ShoppingCart from "./App";

const mockCarts = [
  {
    id: 1,
    name: "강아지 신발 사이즈 xs",
    price: 14000,
    discount: 0.1,
    quantity: 1,
    image: "https://via.placeholder.com/150.png",
  },

  {
    id: 2,
    name: "베이비 물티슈 200매",
    price: 2000,
    discount: 0.2,
    quantity: 10,
    image: "https://via.placeholder.com/150.png",
  },

  {
    id: 3,
    name: "강아지 사료 4kg",
    price: 40000,
    discount: 0.3,
    quantity: 3,
    image: "https://via.placeholder.com/150.png",
  },
];

describe("ShoppingCart 컴포넌트를 렌더링합니다.", () => {
  test("헤더가 있습니다.", () => {
    render(<ShoppingCart carts={mockCarts} />);
    // screen.getByRole을 이용해 헤더를 찾습니다.
    // 헤더가 화면에 있는지 테스트합니다.
    const header = screen.getByRole('heading', {name: '쇼핑 목록'});
    expect(header).toBeInTheDocument();
  });

  test("아이템 3개를 보여줍니다.", () => {
    render(<ShoppingCart carts={mockCarts} />);
    // screen.getAllByRole을 이용해 모든 리스트 아이템을 찾습니다.
    // 모두 총 3개인지 체크합니다.
    const lis = screen.getAllByRole("listitem")
    expect(lis.length).toBe(3);
  });

  test("아이템의 이미지를 노출합니다.", () => {
    render(<ShoppingCart carts={mockCarts} />);
    // screen.getByAltText를 이용해 "강아지 사료 4kg"란 텍스트로 이미지를 찾으세요.
    // 이미지의 src attribute가 mockCarts의 데이터와 같은지 체크하세요.
    // toHaveAttribute를 이용하세요.
    const image = screen.getByAltText("강아지 사료 4kg")
    expect(image).toHaveAttribute("src", mockCarts[2].image)
  });
});

describe("계산된 값을 노출합니다.", () => {
  test("할인된 값을 보여줍니다.", () => {
    render(<ShoppingCart carts={mockCarts} />);
    // screen.getAllByText를 이용해, 모든 상품 가격을 찾으세요.
    // 상품 가격에 할인가가 반영되었는지 체크하세요.
    // 상품 가격 - (price - price * discount) * quantity
    // toHaveTextContent를 이용하세요.
    const {price, discount, quantity} = mockCarts[0]
    const discountPrice = (price - price * discount) * quantity
    const prices = screen.getAllByText(/상품 가격 :/i)
    expect(prices[0]).toHaveTextContent(`상품 가격 : ${discountPrice}`)
  });

  test("총 가격을 보여줍니다.", () => {
    render(<ShoppingCart carts={mockCarts} />);
    // 직접 mockCarts의 totalPrice를 계산해보세요.
    // 총 가격 - 모든 카트 상품 가격의 합
    // screen.getByText를 이용해, 총 가격이 제대로 표시되는지 체크하세요.
    const getDiscountPrice = (price, quantity, discount) => (price - price * discount) * quantity
    const getTotalPrice = (carts) => 
        carts
        .map(({price, quantity, discount}) => getDiscountPrice(price, quantity, discount))
        .reduce((acc, cur) => acc + cur, 0)
    const totalPrice = getTotalPrice(mockCarts)
    expect(screen.getByText(`총 가격: ${totalPrice}원`)).toBeInTheDocument();
});
```

### testing 예제(3) UsernameForm 구현
```jsx
// App.js
// App.test.js
```

