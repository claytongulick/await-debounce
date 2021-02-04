# Easiest debouncer on the planet
You can't throw a lead brick through github without hitting about 50 debouncers, so why another one?

- I like await syntax
- I'm not super keen on having to wrap functions.
- A lot of the time I start without debouncing and want to add it later as an optimization without a rewrite

So, introducing the simplest debouncer around!

if(!await debounce("some unique name", 500)) return;

That's it.

You just add that to any async function you have, and it'll debounce it for you - in this case, after 500ms.

The first parameter is a unique string. It can be anything, but sanity would suggest using a dotted path to your function name, like "someClass.someInputHandler". Just make it unique so you don't collide anywhere else. Honestly, this probably doesn't matter too much
since you're unlikely to have a bunch of debounced functions on the same screen, but just do it to be safe.

The second param is the timeout in ms.

The debounce() function resolves to a boolean, indicating whether the function should proceed or not.

## Installation
`npm install --save await-debouncer`

## Usage
```javascript
import debouncer from 'await-debouncer';

async function onlyDoThisOnceEvery500ms() {
    if(!await debounce("onlyDoThisOnceEvery500ms", 500)) return;

    //do lots of other Very Important Things
    ...
}
```

### NodeJS usage
There's isn't any reason why this couldn't be used in node, it's just written using es6 module syntax, so you'll want to watch that.

### Morbid details
Behind the scenes a doctionary is created with a bunch of setTimeout keys, and a bunch of promises. When debounce() is called, the
timeout is cleared and reset if it exists, and any previous call's promise is resolved with false, short circuiting the caller.

When the current invocation's timeout is expired, the current promise is resolved with the value true, allowing the caller to proceed.

It's only about 10 meaningful lines of code, take a look.