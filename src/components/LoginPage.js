import React from 'react';
import { connect } from 'react-redux';
import { 
    startRegisterUser,
    startEmailLogin,
    startGoogleLogin,
    sendResetLink,
    authWithNewAccount
} from '../actions/auth';
import ConfirmAuthModal from './ConfirmAuthModal';
import ModalInfo from './ModalInfo';
import { openModal, closeModal } from '../actions/modal';

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this._toggleDiv = this._toggleDiv.bind(this)
        this.state = {
            email: props.email ? props.email : '',
            pass: props.pass ? props.pass : '',
            emailReset: props.emailReset ? props.emailReset : ''
        };
    };

    _toggleDiv() {
        $(this.refs['toggle-div']).slideToggle();
    }

    onInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    addNewAccount = () => {
        this.props.closeModal();
        this.props.authWithNewAccount(this.state.email, this.state.pass);
    }
    loginWithEmail = (e) => {
        e.preventDefault();
        this.props.startEmailLogin(this.state.email, this.state.pass)
            .catch(error => {
                // console.log(error.code);
                if (!this.state.email || !this.state.pass) {
                    this.setState(() => ({
                        emailError: !this.state.email && 'Please provide an email',
                        passwordError: !this.state.pass && 'Please provide a password',
                        emailResetError: undefined,
                        userOrPasswordError: undefined
                    }));
                } else {
                    if (error.code === 'auth/invalid-email') {
                        this.setState(() => ({
                            emailError: 'Please provide a valid email address',
                            emailResetError: undefined,
                            passwordError: undefined,
                            userOrPasswordError: undefined
                        }));
                    }
                    if (error.code === 'auth/user-not-found') {
                        this.setState(() => ({
                            userOrPasswordError: 'The email you\'ve entered doesn\'t match any account',
                            emailError: undefined,
                            emailResetError: undefined,
                            passwordError: undefined
                        }));
                    }
                    if (error.code === 'auth/wrong-password') {
                        this.setState(() => ({
                            userOrPasswordError: 'Email or password is incorrect',
                            emailError: undefined,
                            emailResetError: undefined,
                            passwordError: undefined
                        }));
                    }
                }
            });
    };
    regWithEmail = (e) => {
        e.preventDefault();
        this.props.startRegisterUser(this.state.email, this.state.pass)
            .catch(error => {
                // console.log(error.code);
                if (!this.state.email || !this.state.pass) {
                    this.setState(() => ({
                        emailError: !this.state.email && 'Please provide an email',
                        passwordError: !this.state.pass && 'Please provide a password',
                        emailResetError: undefined,
                        userOrPasswordError: undefined
                    }));
                } else {
                    if (error.code === 'auth/invalid-email') {
                        this.setState(() => ({
                            emailError: 'Please provide a valid email address',
                            emailResetError: undefined,
                            passwordError: undefined,
                            userOrPasswordError: undefined
                        }));
                    }
                    if (error.code === 'auth/weak-password') {
                        this.setState(() => ({
                            passwordError: 'Password should be at least 6 characters',
                            emailError: undefined,
                            emailResetError: undefined,
                            userOrPasswordError: undefined
                        }));
                    }
                    if (error.code === 'auth/email-already-in-use') {
                        this.props.openModal();
                    }
                }
            });
    };
    resetPass = (e) => {
        e.preventDefault();
        this.props.sendResetLink(this.state.emailReset)
            .then(() => {
                this.setState(() => ({
                    userOrPasswordError: undefined,
                    emailResetError: undefined,
                    emailError: undefined,
                    passwordError: undefined,
                    email: '',
                    pass: '',
                    emailReset: '',
                    modalIsOpenInfo: true
                }));
            })
            .catch(error => {
                // console.log(error.code);
                if (!this.state.emailReset) {
                    this.setState(() => ({
                        emailError: undefined,
                        emailResetError: !this.state.emailReset && 'Please provide an email',
                        passwordError: undefined,
                        userOrPasswordError: undefined
                    }));
                } else {
                    if (error.code === 'auth/invalid-email') {
                        this.setState(() => ({
                            emailResetError: 'Please provide a valid email address',
                            emailError: undefined,
                            passwordError: undefined,
                            userOrPasswordError: undefined
                        }));
                    }
                    if (error.code === 'auth/user-not-found') {
                        this.setState(() => ({
                            userOrPasswordError: 'The email you\'ve entered doesn\'t match any account',
                            emailResetError: undefined,
                            emailError: undefined,
                            passwordError: undefined
                        }));
                    }
                }
            });
    };

    closeInfoModal = (e) => {
        this.setState(() => ({
            modalIsOpenInfo: false
        }));
    };

    render() {
        return (
            <div className="box-layout">
                <div className="box-layout__box box-layout--login">
                    <h1 className="box-layout__title">Log In</h1>
                    <button className="button button--google-login" onClick={this.props.startGoogleLogin}>
                        <span className="button--soc-icon">
                            <img src="/images/google-ico.png" />
                        </span>
                        <span>
                            Login with Google
                        </span>
                    </button>
                    <div className="box-layout__divider">or</div>
                    <form>
                        <div className={!this.state.userOrPasswordError ? "form-group total" : "form-group error total"}>
                            <span className="error-message total">{this.state.userOrPasswordError}</span>
                        </div>
                        <div className={!this.state.emailError ? "form-group" : "form-group error"}>
                            <input
                                type="text"
                                className={this.state.email.length > 0 ? "form-control edited" : 'form-control'}
                                name="email"
                                autoComplete="off"
                                value={this.state.email}
                                onChange={this.onInputChange}
                            />
                            <label>Email Address</label>
                            <span className="error-message">{this.state.emailError}</span>
                        </div>
                        <div className={!this.state.passwordError ? "form-group" : "form-group error"}>
                            <input
                                type="password"
                                name="pass"
                                className={this.state.pass.length > 0 ? "form-control edited" : 'form-control'}
                                value={this.state.pass}
                                autoComplete="off"
                                onChange={this.onInputChange}
                            />
                            <label>Password</label>
                            <span className="error-message">{this.state.passwordError}</span>
                        </div>
                        <div>
                            <button className="button button--login-email" onClick={this.loginWithEmail}>
                                <span className="button--soc-icon">
                                    <svg aria-hidden="true" data-prefix="fas" data-icon="at" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z"></path></svg>
                                </span>
                                <span>
                                    Login with Email
                                </span>
                            </button>
                        </div>
                        <div>
                            <button className="button button--reg-email" onClick={this.regWithEmail}>
                                <span className="button--soc-icon">
                                    <svg aria-hidden="true" data-prefix="fas" data-icon="at" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z"></path></svg>
                                </span>
                                <span>
                                    Registrate with Email
                                </span>
                            </button>
                        </div>
                        <div className="my-collapsible">
                            <a className="button button--link" onClick={this._toggleDiv}>Forgot password?</a>
                            <div className="toggle-div" ref="toggle-div">
                                Please provide the email address you would like a password reset link sent to.
                                <div className={!this.state.emailResetError ? "form-group" : "form-group error"}>
                                    <input
                                        type="text"
                                        className={this.state.emailReset.length > 0 ? "form-control edited" : 'form-control'}
                                        name="emailReset"
                                        autoComplete="off"
                                        value={this.state.emailReset}
                                        onChange={this.onInputChange}
                                    />
                                    <label>Email Address</label>
                                    <span className="error-message">{this.state.emailResetError}</span>
                                </div>
                                <div>
                                    <button className="button button--resetPass" onClick={this.resetPass}>
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <ConfirmAuthModal
                    isOpen={this.props.modalStatusConfirm}
                    onRequestClose={this.props.closeModal}
                    addNewAccount={this.addNewAccount}
                />
                <ModalInfo
                    isOpen={this.state.modalIsOpenInfo}
                    onRequestClose={this.closeInfoModal}
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
    modalStatusConfirm: state.modal.modalIsOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);