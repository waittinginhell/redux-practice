
function counterReducer(state,action) {
    let initState = {
        count:0,
    };
    if(!state){
        state = initState
    }
    if(action.type){
        switch (action.type) {
            case 'INCREMENT':
                return {
                    ...state,
                    count: state.count + 1
                };
            case 'DECREMENT':
                return {
                    ...state,
                    count: state.count - 1
                };
            default:
                return state;
        }
    }else{
        return state
    }

}
