import {createStore,applyMiddleware,combineReducer} from "./redux/index";
import infoReducer from './reducer/infoReduce';
import countReducer from './reducer/countReducer';
import timeMiddleware from './middleware/timeMiddleware';
import loggerMiddleware from './middleware/loggerMiddleware';
import exceptionMiddleware from './middleware/exceptionMiddleware';
const reducer = combineReducer({
    counter:countReducer,
    info:infoReducer,
});
const applyMiddlewares = applyMiddleware(exceptionMiddleware,timeMiddleware,loggerMiddleware);
const store = createStore(reducer,applyMiddlewares);
store.subscribe(() => {
    let state = store.getState();
    console.log(state.counter.count, state.info.name, state.info.description);
})
/*自增*/
store.dispatch({
    type: 'INCREMENT'
});

