Running Multiple Promises Efficiently When Order Doesn't Matter
If you have multiple promises and you want to wait until they've all completed before doing something else, but you don't care what order the promises run/complete in, you can use the following syntax:

```
async function() {
  await Promise.all([promise1, promise2, promise3, promise4])
  // JavaScript will wait until ALL of the promises have completed
  console.log("All promises completed. Do something interesting now.")
}
```

There's no guarantee which one will finish first, but in situations where the ordering of actions isn't important this will definitely be the fastest way to handle things, as now the promises aren't blocking each other; they will all begin working at the same time (or within a few milliseconds of each other) and will complete as soon as possible (regardless or order).

Enjoy!
Brad