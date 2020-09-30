import React, { Component } from 'react';
import { faUserPlus, faGraduationCap, faTasks, faFileSignature, faComments, faHandsHelping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const initData = {
    heading: "SELL YOUR HOME",
    headingText: "Finding Spaces provides the tools and professional guidance for you to list your property, negotiate offers and manage tasks through closing, all online. ",
    headingTexttwo: "All legal documents needed for the process are included for FREE!"
}

const data = [
    {
        icon: faUserPlus,
        title: "Sign up",
        content: "Create a listing website in under 5 minutes. Upon creation, a unique property code gets assigned to the home. Potential buyers need this code to search for your website, book a showing, or make offers."
    },
    {
        icon: faGraduationCap,
        title: "Preparation",
        content: "Finding Spaces provides optional real estate services, such as photography, yard signs, inspections, appraisals, etc. to make sure your home gets fully prepared for the selling process."
    },
    {
        icon: faTasks,
        title: "Task Management",
        content: "The property dashboard will walk you through every step from start to finish of the selling process, while also providing helpful tips along the way."
    },
    {
        icon: faComments,
        title: "Negotiate offers",
        content: "After visiting FindingSpaces.com, buyers can access your property page by typing the 5-digit code. Once on the property page, the buyer can submit offers. You can counter, negotiate, and accept offers on your property dashboard. "
    },
    {
        icon: faFileSignature,
        title: "Professional Sales Contract",
        content: "A free purchase agreement (drafted by and reviewed by attorneys in Arizona and meet all the requirements of a binding contract) will be provided for completion. Once completed and signed we will send to the title company selected by you and the buyer. Once completed and signed we will send to the title company selected by you and the buyer."
    },
    {
        icon: faHandsHelping,
        title: "Closing",
        content: "Once all of the terms of the purchase agreement are fulfilled, it's time for closing! Finding Spaces will make sure you know what to do to prepare for your big day!"

    }
]

class FeatureSection extends Component {
    state = {
        initData: {},
        data: []
    }
    componentDidMount() {
        this.setState({
            initData: initData,
            data: data
        })
    }
    render() {
        return (
            <section id="features" className="section mb-0 features-area style-two overflow-hidden ptb_100">
                <div className="container ">
                    <div className="d-flex justify-content-center row">
                        <div className="col-12 col-md-10 col-lg-10">
                            {/* Section Heading */}
                            <div className="my-5">
                                {/* <span className="d-inline-block rounded-pill shadow-sm fw-5 px-4 py-2 mb-3">
                                    <i className="far fa-lightbulb text-primary mr-1" />
                                    <span className="text-primary">{this.state.initData.preHeading}</span>
                                    {this.state.initData.preHeadingspan}
                                </span> */}
                                <h1 className='d-flex justify-content-center text-dark font-weight-bold'>{this.state.initData.heading}</h1>
                                <h5 className='pt-2 text-center' >{this.state.initData.headingText}</h5>
                                {/* <h4 className='text-center' >{this.state.initData.headingTexttwo}</h4> */}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.data.map((item, idx) => {
                            return (
                                <div key={`ffd_${idx}`} className="col-12 col-md-6 col-lg-4 my-4 res-margin">
                                    {/* Image Box */}
                                    <div className="image-box text-center icon-1 p-5">
                                        {/* Featured Image */}
                                        <div className="featured-img mb-3 text-primary">
                                            {/* <img className="avatar-sm" src={item.image} alt="" /> */}
                                            <FontAwesomeIcon size='2x' color='text-primary' icon={item.icon} />
                                        </div>
                                        {/* Icon Text */}
                                        <div className="icon-text ">
                                            <h3 className="mb-2">{item.title}</h3>
                                            <p>{item.content}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <style jsx>{`
                                        
                                        /* ******************************
                    :: 10.0 FEATURES AREA CSS
                    ****************************** */
                    .features-slider-wrapper {
                    padding: 67px 23px 90px 26px;
                    background-size: 100%;
                    max-width: 290px;
                    margin: 0 auto;
                    }

                    .features-area.style-two .image-box {
                    position: relative;
                    -webkit-box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.12);
                    box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.12);
                    border-radius: 1.5rem;
                    -webkit-transition: -webkit-transform 0.3s ease 0s;
                    transition: -webkit-transform 0.3s ease 0s;
                    transition: transform 0.3s ease 0s;
                    transition: transform 0.3s ease 0s, -webkit-transform 0.3s ease 0s;
                    }

                    .features-area.style-two .image-box:hover {
                    -webkit-transform: translateY(-10px);
                    transform: translateY(-10px);
                    -webkit-box-shadow: 0 1rem 3rem rgba(31, 45, 61, 0.125) !important;
                    box-shadow: 0 1rem 3rem rgba(31, 45, 61, 0.125) !important;
                    }
                                        
                    `}</style>
            </section>
        );
    }
}

export default FeatureSection;