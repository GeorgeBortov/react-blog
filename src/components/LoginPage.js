import React from 'react';
import { connect } from 'react-redux';
import { startRegisterUser, startEmailLogin, startGoogleLogin, sendResetLink, authWithNewAccount } from '../actions/auth';
import ConfirmAuthModal from './ConfirmAuthModal';
import { openModal, closeModal } from '../actions/modal';

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: props.email ? props.email : '',
            pass: props.pass ? props.pass : '',
            emailReset: props.emailReset ? props.emailReset : ''
        };
    };
    
    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    loginWithEmail = (e) => {
        e.preventDefault();
        this.props.startEmailLogin(this.state.email, this.state.pass);
    };
    regWithEmail = (e) => {
        e.preventDefault();
        this.props.startRegisterUser(this.state.email, this.state.pass)
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    this.props.openModal();
                }
                throw error;
            });
    };
    addNewAccount = () => {
        this.props.closeModal();
        this.props.authWithNewAccount(this.state.email, this.state.pass);
    }
    resetPass = (e) => {
        e.preventDefault();
        this.props.sendResetLink(this.state.emailReset);
    };
    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box box-layout--login">
                    <h1 className="box-layout__title">Log In</h1>
                    <button className="button" onClick={this.props.startGoogleLogin}>Via Google Account</button>
                    <div>or</div>
                    <form>
                        <div>
                            <label>Email Address</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="email"
                                value={this.state.email}
                                onChange={this.onInputChange}
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                name="pass"
                                value={this.state.pass}
                                autoComplete="off"
                                onChange={this.onInputChange}
                            />
                        </div>
                        <div>
                            <button className="button" onClick={this.loginWithEmail}>
                                Login with Email
                            </button>
                        </div>
                        <div>
                            <button className="button" onClick={this.regWithEmail}>
                                Registrate with Email
                            </button>
                        </div>
                        <div>
                            Forgot password?

                            Please provide the email address you would like a password reset link sent to.
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="text"
                                name="emailReset"
                                placeholder="email"
                                value={this.state.emailReset}
                                onChange={this.onInputChange}
                            />
                        </div>
                        <div>
                            <button className="button" onClick={this.resetPass}>
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
                <ConfirmAuthModal
                    isOpen={this.props.modalStatus}
                    onRequestClose={this.props.closeModal}
                    addNewAccount={this.addNewAccount}
                />
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    startRegisterUser: (email, password) => dispatch(startRegisterUser(email, password)),
    startEmailLogin: (email, password) => dispatch(startEmailLogin(email, password)),
    startGoogleLogin: () => dispatch(startGoogleLogin()),
    sendResetLink: (email) => dispatch(sendResetLink(email)),
    authWithNewAccount: (email, password) => dispatch(authWithNewAccount(email, password)),
    openModal: () => dispatch(openModal()),
    closeModal: () => dispatch(closeModal())
});

const mapStateToProps = (state, props) => ({  
    modalStatus: state.modal.modalIsOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);