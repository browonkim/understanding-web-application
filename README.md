# Learning React
## Why react?
리액트를 사용하기 앞서, 어떻게 사용자의 브라우저가 웹 페이지를 렌더링 하는지를 이해할 필요가 있습니다.

<!--
추가 예정: 리액트의 가상 DOM과 Diff 알고리즘과 정책 이해하기
이것이 왜 효율적인지 이해하기. AJAX도 이해하기. Asynchronous Javascript and xml
Vue.js 와 Angular에 대해 간단하게 비교-정리하기 
리액트의 불편한 점, Javascript의 불편한 점 이야기하기. 
새로운 언어: Dart에 대해 소개하고 Dart:html, Dart:javascript, Dart:UI 이해하기 
새로운 프레임워크: Flutter에 대해 이해하기.
프론트엔드의 문제를 해결하는 접근법 (프레임워크에 독립적인), 일반적인 방법에 대해 이야기하기
-->
## Understand Rendering in Browser
* [DOM TREE 이해하기](#understand-dom)
* [CSSOM TREE 이해하기](#css-object-model-cssom)
* [Render TREE 이해하기](#render-tree)
* [Render 순서 이해하기]()
* [브라우저에서 Rendering 하는 과정 이해하기]()

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
HTML 페이지에서 우리는 CSS(Cascade Style Sheet)를 사용해서 HTML 요소에 스타일을 갖춰줍니다. 
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors">CSS selector</a>를 사용해서 DOM요소를 지정하고 요소의 `color`나 `font-size`같은 스타일 프로퍼티의 값을 설정할 수 있습니다.

HTML요소에 스타일을 적용시키는 방법은 여러가지가 있습니다.
1. 외부 CSS 파일 사용하기 - (<i>external CSS file</i>)
2. `<style>`태그를 사용해서 내장 CSS 사용하기 - (<i>embedded CSS</i>)
3. HTML 요소의 `style`속성을 통해 인라인으로 스타일 적용하기
4. JavaScript 활용하기

어떠한 방법을 쓰든 결과적으로 브라우저는 DOM 요소에 CSS 스타일을 적용하기 위해 무거운 작업을 해야합니다.
   
앞서 제시한 HTML 예제에 아래의 CSS 스타일을 적용시켜보겠습니다.
이해를 쉽게 하기 위해서, 어떻게 HTML 페이지에서 CSS 스타일을 가져올 것인가는 신경쓰지 않겠습니다.
```css
html {
    padding: 0;
    margin: 0;
}
body {
    font-size: 10px;
}
.container{
    width: 300px;
    height: 300px;
    color: black;
}
.container > h1{
    color: gray
}
.container > p{
    font-size: 8px;
    display: none;
}
```
DOM을 생성한 후 브라우저는 외부, 내장형, 인라인, user-agent 등 모든 소스에서 CSS를 읽고 <ins><b><a href="https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model">CSSOM</a></b></ins>을 생성합니다.
CSSOM(CSS Object Model)도 DOM과 같이 Tree 구조입니다. 

CSSOM 트리의 각 노드는 CSS 스타일 정보를 가지고 있습니다. 이 스타일 정보들은 selector(지시자)에 의해 명시된 타겟 DOM 요소에 적용될 것입니다.
단, CSSOM은 `<meta>`, `<script>`, `<title>`등과 같이 화면에 출력되지 않을 DOM 요소에 대한것은 포함하고 있지 않습니다. 

대부분의 브라우저는 **user-agent stylesheet**라고 부르는 자신만의 스타일시트를 가지고 있습니다. 

브라우저는 먼저 개발자가 제공한 프로퍼티들을 <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity">specificity 규칙</a>을 사용해서 user-agent styles를 오버라이딩(재정의)합니다.
그렇게 해서 DOM요소에 대한 최종 CSS 프로퍼티를 계산합니다. 그리고 노드를 생성합니다. 

HTML 요소에 대해 특정 CSS 프로퍼티(예를들어, `display`같은)가 개발자나 브라우저에 의해 정의되어 있지 않다면, 그 속성값은 <a href="https://www.w3schools.com/cssref/css_default_values.asp">W3C CSS 표준</a>에 의해 명시된 기본값으로 설정됩니다. 
CSS 속성의 기본값을 선택하는 동안 속성이 <a href="https://www.w3.org/TR/CSS1/#inheritance">W3C문서</a>에서 명시한대로 상속 자격이 있을 경우 일부 상속 규칙이 적용될 수 있습니다.

예를 들어, 특정 HTML요소에 대해 `color`와 `font-size`속성 값이 누락된 경우 부모의 값을 상속합니다. 따라서 HTML 요소와 그것을 상속하는 모든 자식들은 이러한 속성들을 가지고 있다고 생각할 수 있습니다.   

이러한 과정을 <b>cascading of styles</b>라고 부르며 이것이 CSS가 <b>Cascading Style Sheet</b>인 이유입니다. 브라우저는 트리구조인 CSSOM을 생성함으로써 CSS cascading 규칙에 따라 스타일을 계산할 수 있습니다.

> 💡 Chrome DevTools Console의 Elements 패널을 통해 HTML 요소의 계산된 스타일을 볼 수 있습니다. (computed style)
> 왼쪽 패널에서 아무 HTML 요소를 선택한 후 오른쪽 패널의 computed 탭을 클릭하면 됩니다.

앞서 보여준 CSS 예제의 CSSOM 트리를 아래의 다이어그램으로 시각화 할 수 있습니다. 간단하게 이해하기 위해, user-agent 스타일은 무시하고 예제의 CSS style에만 집중하겠습니다.
[이미지 추가]()
<!-- # TODO ) 이미지 추가하기 -->
다이어그램에서 볼 수 있듯이, 우리의 CSSOM 트리는 화면에 표시되지 않을 `<link>`, `<title>`, `<script>`와 같은 요소들은 포함하고 있지 않습니다. 
빨간색으로 표시된 CSS 프로퍼티 값은 위에서 cascade된 값이며 회색으로 표시된 값은 상속받은 값을 재정의(override)한 것입니다.

###Render Tree
앞서 우리는 HTML 요소들을 노드로 가지는 DOM Tree와 각 HTML 요소에 대한 Style 속성 집합을 노드로 가지는 CSSOM Tree에 대해 살펴봤습니다.
