## 과제 A.

### 과제목표

`packages/chapter1/src/a.js`의 코드를 수정하여 Jest 테스트를 실행 했을 때 모두 통과(PASS)하도록 만들어주세요.

### 구현조건

1. 클래스를 이용해서 만들어진 `a_sample.js`와 동일한 로직으로 만들어주세요.
2. 프로토타입 기반으로 작성해주세요.
   ( `a_sample.js` 를 프로토타입으로 전환하는 문제라고 생각하시면 좋아요. )

### 결과화면

![결과이미지](https://github.com/ChyunKim/hanghae-plus-front1/assets/53160685/704b02a6-be0c-4ecd-b62b-990394d98100)

## 과제 B.

### 준비

1. 실행이 완료된 후, 브라우저(크롬)에서 `http://localhost:8000/b.html` 로 접속하면 UI를 확인할 수 있어요.
2. Hard Work 버튼을 클릭 했을 때, 잠시 로딩이 멈추는 것을 볼 수 있습니다.

### 과제목표

`packages/chapter1/src/b.js`에서 `[HardWork]` 클래스가 정의되어 있는 것을 볼 수 있습니다. `[HardWork]`클래스의 `do()` 메서드를 개선하여 **버튼을 클릭 했을 때 로딩이 멈추지 않도록 합니다.** 그리고 순차적으로 연산되는 결과가 지속적으로 화면에 노출되도록 만듭니다.

- **완료된 데모영상 보기 👈**
  ![b_object.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/83c75a39-3aba-4ba4-a792-7aefe4b07895/e07f3d25-1f81-48ba-9666-37e37f04ea7a/b_object.gif)

### 구현조건

1. 정의된 메서드 중 `do()` 메서드만 수정가능 합니다. (추가적인 메서드를 정의하는 것도 가능)
2. `async/await` 문법을 사용할 수 없습니다.
3. task가 순차적으로 실행되어야 합니다. (반드시 이전 task가 완료되고 다음 task가 실행)
