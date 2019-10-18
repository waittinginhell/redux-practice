let initState = {
    counter:{
        count:2
    },
    info:{
        name: '前端九部',
        description: '我们都是前端爱好者！'
    }
};
const reducer = combineReducer({
    counter:counterReducer,
    info:infoReducer,
});
let  createStore = function(reducer,initState){
    let data = initState;
    let listeners = [];
    //订阅
    function subscribe(listener) {
        listeners.push(listener)
    }
    function dispatch(action) {
        data = reducer(data,action);
        //通知
        for(let i = 0; i < listeners.length; i++){
            let listener = listeners[i];
            listener()
        }
    }
    function getState() {
        return data;
    }
    dispatch({type:Symbol()})
    return {
        getState,
        subscribe,
        dispatch
    }
};
let store = createStore(reducer,initState);
let next = store.dispatch;
let logger = loggerMiddleware(store);
let time = timeMiddleware(store);
let exception = exceptionMiddleware(store);
store.dispatch = exception(time(logger(next)));
store.subscribe(() =>{
    let state = store.getState();
    console.log(state.counter.count, state.info.name, state.info.description);
})
//console.dir(store.getState())
// store.subscribe(() => {
//     let state = store.getState();
//     console.log(state.counter.count, state.info.name, state.info.description);
// });
// /*自增*/
store.dispatch({
    type: 'INCREMENT'
});

// /*修改 name*/
// store.dispatch({
//     type: 'SET_NAME',
//     name: '前端九部2号'
// });
// store.subscribe(()=>{
//     let state = store.getState();
//     console.log(`${state.info.name}: ${state.info.description}`)
// });
// store.subscribe(()=>{
//     let state = store.getState();
//     console.log(`${state.counter.count}`)
// });
// store.dispatch({
//     ...store.getState(),
//     info: {
//         name: '前端九部',
//         description: '我们都是前端爱好者！'
//     }
// });
// store.dispatch({
//     ...store.getState(),
//     counter: {
//         count: 1
//     }
// });
// store.subscribe(() => {
//     let state = store.getState();
//     console.log(state.count)
// });
// store.dispatch({
//     count: store.getState().count+1
// });
// store.dispatch({
//     count: store.getState().count-1
// });
// store.dispatch({
//     count: '2222'
// })
//
// store.dispatch({type:'INCREMENT'});
// store.dispatch({type:'DECREMENT'});
// store.dispatch({count:'abx'});


