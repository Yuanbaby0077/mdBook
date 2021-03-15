let callback = () => console.log('callback')
let urgentCallback = () => console.log('urgentCallback')

console.log('start')
setTimeout(callback, 0)
queueMicrotask(urgentCallback)
console.log('end')

// Note that the output logged from the main program body appears first, 
// followed by the output from the microtask, 
// followed by the timeout's callback. 
// That's because when the task that's handling the execution of the main program exits, 
// the microtask queue gets processed before the task queue on which the timeout callback is located. 
// Remembering that tasks and microtasks are kept on separate queues, 
// and that microtasks run first will help keep this straight.