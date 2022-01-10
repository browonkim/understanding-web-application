# Learning React
## Why react?
리액트를 사용하기 앞서, 어떻게 사용자의 브라우저가 웹 페이지를 렌더링 하는지를 이해할 필요가 있습니다.
   
* [DOM 이해하기](#understand-dom)
* [CSSOM 이해하기](#css-object-model-cssom)
### Understand DOM
브라우저는 HTML 문서를 가져오기 위해서(<i>fetch</i>) 웹 서버에 요청(<i>request</i>)을 보냅니다.   
요청을 받은 서버는 <b>바이너리 스트림</b> 형태로 HTML 페이지를 반환합니다. 기본적으로 이것은 `content-type`헤더가 `text/html; charset=UTF-8`로 설정된 
텍스트 파일입니다.    
   

`text/html`은 <b>MIME TYPE</b>입니다. 이것은 브라우저에게 이 파일이 HTML 문서라는 것을 알려주는 역할을 합니다.   
`charset=UTF-8`은 이 문서의 인코딩이 UTF-8이라는 것을 브라우저에게 알려줍니다.   
이러한 정보를 토대로 브라우저는 바이너리 포맷을 읽을 수 있는 텍스트 파일로 변환할 수(<i>convert</i>) 있습니다.

만약 모든 것이 정상이라면, 브라우저는 이 텍스트 파일을 HTML 문서로서 읽기 시작할 것입니다.  

브라우저가 HTML 코드를 읽을 때 `html`, `body`, `div` 등과 같은 HTML 요소(<i>element</i>)를 만날 때 마다 <b>Node</b>라고 불리는 JavaScript 객체를 만들어냅니다.   
즉, 결과적으로 모든 HTML 요소들은 JavaScript 객체로 변환됩니다.
모든 HTML 요소들은 서로 다른 속성(<i>properties</i>)를 가지기 때문에, 각 노드 객체들은 서로 다른 클래스(<i>Constructor function</i>)로 만들어 질 것입니다. 
예를 들어, `div` 요소를 위한 Node 객체는 `Node`클래스를 상속받은 `HTMLDivElement`클래스에서 만들어집니다.   
   
브라우저가 HTML 문서로 부터 노드들을 만들어 낸 후, 이러한 노드 객체들에 대해 tree 구조를 생성해냅니다.
> <i>After the browser has created Nodes from the HTML document, it has to create a tree-like structure of these node objects.</i>

아래의 예시처럼 HTML 파일 속의 HTML 요소들은 서로 중첩 되어 있기에 브라우저는 각각에 대해 복제를 해야하지만 그 대신에 기존에 생성된 노드 객체를 사용합니다. 
이렇게 하면 브라우저가 생명주기 동안 웹 페이지를 더 효율적으로 렌더링하고 관리할 수 있습니다.    
```html
<!DOCTYPE HTML>
<html>
<head>
    <title> HTML Example</title>
    <link rel="stylesheet" href="./style.css"/>
</head>
<body>
    <div class="container">
        <h1>Test HTML!</h1>
        <p> greetings </p>
        <script src="./actions.js"></script>
    </div>
</body>
</html>
```
위 HTML 문서를 간단한 DOM Tree로 나타내면 다음과 같습니다.

![](src/DomTree.jpg)

DOM 트리는 최상단의 요소인 `html`로 부터 시작되어 HTML 요소의 생성 및 중첩에 따라 가지를 뻗어 나갑니다. 
> 💡 DOM Node는 HTML 원소가 아닐 수도 있습니다. 브라우저가 DOM 트리를 생성할 때, 주석(<i>comments</i>)
> , 속성들(<i>attributes</i>), 텍스트(<i>text</i>)과 같은 것들을 별도의 노드로 트리에 저장합니다.   
>    
> 그러나 단순함을 위해 HTML 원소를 위한 DOM 노드, 즉 <i>DOM Element</i>들만 고려하도록 하겠습니다. 
> 모든 DOM 노드 타입들은 <a href="https://www.w3schools.com/jsref/prop_node_nodetype.asp">여기</a>에서 확인할 수 있습니다.

Google Chrome DevTools Console을 통해 DOM 트리를 시각화할 수 있습니다. 이 도구는 DOM 요소들의 계층 구조를 각 DOM 요소의 프로퍼티와 함께 보여줍니다.
   
자바스크립트는 DOM이 무엇인지 이해하지 못합니다. <ins><b>DOM은 자바스크립트의 명세가 아닙니다.</b></ins>
> <i>DOM is not part of the JavaScript specification.</i>

DOM은 브라우저가 제공하는 고수준의 Web API입니다. DOM을 통해 웹페이지를 효율적으로 렌더링할 수 있으며, 개발자는 다양한 목적을 위해 공개적으로 노출된 DOM 요소를 동적으로 조작할 수 있습니다.

> 💡 DOM API를 사용하면 개발자는 HTML 요소들을 추가하거나 삭제할 수 있고 이것의 모습을 바꾸거나 이벤트 핸들러에 바인딩할 수 있습니다. 
> DOM API를 사용하면 렌더링된 DOM 트리에 영향을 주지않고 HTML 요소를 생성하거나 메모리에서 복제하고 조작할 수 있습니다. 개발자는 이것을 통해 풍부한 UX(사용자 경험)를 제공하는 매우 동적인 웹 페이지를 제작할 수 있습니다.

### CSS Object Model (CSSOM)
웹 디자인을 하는 의도가 무엇일까요? 최대한 보기 좋은 웹사이트를 만들기 위해서입니다. 우리는 HTML 요소에 몇가지 스타일(<i>style</i>)을 넣어 그것을 실현합니다. 
HTML 페이지에서 우리는 CSS를 사용해서