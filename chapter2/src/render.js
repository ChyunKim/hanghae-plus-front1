// virtual Dom을 구성
export function jsx(type, props, ...children) {
  return {
    type,
    props: { ...props },
    children: [...children],
  };
}
// Babel은 JSX를 React.createElement() 호출로 컴파일
// react를 임포트 해야하는 이유도 이와 같음
export function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.type);

  for (let key in node.props) {
    if (key.startsWith('on') && typeof node.props[key] === 'function') {
      const eventType = key.substring(2).toLowerCase();
      element.addEventListener(eventType, node.props[key]);
    } else element.setAttribute(key, node.props[key]);
  }

  for (let child of node.children) {
    const childElement = createElement(child);
    element.appendChild(childElement);
  }

  return element;
}

function updateAttributes(target, newProps, oldProps) {
  // newProps들을 반복하여 각 속성과 값을 확인
  //   만약 oldProps에 같은 속성이 있고 값이 동일하다면
  //     다음 속성으로 넘어감 (변경 불필요)
  //   만약 위 조건에 해당하지 않는다면 (속성값이 다르거나 구속성에 없음)
  //     target에 해당 속성을 새 값으로 설정
  // oldProps을 반복하여 각 속성 확인
  //   만약 newProps들에 해당 속성이 존재한다면
  //     다음 속성으로 넘어감 (속성 유지 필요)
  //   만약 newProps들에 해당 속성이 존재하지 않는다면
  //     target에서 해당 속성을 제거

  for (let key in newProps) {
    if (newProps[key] !== oldProps[key]) {
      target.setAttribute(key, newProps[key]);
    }
  }

  for (let key in oldProps) {
    if (!(key in newProps)) {
      target.removeAttribute(key);
    }
  }
}

/**
  Reconciliation(재조정)이란, 앞으로 그려질 DOM과 그려지기 전 DOM의 부분을 비교해 달라진 부분을 찾아내 계산하는 과정 
  Diff 알고리즘은 아래와 같은 작업을 함.
  React Element의 타입(JSX 태그 종류) 비교
  타입이 동일할 경우 속성(attribute) 비교
  key 값 비교 재귀적으로 자식 Element 비교
 */
export function render(parent, newNode, oldNode, index = 0) {
  if (!newNode && oldNode) parent.removeChild(parent.childNodes[index]);
  else if (newNode && !oldNode) parent.appendChild(createElement(newNode));
  else if (
    typeof newNode !== typeof oldNode ||
    (typeof newNode === 'string' && newNode !== oldNode)
  ) {
    parent.replaceChild(createElement(newNode), parent.childNodes[index]);
  } else if (newNode.props) {
    updateAttributes(parent.childNodes[index], newNode.props, oldNode.props);

    const maxLength = Math.max(newNode.children.length, oldNode.children.length);
    for (let i = 0; i < maxLength; i++) {
      render(parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
    }
  }
}
