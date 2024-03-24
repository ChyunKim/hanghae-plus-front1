export function createHooks(callback) {
  // 클로저를 통해 해결
  // 클래스형 컴포넌트를 render() 메서드를 통해 상태 변경을 감지할 수 있지만 함수형 컴포넌트는 렌더링이 발생하면 함수 자체가 다시 호출됨
  // 상태를 관리하려면 함수가 다시 호출되었을때 이전 상태 기억해야함
  // 이문제를 클로저를 통해 해결
  // 클로저는 내부 함수에서 상위 함수 스코프의 변수에 접근할 수 있는 개념
  const hooks = [];
  let index = 0;

  const useState = (initState) => {
    const state = hooks[index] || initState;
    hooks[index] = state;
    const currentIndex = index;
    const setState = (value) => {
      hooks[currentIndex] = value;
      callback();
    };
    index++;

    return [state, setState];
  };

  const useMemo = (fn, refs) => {
    return fn();
  };

  const resetContext = () => {
    index = 0;
  };

  return { useState, useMemo, resetContext };
}
