import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key : 'persist-key',
    storage 
}

const persistedReducer = persistReducer(persistConfig,reducer) 

const store = createStore(
    persistedReducer,
    compose( applyMiddleware(thunk), 
    typeof window === 'object' && 
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
        window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

const persistor = persistStore(store)
export default store
export {persistor}
