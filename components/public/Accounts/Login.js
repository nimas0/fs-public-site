import React, { Component } from 'react';
import Header from '../HeaderSection/Header';

const initData = {
    heading: "Welcome back!",
    content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum.",
    formHeading: "Sign In",
    formContent: "Fill all fields so we can get some info about you. We'll never send you spam",
    formText: "Don't have an account?",
    btnText: "Sign In",
    btnText_2: "Sign Up"
}

class Login extends Component {
    state = {
        initData: []
    }
    componentDidMount(){
        this.setState({
            initData: initData
        })
    }
    render() {
        return (
            <div className="homepage-5 accounts inner-pages">
                <div className="main">
                    <Header imageData={"/img/logo-white.png"} />
                    <section id="home" className="section welcome-area h-100vh bg-overlay d-flex align-items-center">
                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                                {/* Welcome Intro Start */}
                                <div className="col-12 col-lg-7">
                                    <div className="welcome-intro">
                                        <h1 className="text-white">{this.state.initData.heading}</h1>
                                        <p className="text-white my-4">{this.state.initData.content}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-md-8 col-lg-5">
                                    {/* Contact Box */}
                                    <div className="contact-box bg-white text-center rounded p-4 p-sm-5 mt-5 mt-lg-0 shadow-lg">
                                        {/* Contact Form */}
                                        <form id="contact-form">
                                            <div className="contact-top">
                                                <h3 className="contact-title">{this.state.initData.formHeading}</h3>
                                                <h5 className="text-secondary fw-3 py-3">{this.state.initData.formContent}</h5>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-envelope-open" /></span>
                                                            </div>
                                                            <input type="email" className="form-control" name="email" placeholder="Email" required="required" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-unlock-alt" /></span>
                                                            </div>
                                                            <input type="password" className="form-control" name="password" placeholder="Password" required="required" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-bordered w-100 mt-3 mt-sm-4" type="submit">{this.state.initData.btnText}</button>
                                                    <div className="contact-bottom">
                                                        <span className="d-inline-block mt-3">By signing up, you accept our <a href="/#">Terms</a> &amp; <a href="/#">Privacy Policy</a></span>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <span className="d-block pt-2 mt-4 border-top">{this.state.initData.formText} <a href="/Signup">{this.state.initData.btnText_2}</a></span>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Shape Bottom */}
                        <div className="shape-bottom">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                            <path className="shape-fill" fill="#FFFFFF" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7  c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4  c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z" />
                            </svg>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Login;