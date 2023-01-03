const redux = require('redux')
const produce = require('immer').produce

const initialState = {
    name: 'Tom',
    address: {
        street: '123 Main St',
        city: 'New York',
        state: 'CA',
    },
}

const STREET_UPDATED = 'STREET UPDATED'
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            /* return {
                ...state,
                address: {
                    ...state.address,
                    street: action.payload,
                },
            } */
            // Immer translates the code above so its looks mutable even though it's a copy of the state that gets updated
            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
        default: {
            return state
        }
    }
}

const store = redux.createStore(reducer)
console.log('Initial State ', store.getState ())
const unsubscribe = store.subscribe(() => {
    console.log('Updated State', store.getState())
})
store.dispatch(updateStreet('457 Main St'))
unsubscribe()