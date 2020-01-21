function sum1() { 
  // debugger;
  let sum = 0;

  for (let i = 0; i < arguments.length; i++) {
    const element = arguments[i];
    sum += element;
  }

  return sum;
}

// console.log(sum1(1, 2, 3, 4) === 10);
// console.log(sum1(1, 2, 3, 4, 5) === 15);

//=====================================================================//

function sum2(...args) {
  let sum = 0;

  for (let i = 0; i < args.length; i++) {
    const element = args[i];
    sum += element;
  }

  return sum;
}

// console.log(sum2(1, 2, 3, 4) === 10);
// console.log(sum2(1, 2, 3, 4, 5) === 15);

//=====================================================================//

// Function.prototype.myBind = function (ctx, ...bindArgs) {
//   const that = this;

//   return (...callArgs) => {
//     return that.apply(ctx, bindArgs.concat(callArgs));
//   };
// };

Function.prototype.myBind = function () {
  const bindArgs = Array.from(arguments).slice(1);
  const ctx = arguments[0];
  const that = this;
  return function _func() {
    const callArgs = Array.from(arguments);
    return that.apply(ctx, bindArgs.concat(callArgs));
  };
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true

// // bind time args are "meow" and "Kush", no call time args
// markov.says.myBind(pavlov, "meow", "Kush")();
// // Pavlov says meow to Kush!
// // true

// // no bind time args (other than context), call time args are "meow" and "a tree"
// markov.says.myBind(pavlov)("meow", "a tree");
// // Pavlov says meow to a tree!
// // true

// // bind time arg is "meow", call time arg is "Markov"
// markov.says.myBind(pavlov, "meow")("Markov");
// // Pavlov says meow to Markov!
// // true

// // no bind time args (other than context), call time args are "meow" and "me"
// const notMarkovSays = markov.says.myBind(pavlov);
// notMarkovSays("meow", "me");
// // Pavlov says meow to me!
// // true

//=====================================================================//

function curriedSum(numArgs) {
  const numbers = [];

  return function _curriedSum(num) {
    numbers.push(num);

    if (numbers.length === numArgs) {
      return numbers.reduce((acc, el)  => acc + el);
    } else {
      return _curriedSum;
    }
  }
}

// const sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1)); // => 56

//=====================================================================//

// Function.prototype.curry = function(numArgs) {
//   const args = [];
//   const that = this;
//   return function _lemonCurry(arg) {
//     args.push(arg);

//     if (args.length === numArgs) {
//       args.forEach(el => that(el));
//     } else {
//       return _lemonCurry;
//     }
//   };
// };


Function.prototype.curry = function (numArgs) {
  const args = [];
  const that = this;
  return function _lemonCurry(arg) {
    args.push(arg);

    if (args.length === numArgs) {
      debugger
      return that.apply(null, args);
    } else {
      return _lemonCurry;
    }
  }
  // return _lemonCurry;
};


// Function.prototype.curry = function (numArgs) {
//   const args = [];
//   const that = this;
//   return function _lemonCurry(arg) {
//     args.push(arg);

//     if (args.length === numArgs) {
//       debugger
//       return that(...args);
//     } else {
//       return _lemonCurry;
//     }
//   }
//   // return _lemonCurry;
// };


const print = (...arg) => {
  console.log(...arg);
};
print.curry(3)('this is 1')('this is 2')('this is 3');


