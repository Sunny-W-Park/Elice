## w11-220614-tue

### CSS import
* Component에 CSS를 import해서 사용
* 장점: Component가 많지 않을 때 하나의 CSS 파일만 관리해도 됨
* 단점: namespace를 분리하기 어려움
     * namespace? 하나의 CSS 파일 안에 작성한 style은 하나의 파일 namespace로 관리 
     * 여러 CSS 파일에서 style이 겹칠 경우

### CSS-in-JS
* 별도의 CSS 파일 만들지 않고 Component 파일 내에서 style 작성
```js
import styled from "styled-components";

const Container = styled.div`
    background: ###;
    margin: xxpx;
    padding: 5px;
`;
```

### CSS Box Model
* CSS layout의 기본이 되는 모델(Box Model, Flexbox, Grid.. 등)
* content-box, padding-box, border-box, margin-box 순으로 element를 감싸고 있음
* box의 타입은 inline, block 두 가지
* display: inline or inline-block or block 으로 서로 다른 box type 을 적용함

### CSS position
* position 관리
    * static
    * relative
    * absolute
    * fixed
    * sticky

 ### Sass
 * SCSS, Sass 문법 지원
 * 모듈, 믹스인, nested style, 변수, 조건문, 반복문 등 기능 포함. CSS를 프로그래밍 언어적으로 확장해줌
 * &: 자기 자신을 나타내는 placeholder
 * $: 변수 선언

 ### CSS Flexbox
 * HTML element를 하나의 상자로 간주, 그 안에서 어떻게 내부 item을 배열할 것인가를 스타일하는 모델
 * 기본 개념
    * flex container
    * flex item
    * flex axis: 아이템 방향을 결정하는 축
* container 속성
    * flex-direction (axis)
    * justify-content: main axis의 정렬
    * align-items: cross axis의 정렬
    * flex-wrap: flex container가 내부 item의 width를 합친 것보다 작아질 때, 어떻게 정렬할 것인지를 결정
* item 속성
    * flex: flex-grow / flex-shrink / flex-basis 
    * flex-grow
    * flex-shrink
    * justify-self
    * align-self
    * order
* axis 속성

### styled-components
* JS 파일 내에서 스타일 정의, React Component처럼 활용
* tagged template literal 문법 활용
* CSS 코드를 겹치지 않게 처리 -> 클래스 이름 자체가 hash 역할 