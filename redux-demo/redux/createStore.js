export default function createStore(reducer,initState,rewriteCreateStoreFunc){
    if(typeof initState === 'function'){
        rewriteCreateStoreFunc = initState;
        initState = undefined;
    }
    if(rewriteCreateStoreFunc){
        let newCreateStore = rewriteCreateStoreFunc(createStore);
        return newCreateStore(reducer,initState)
    }
    let state = initState;
    let listeners = [];
    //订阅
    function subscribe(listener) {
         listener.push(listener);
         return function () {
            let index = listeners.indexOf(listener);
            listeners.splice(index,1)
         }
    }
    //触发行为
    function dispatch(action) {
        state = reducer(action,state);
        for (let i = 0; i < listeners.length; i++){
            const listener = listeners[i];
            listener()
        }
    }
    //获得State
    function getState() {
        return state;
    }
    //添加新的数据到state中
    function replaceReduce(nextReducer) {
        reducer = nextReducer;
        dispatch({type:Symbol()})
    }
    dispatch({type: Symbol()});
    return {
        replaceReduce,
        subscribe,
        dispatch,
        getState,
    }
}
