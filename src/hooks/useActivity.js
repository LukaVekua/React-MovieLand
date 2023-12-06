import { useReducer } from "react"
function reducer(state, action) {
    switch (action.active) {
        case 'latest': {
            if (!state.byLatest) return {
                byLatest: true,
                byYear: false,
                byAlphabet: false
            }
            return {
                ...state,
                byLatest: false
            }
        }
        case 'year': {
            if (!state.byYear) return {
                ...state,
                byLatest: false,
                byYear: true
            }
            return {
                ...state,
                byYear: false
            }
        }
        case 'alphabet': {
            if (!state.byAlphabet) return {
                ...state,
                byLatest: false,
                byAlphabet: true
            }
            return {
                ...state,
                byAlphabet: false
            }
        }
    }
}
const initialState = {
    byLatest: false,
    byYear: false,
    byAlphabet: false
}
const useActivity = () => {
    const [actives, dispatchActives] = useReducer(reducer, initialState)
    return { actives, dispatchActives }

}
export default useActivity