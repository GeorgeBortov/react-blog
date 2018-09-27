import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout, isAuthenticated }) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard">
                    <h1>Blog</h1>
                </Link>
                {isAuthenticated ? 
                    <button id='logout' className="button button--link" onClick={startLogout}>Logout</button> 
                    : 
                    <Link id='login' className="button button--link" to="/login">
                        Login
                    </Link>
                }
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);