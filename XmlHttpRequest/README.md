#Simple XmlHttpRequest
### 이 예제에서 알 수 있는 점:
1. XmlHttpRequest API 이용한 **Asynchronous Javascript And XML**
2. Asynchronous operation 의 `Promise`
3. Promise 사용을 더 편리하게, 혹은 가독성 있게 만들어주는 `async`, `await`
4. 간단한 Express server in nodeJs Runtime 만들기!
5. Express 의 middleware 중 하나인 static 사용하기
6. babel cli 사용하기
7. JSX 사용하기 (React 없이!)
8. 간단한 typescript 체험
***

Express 의 `res.sendFile()`은 잘 작동하지 않을 수 있습니다!   
`app.use(express.static(root))`를 사용하면 원하는 대로 작동을 합니다. 

***

### 예제의 파일 및 디렉토리 구조
* [README.md](README.md) 
* [server.js](server.js) → Express 를 사용한 서버 앱 입니다.   
  1. 해당 앱을 작동시키려면 node.Js 런타임이 필요합니다.   
  2. node.Js 에서 해당 앱을 실행시키면 서버가 작동됩니다.
* [static](static) → Express.static 에서 static root directory 로 사용될 디렉토리입니다.
  * [.babelrc](static/.babelrc) → babel configuration 파일 입니다.
  * [index.html](static/index.html) 
  * [style.css](static/style.css) 
  * [fetch-script.tsx](static/fetch-script.tsx) → typescript 확장 파일입니다. 
    1. babel 에서 이 파일을 tsx → jsx → js 로 compile 할 것입니다.
    2. tsx → jsx 과정에서 typescript를 javascript로 compile 합니다.
    3. jsx → js 과정에서 babel은 JSX를 설정해 둔 함수로 변형하는 작업을 합니다. 
    4. react의 경우에는 JSX 태그 문법을 `React.createElement`로 컴파일합니다. 
    이 프로젝트에서는 직접 정의한 `createElement`로 컴파일 할 것입니다. 

***