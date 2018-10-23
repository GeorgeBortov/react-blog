// Link to autor source https://scotch.io/tutorials/build-custom-pagination-with-react
import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPage } from '../actions/filters';
const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
}

export class Pagination extends React.Component {

    constructor(props) {
        super(props);
        const { pageLimit = 30, pageNeighbours = 0 } = props;

        this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
        

        // pageNeighbours can be: 0, 1 or 2
        this.pageNeighbours = typeof pageNeighbours === 'number'
            ? Math.max(0, Math.min(pageNeighbours, 2))
            : 0;

        this.totalPages = Math.ceil(this.props.postTotalNumb / this.pageLimit);

        this.state = { 
            currentPage: props.currentPage,
        };
    }

    componentDidMount() {
        if(this.props.posts.length === 0) {
            this.gotoPage(1);
        } else {
            this.gotoPage(this.props.currentPage);
            this.totalPages = Math.ceil(this.props.postTotalNumb / this.pageLimit);
        }
        
    }

    componentDidUpdate(prevProps){
        if(prevProps.postTotalNumb !== this.props.postTotalNumb) {
            this.totalPages = Math.ceil(this.props.postTotalNumb / this.pageLimit);
            this.gotoPage(1);
        }
    }
    gotoPage = page => {
        const { onPageChanged = f => f } = this.props;

        const currentPage = Math.max(0, Math.min(page, this.totalPages));
        const paginationData = {
            currentPage,
            totalPages: this.totalPages,
            pageLimit: this.pageLimit
        };
        this.props.setCurrentPage(currentPage);
        this.setState({ currentPage }, () => onPageChanged(paginationData));
    }

    handleClick = page => evt => {
        evt.preventDefault();
        this.gotoPage(page);
    }

    handleMoveLeft = evt => {
        evt.preventDefault();
        this.gotoPage(this.state.currentPage - (this.pageNeighbours * 2) - 1);
    }

    handleMoveRight = evt => {
        evt.preventDefault();
        this.gotoPage(this.state.currentPage + (this.pageNeighbours * 2) + 1);
    }

    /**
     * Let's say we have 10 pages and we set pageNeighbours to 2
     * Given that the current page is 6
     * The pagination control will look like the following:
     *
     * (1) < {4 5} [6] {7 8} > (10)
     *
     * (x) => terminal pages: first and last page(always visible)
     * [x] => represents current page
     * {...x} => represents page neighbours
     */
    fetchPageNumbers = () => {

        const totalPages = this.totalPages;
        const currentPage = this.state.currentPage;
        const pageNeighbours = this.pageNeighbours;

        /**
         * totalNumbers: the total page numbers to show on the control
         * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
         */
        const totalNumbers = (this.pageNeighbours * 2) + 3;
        const totalBlocks = totalNumbers + 2;

        if (totalPages > totalBlocks) {

            const startPage = Math.max(2, currentPage - pageNeighbours);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

            let pages = range(startPage, endPage);

            /**
             * hasLeftSpill: has hidden pages to the left
             * hasRightSpill: has hidden pages to the right
             * spillOffset: number of hidden pages either to the left or to the right
             */
            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            switch (true) {
                // handle: (1) < {5 6} [7] {8 9} (10)
                case (hasLeftSpill && !hasRightSpill): {
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    pages = [LEFT_PAGE, ...extraPages, ...pages];
                    break;
                }

                // handle: (1) {2 3} [4] {5 6} > (10)
                case (!hasLeftSpill && hasRightSpill): {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, RIGHT_PAGE];
                    break;
                }

                // handle: (1) < {4 5} [6] {7 8} > (10)
                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                    break;
                }
            }

            return [1, ...pages, totalPages];

        }

        return range(1, totalPages);

    }

    render() {

        if (this.totalPages === 1) return null;

        const { currentPage } = this.state;
        const pages = this.fetchPageNumbers();

        return (
            <div>
                <nav aria-label="Countries Pagination">
                    <ul className="pagination">
                        {pages.map((page, index) => {

                            if (page === LEFT_PAGE) return (
                                <li key={index} className="page-item">
                                    <a className="page-link" href="#" aria-label="Previous" onClick={this.handleMoveLeft}>
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                            );

                            if (page === RIGHT_PAGE) return (
                                <li key={index} className="page-item">
                                    <a className="page-link" href="#" aria-label="Next" onClick={this.handleMoveRight}>
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            );

                            return (
                                <li key={index} className={`page-item${currentPage === page ? ' active' : ''}`}>
                                    <a className="page-link" href="#" onClick={this.handleClick(page)}>{page}</a>
                                </li>
                            );

                        })}

                    </ul>
                </nav>
            </div>
        );

    }
}

const mapDispatchToProps = (dispatch) => ({
    setCurrentPage: (currentPage) => dispatch(setCurrentPage(currentPage))
});
const mapStateToProps = (state) => ({
    posts: state.posts.postsArr,
    postTotalNumb: state.posts.postTotalNumb
});
const ConnectedPagination = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default ConnectedPagination;