export default function combineReducer(reducers) {
    //reducerKeys = ['counter','info']
    let reducerKeys = Object.keys(reducers);
    //返回合并后的新的reducer函数
    return function combination(state={},action) {
        //生成新的state
        let nextState = {};
        //遍历执行所有的reducers，整合成为一个新的state
        for (let i = 0; i < reducerKeys.length; i++){
            let key = reducerKeys[i];
            let reducer = reducers[i];
            //之前的key的state
            let previousStateKeys = state[key];
            //执行reducer，获得新的state
            let nextState = reducer(previousStateKeys,action);
            nextState[key] = nextState;
        }
        return nextState;
    }
}
