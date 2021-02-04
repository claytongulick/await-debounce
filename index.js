/**
 * Super simple utility to debounce a function
 */
let debouncers = {};
let resolvers = {};

function debounce(name, timeout) {
    if(debouncers[name]) 
        clearTimeout(debouncers[name]);

    debouncers[name] = setTimeout(() => {
        let resolve = resolvers[name];
        delete resolvers[name];
        resolve(true);
    }, timeout);

    if(resolvers[name]) 
        resolvers[name](false);

    return new Promise( (resolve) => { resolvers[name] = resolve; });
}

export default debounce;