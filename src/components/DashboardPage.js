import React from 'react';
import Header from './Header';
import BlogFilters from './BlogFilters';
import BlogList from './BlogList';
const DashboardPage = () => (
    <div>
        <Header />
        <BlogFilters />
        <BlogList />
    </div>
);

export default DashboardPage;