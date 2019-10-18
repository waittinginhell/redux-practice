export default function applyMiddleware(...middlewares) {
    //返回一个重写createStore方法
    return function rewriteCreateStoreFun(oldCreateStore) {
        //返回重写后新的createStore
        return function newCreateStore(reducer,initState) {
            //生成store
            let store = oldCreateStore(reducer,initState);
            //对每个middleware进行传state，相当于 const logger = loggerMiddleware(store)
            const chain = middlewares.map(middleware => middleware(store));
            //
            let dispatch = store.dispatch;
            //实现exception(time((logger(dispatch))))
            chain.reverse().map(middleware => dispatch = middleware(dispatch));
            //重写dispatch
            store.dispatch = dispatch;
            return store;
        }
    }
}
