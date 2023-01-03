const redux = require('redux');
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'


function orderCake(qty = 1) {
  return {
    type: CAKE_ORDERED,
    payload: qty,
  }
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  }
}

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  }
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  }
}

const initialCakeState = {
    numberOfCakes: 10,
}

const initialIceCreamState = {
    numberOfIceCreams: 20,
}

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
              ...state,
              numberOfCakes: state.numberOfCakes - action.payload,
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes + action.payload
            }
        default:
            return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch(action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams - action.payload,
      }
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams + action.payload,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})

const store = createStore(rootReducer)
console.log('initial state', store.getState())

const unsubscribe = store.subscribe(() => console.log('updated state', store.getState()))

const actions = bindActionCreators({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch)
actions.orderCake(2)
actions.orderCake()
actions.orderCake(1)
actions.restockCake()

actions.orderIceCream(2)
actions.orderIceCream(3)
actions.orderIceCream(4)
actions.restockIceCream(10)

unsubscribe()