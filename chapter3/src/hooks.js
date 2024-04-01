// debounce 처리를 해주는 함수를 하나 만듭니다.
function debounceOneFrame(fn) {
  let currentRequestIndex = -1;

  return (...args) => {
    // 실행할 함수가 1frame 이내로 다시 실행되면, 취소하고
    cancelAnimationFrame(currentRequestIndex);

    // 다시 1frame 후에 실행하도록 만듭니다.
    currentRequestIndex = requestAnimationFrame(() => fn(...args));
  };
}

export function createHooks(callback) {
  // callback을 debounce로 감싸서 사용합니다.
  const debounceCallback = debounceOneFrame(callback);

  const stateContext = {
    current: 0,
    states: [],
  };

  const memoContext = {
    current: 0,
    memos: [],
  };

  function resetContext() {
    stateContext.current = 0;
    memoContext.current = 0;
  }

  const useState = (initState) => {
    const { current, states } = stateContext;
    stateContext.current += 1;

    states[current] = states[current] ?? initState;

    const setState = (newState) => {
      if (newState === states[current]) return;
      states[current] = newState;

      // setState는 여러번 실행될 수 있지만, callback 함수는 1frame 후에 실행되도록 합니다.
      // 1frame 이내에 callback이 호출될 경우, 실행을 취소합니다.
      debounceCallback();
    };

    return [states[current], setState];
  };

  const useMemo = (fn, refs) => {
    const { current, memos } = memoContext;
    memoContext.current += 1;

    const memo = memos[current];

    const resetAndReturn = () => {
      const value = fn();
      memos[current] = {
        value,
        refs,
      };
      return value;
    };

    if (!memo) {
      return resetAndReturn();
    }

    if (refs.length > 0 && memo.refs.find((v, k) => v !== refs[k])) {
      return resetAndReturn();
    }
    return memo.value;
  };

  return { useState, useMemo, resetContext };
}
