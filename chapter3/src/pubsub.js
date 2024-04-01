let 구독자 = null;

export const 구독 = (fn) => {
  구독자 = fn;
  fn();
  구독자 = null;
};

// Object.defineProperty 를 사용하는 경우
export const 발행기관 = (obj) => {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key];

    const 구독자들 = new Set();

    Object.defineProperty(obj, key, {
      get() {
        // 객체의 특정 key 값이 구독 함수내에서 사용될 경우, 해당 함수를 추가합니다.
        if (구독자) 구독자들.add(구독자);
        return _value;
      },

      set(value) {
        // 발행 기관에 변화가 생길 경우, 구독자에게 알립니다.
        // 값이 변하지 않은 경우에는 구독자에게 알리지 않습니다.
        if (_value === value) {
          return;
        }
        _value = value;
        구독자들.forEach((구독) => 구독());
      },
    });
  });
  return obj;
};

// Proxy를 사용하는 경우
// export const 발행기관 = (obj) => {
//   const observerMap = {};

//   return new Proxy(obj, {
//     get(target, name) {
//       observerMap[name] = observerMap[name] || new Set();
//       if (currentObserver) observerMap[name].add(currentObserver);
//       return target[name];
//     },
//     set(target, name, value) {
//       if (target[name] === value) return true;
//       target[name] = value;
//       observerMap[name].forEach((fn) => fn());
//       return true;
//     },
//   });
// };
