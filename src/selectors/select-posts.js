// Get visible expenses not done yet

export default (posts, filters) => {
    return posts.filter((post) => {
        const textMatch = post.title.toLowerCase().includes(filters.title.toLowerCase());
        const autorMatch = post.authorID.includes(filters.authorID);
        return textMatch && autorMatch;
    }).sort((a, b) => {
        if(filters.sortBy === 'dateASC') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if(filters.sortBy === 'dateDESC') {
            return a.createdAt < b.createdAt ? -1 : 1
        }
    });
};