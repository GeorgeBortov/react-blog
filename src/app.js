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
// import moment from 'moment';

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
    // Adding dummy data into firebase
    // var i = 0;
    // while( i <= 1000 ) {
    //     firebase.database().ref('posts').push({
    //         postID: i,
    //         authorID: 'yWOxc7JkuSVpV8Oi27vnwES5lXg2',
    //         authorName: `Георгий Бортов ${i}`,
    //         body: '<p><strong>Lorem ipsum</strong> dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis\n    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n<p><u>Lorem ipsum</u> dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi <u>ut</u> aliquip ex ea commodo consequat. Duis aute irure\n    dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
    //         createdAt: moment(0).add(i, 'days').valueOf(),
    //         title: `test title ${i}`
    //     });
    //     console.log(i);
    //     i++;
    // }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));


firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        store.dispatch(login(user.uid, user.displayName, user.email));
        store.dispatch(setResetFilter());
        store.dispatch(startSetPosts(0, 10)).then(() => {
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/');
            }
        });
    } else {
        store.dispatch(logout());
        store.dispatch(setResetFilter());
        store.dispatch(startSetPosts(0, 10)).then(() => {
            renderApp();
            // history.push('/login');
        });
        
    }
});