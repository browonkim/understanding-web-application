# Advanced ECMAScript

# 1. This : The context of _"this"_

많은 프로그래밍 언어에서 `this`란 일반적으로 객체 자기 자신을 가리키는 키워드입니다.

```java
// java
class Student {
    private String name;

    public Student(String name) {
        this.name = name;
    }
}
```

Python 에서는 따로 키워드가 존재하지는 않지만 일반적으로 `self`라고 지칭합니다.

JavaScript 에서는 함수도 객체이며 함수 안에서 `this`키워드 사용이 가능합니다.   
함수의 `this`가 가리키는 것은 함수를 호출한 방법에 따라 달라질 수 있습니다.

### 전역 문맥

global context 에서 `this`는 <b>strict mode</b>와 상관없이 전역 객체를 참조합니다.

```javascript
// 웹 브라우저에서는 window가 전역 객체입니다. 
console.log(this === window);   // true
a = 37;
console.log(window.a);  // 37
this.b = "MDN";
console.log(window.b);  // "MDN"
console.log(b); // "MDN"
```

### globalThis
`globalThis` 키워드는 전역 `this`값을 가진 전역 객체를 반환합니다.   
restrict mode 에서 함수 안에서도요!

```javascript
function canMakeHTTPRequest() {
    return typeof globalThis.XMLHttpRequest === 'function';
}

console.log(canMakeHTTPRequest());  //true 
```

JavaScript 이 실행 되는 환경은 여러개가 있을 수 있습니다.    
가장 많이 쓰이는 환경인 웹 런타임 (브라우저) 에서 전역 객체는 `window`, `self`, `frames` 가 있습니다.   
Web Worker 에서는 `self` 만 동작합니다.   
Node.js 에서는 아무것도 쓸 수 없고, `global`을 사용헤야 합니다.

non-restrict mode 에서는 함수 내부에서 `this`를 사용할 수 있습니다.   
하지만 모듈이나 restrict mode 에서 함수 내부의 `this`는 `undefined`를 가르키는 문제가 있습니다.

[JS modules]()   
[JS Restrict Mode]()

[`Function('return this')()`]()  을 사용하는 방법도 있지만 브라우저의 Content Security Policy(CSP)로 `eval()` 을 사용할 수 없는 상황에서는
해당 `Function` 방식은 불가능합니다.

`globalThis` 속성은 환경에 무관하게 전역 `this`값, 즉 전역 객체에 접근하는 표준 방법을 제공합니다.   
`window`, `self`등과 다르게 browser/non-browser 맥락 모두에서 동작을 보장합니다.   
따라서 코드를 구동하는 환경을 모르더라도 전역 객체이 일관적으로 접근할 수 있습니다.

#### HTML and WindowProxy

많은 JavaScript 엔진에서 `globalThis`는 실제 전역 객체를 가르킬 것이지만, 웹 브라우저는 `<iframe>`과 교차 창 보안 문제로 인해 전역 객체를 감싼 `Proxy`를 대신 가리키고 실제
객체에는 직접 접근할 수 없습니다.   
일반적인 사용에는 차이가 없다고 봐도 무방하지만, 알아두는 것이 중요합니다.

`globalThis` 없이 현재 환경의 전역 객체를 가져오는 방법 중 유일하게 믿을 만한 방법은 `Function('return this')()`입니다.   
그러나 이 방법은 일부 환경에서 CSP를 위반할 수 있습니다.   
따라서 다음 검사를 수행합니다. 
```javascript
var getGlobal = function () {
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
};
var globals = getGlobal();
if (typeof globals.setTimeout !== 'function'){
    // no setTimeout in this environment!
}
```
`globalThis`를 사용할 수 있으면 환경별 전역 객체 검사는 더이상 필요하지 않습니다.
```javascript
if (typeof globalThis.setTimeout !== 'function'){
    // no setTimeout in this environment!
}
```
