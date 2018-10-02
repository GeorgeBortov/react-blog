import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetPosts } from './actions/posts';
import { login, logout } from './actions/auth';
import { setResetFilter } from './actions/filters';
import 'normalize.css/normalize.css';
import 'jodit';
import 'jodit/build/jodit.min.css';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        store.dispatch(login(user.uid, user.displayName));
        store.dispatch(startSetPosts()).then(() => {
            store.dispatch(setResetFilter());
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/');
            }
        });
    } else {
        store.dispatch(logout());
        store.dispatch(startSetPosts()).then(() => {
            store.dispatch(setResetFilter());
            renderApp();
            // history.push('/login');
        });
        
    }
});