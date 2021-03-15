let callback = () => console.log("Regular timeout callback has run");

let urgentCallback = () => console.log("*** Oh noes! An urgent callback has run!");

let doWork = () => {
  let result = 1;

  queueMicrotask(urgentCallback);

  for (let i=2; i<=10; i++) {
    result *= i;
  }
  return result;
};

console.log("Main program started");
setTimeout(callback, 0);
console.log(`10! equals ${doWork()}`);
console.log("Main program exiting");