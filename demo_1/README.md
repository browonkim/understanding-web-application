#Inline Styles via element.style

이것은 JS를 이용해서 CSS 속성과 값을 정의하는 쉬운 방법입니다.

하지만 이런 방식으로 `style`속성을 사용할 경우 크게 주의해야 할 점이 있습니다.

이것은 오직 요소의 인라인 스타일에만 적용됩니다. 

이것은 CSS를 읽기 위해 `style`속성을 사용할 때 명확해집니다.

```javascript
document.body.style.backgroundColor = 'lightblue';
console.log(document.body.style.backgroundColor);
// "lightblue"
```
위의 예에서 `<body>`요소에 인라인 스타일을 정의한 다음 콘솔에 이것을 띄웁니다.

좋아요.

하지만 해당 요소의 다른 속성을 읽으려고 하면 아무것도 반환하지 않습니다. - 
이전에 CSS 또는 JavaScript의 다른 위치에서 해당 요소에 대한 인라인 스타일을 정의하지 않은 한 말이죠!

예를 들어보겠습니다. 

```javascript
console.log(document.body.style.color);
// Return nothing if inline style doesn't exist
```
이것은 아무것도 반환하지 않습니다. `<body>`요소에 `color`속성을 정의한 외부 스타일시트가 있어도 아무것도 반환하지 않습니다. 
즉, `element.style`은 오직 인라인 스타일만 읽을 수 있습니다. 

`element.style`을 쓰는 것은 자바스크립트로 요소에 스타일을 추가하는 가장 간단하고 가장 일반적인 방법입니다.

하지만 여러분이 보셨듯이 이것은 중요한 한계를 분명히 가지고 있으므로 JS로 스타일을 읽고 조작하는 유용한 몇가지 기술을 살펴보겠습니다.

