function getInfo(info, init) {
  return info ?? init;
}

function JuniorEngineer(health) {
  this._health = health;
}

const juniorEngineer = new JuniorEngineer();

// Inline caching과 hidden class 적용
juniorEngineer._health = getInfo(juniorEngineer._health, 10);
juniorEngineer._intelligence = getInfo(juniorEngineer._intelligence, 1);
juniorEngineer._isBornGenius = getInfo(juniorEngineer._intelligence > 10, false);

JuniorEngineer.prototype.isBornGenius = function () {
  return juniorEngineer._isBornGenius;
};

JuniorEngineer.prototype.work = function () {
  juniorEngineer._health--; // Worker의 work 메서드를 호출하지 않고 직접 구현
  juniorEngineer._intelligence++; // intelligence 증가
};

function main() {
  var startTime = performance.now();
  for (var i = 0; i < 10000000; i++) {
    new JuniorEngineer(10, Math.floor(Math.random() * 20)).isBornGenius();
  }
  var endTime = performance.now();

  console.log(endTime - startTime);
}

main();

export { JuniorEngineer };
