let applyMiddleware = function (...middlewares) {
    //返回一个重写createStore的方法
    return function rewriteCreateStoreFunc(oldCreateStore) {
        //返回重写后新的createStore
       return function newCreateStore(reducer,initState){
           const store = oldCreateStore(reducer,initState);
           const simpleStore = {getState:store.getState()};
           //给每个middleware传下store
           const chain = middlewares.map(item=> item(simpleStore));
           let dispatch = store.dispatch;
           chain.reverse().map(middleware =>{
               dispatch = middleware(dispatch);
           });
           store.dispatch = dispatch;
           return store;

        }
    }
}
