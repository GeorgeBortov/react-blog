import moment from 'moment';

export default [{
    id: '1',
    authorID: 'thisismytestuid',
    authorName: 'George Bortov',
    body: '<p><strong>Lorem ipsum</strong> dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Dui saute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> <p><u>Lorem ipsum</u> dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi <u>ut</u> aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
    createdAt: 0,
    title: 'test title 1'

}, {
    id: '2',
    authorID: 'thisismytestuid',
    authorName: 'John Doe',
    body: 'test post body 2',
    createdAt: moment(0).subtract(4, 'days').valueOf(),
    title: 'test title 2'
}, {
    id: '3',
    authorID: 'thisismytestuid',
    authorName: 'George Bortov',
    body: 'test post body 3',
    createdAt: moment(0).add(4, 'days').valueOf(),
    title: 'test title 3'
}];