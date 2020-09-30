import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
const initData = {
    heading: "Pay a real estate agent... Why?",
    subheading: "You have all the same tools they use.",
    content: "",
    btnText: "LEARN MORE",
    formHeading: "SELL YOUR HOME FOR FREE",
    formText: "The platform and features are free to sign up.  Other items, such as yard signs and photography, are available for purchase.",
    formBtn: "GET STARTED",
    formBtnText: "By signing up, you accept our",
    formBtnText_2: "Terms",
    formBtnText_3: "Privacy Policy"
}

class HeroSection extends Component {
    state = {
        data: {}
    }
    componentDidMount() {
        this.setState({
            data: initData
        })
    }
    render() {
        return (
            <>
                <div></div>
                <section id="home" className=" mt-5 section welcome-area bg-overlay d-flex align-items-start">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            {/* Welcome Intro Start */}
                            <div className="col-12 col-lg-7">
                                <div className="welcome-intro">
                                    <p className=" text-dark my-4">{this.state.data.content}</p>
                                    <h4 className="text-dark">{this.state.data.heading}</h4>
                                    <h1 className="text-dark font-weight-bold">{this.state.data.subheading}</h1>

                                    {/* Store Buttons */}
                                    {/* <div className="button-group store-buttons d-flex">
                                    <a href="/#" className="btn btnnn sApp-btnnn text-uppercase p-3">{this.state.data.btnText}</a>
                                </div> */}
                                </div>
                            </div>
                            <div className="col-12 col-md-8 col-lg-5">
                                {/* Contact Box */}
                                <div style={{boxShadow: 'inset 4px 4px 30px #bdbdbd'}} className=" contact-box bg-white text-center rounded p-2 p-sm-5 mt-5 mt-lg-0">
                                    {/* Contact Form */}
                                    <form id="contact-form">
                                        <div className="contact-top">
                                            <h5 className="contact-title">{this.state.data.formHeading}</h5>
                                            <h5 className="text-secondary fw-3 py-2">{this.state.data.formText}</h5>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                {/* <div className="form-group">
                                                <input type="text" className="form-control" name="name" placeholder="Name" required="required" />
                                            </div>
                                            <div className="form-group">
                                                <input type="email" className="form-control" name="email" placeholder="Email" required="required" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="phone" placeholder="Phone" required="required" />
                                            </div> */}
                                            </div>
                                            <div className="col-12">
                                                <Button className="btn btn-bordered w-100 mt-3 mt-sm-4 p-3" href='http://localhost:3001/showings'>{this.state.data.formBtn}</Button>
                                                <div className="contact-bottom">
                                                    <span className="d-inline-block mt-3">{this.state.data.formBtnText} <a href="/#">{this.state.data.formBtnText_2}</a> &amp; <a href="/#">{this.state.data.formBtnText_3}</a></span>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <p className="form-message" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Shape Bottom */}
                    <div className="shape-bottom">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                            <path className="shape-fill" fill="#F5F5F5" d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7  c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4  c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z" />
                        </svg>
                    </div>
                </section>
            </>
        );
    }
}

export default HeroSection;