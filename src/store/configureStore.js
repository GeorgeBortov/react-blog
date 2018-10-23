import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import postsReducer from '../reducers/posts';
import filtersReducer from '../reducers/filters';
import modalReducer from '../reducers/modal';
import loaderReducer from '../reducers/loader';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            posts: postsReducer,
            filters: filtersReducer,
            modal: modalReducer,
            loader: loaderReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};