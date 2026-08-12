const fs = require("fs");
const path = require("path");

const block1 = () => {
  // Part 1 -> 1 4 3 2
  console.log("1");
  setTimeout(() => console.log("2"), 0);
  Promise.resolve().then(() => console.log("3"));
  console.log("4");
};

const block2 = () => {
  // Part 2 -> 5 8 6 7
  console.log("5");
  process.nextTick(() => console.log("6"));
  Promise.resolve().then(() => console.log("7"));
  console.log("8");
};

const block3 = () => {
  // Part 3 -> 10 9
  setTimeout(() => console.log("9"), 0);
  setImmediate(() => console.log("10"));
};

const block4 = () => {
  // Part 4 -> 11 15 12 14 13
  console.log("11");
  Promise.resolve().then(() => {
    console.log("12");
    Promise.resolve().then(() => console.log("13"));
  });
  Promise.resolve().then(() => console.log("14"));
  console.log("15");
};

/*
    sync code
    nexttick
    promise
    setimmediate
    settimeout

*/

const block5 = () => {
  // Part 5 -> 16 20 17.1 17.2 18 19
  console.log("16");
  let i = 0;
  function fun() {
    i++;
    if (i < 3) {
      console.log(`17.${i}`);
      Promise.resolve().then(fun);
    } else {
      console.log("18");
    }
  }
  Promise.resolve().then(fun);
  setTimeout(() => console.log("19"), 0);
  console.log("20");
};

