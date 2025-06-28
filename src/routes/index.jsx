import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import SQLInjectionPage from '../pages/SQLInjection';

const AppRoutes = () => {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={SQLInjectionPage} />
        </Router>
    );
};

export default AppRoutes; 