## w13-220628-tue

### CSR vs SSR
* CSR: 데이터를 받아 자바스크립트로 페이지를 구성. 자바스크립트 프레임워크 활용
    * 장점: js로만 페이지 구성 / Full page load 없이 라우팅
    * 단점: js 코드가 많으면 로딩이 느려짐 / SEO가 좋지 않음
* SSR: 서버에서 자바스크립트를 이용해 페이지를 미리 빌드하는 방식

### Time To First Byte
* 페이지 요청 후, 처음 데이터가 도착하는 데까지 걸리는 시간
    * 브라우저 요청이 서버까지 가는 시간
    * 서버에서 요청을 처리하는 시간
    * 서버에서 브라우저까지 응답이 가는 시간

### First Contentful Paint
* 페이지에 진입 후, any DOM content를 만드는 시간
    * TTFB 시간 +
    * 브라우저에서 HTML, CSS, js를 파싱하는 시간
    * 브라우저에서 페이지를 그리는 시간

### Time to Interactive
* 페이지 진입 후, 유저가 클릭/스크릭/인풋 등의 행위를 할 수 있는 시간 
    * TTFB 시간 +
    * FCP +
    * js가 처리되어 DOM에 이벤트를 부착하는 시간
