import agentList from '../../jsonData.json'

const FETCH_AGENT_LIST = 'FETCH_AGENT_LIST'
const SET_AGENT_LIST = 'SET_AGENT_LIST'

function fetchAgentList() {
    return{
        type: FETCH_AGENT_LIST,
    }
}

function setNewAgentList(currentAgentList) {
    return{
        type: SET_AGENT_LIST,
        currentAgentList: currentAgentList,
    }
}

export function getMoreAgent() {
    return function (dispatch, store) {
        let agentInfo = store().agentInfoStore;
        let newAgentList = agentInfo.currentAgentList.concat(agentInfo.agentList.splice(0, 50))
        return dispatch(setNewAgentList(newAgentList))  
    }
}

const initialState = {
    isFetching: false,
    error: '',
    currentAgentList: agentList.splice(0, 50),
    agentList: agentList,
}

export default function agentInfoStore(state = initialState, action){
    switch(action.type){
        case FETCH_AGENT_LIST:
            return{
                ...state,
                isFetching: true
            }
        case SET_AGENT_LIST:
            return{
                ...state,
                currentAgentList: action.currentAgentList,
            }
       
        default :
            return state
    }
}
