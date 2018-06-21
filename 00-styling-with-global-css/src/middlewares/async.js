export default function({ dispatch }) {

    // ES6
    return next => action => {
        console.log(action);

        // move on to the next middleware if action has no payload or if there's no promise to resolve (no then property exists)
        if(!action.payload || !action.payload.then){
            return next(action);
        }

        console.log('We have a promise', action);
        // Make sure the actions's promise resolves
        action.payload
            // ES6
            .then(response => {
                // create a new action with the old type, but
                // replace the promise in payload parameter with the response data
                const newAction = { ...action, payload: response };

                // and send the new action to all middlewares again
                dispatch(newAction);
            });

            // ES5
            // .then(function(response){
            //     // create a new action with the old type, but
            //     // replace the promise in payload parameter with the response data
            //     const newAction = { ...action, payload: response };
            //
            //     // and send the new action to all middlewares again
            //     dispatch(newAction);
            // });

    };

    // ES5
    // return function(next){
    //     return function(action){
    //         console.log(action);
    //
    //         // next means: send this action on to the next middleware in the stack
    //         // if there is no more in the stack, forward it to the reducers
    //         next(action);
    //     };
    // };

}