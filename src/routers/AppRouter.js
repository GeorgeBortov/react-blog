import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import AddPost from '../components/AddPost';
import EditPost from '../components/EditPost';
import SinglePost from '../components/SinglePost';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();
 
const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={DashboardPage} exact={true} />
                <PublicRoute path="/login" component={LoginPage} />
                <PrivateRoute path="/create" component={AddPost} />
                <PrivateRoute path="/edit/:id" component={EditPost} />
                <Route path="/read/:id" component={SinglePost} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;