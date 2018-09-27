import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import postsReducer from '../reducers/posts';
import modalReducer from '../reducers/modal';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            posts: postsReducer,
            modal: modalReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};