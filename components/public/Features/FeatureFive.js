import React, { Component } from 'react';

const initData = {
    heading: "Express Functionality",
    headingText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    headingTexttwo: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati."
}

const data = [
    {
        image: "/img/featured_image_1.png",
        title: "Fully functional",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos."
    },
    {
        image: "/img/featured_image_2.png",
        title: "Live Chat",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos."
    },
    {
        image: "/img/featured_image_3.png",
        title: "Secure Data",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos."
    },
    {
        image: "/img/featured_image_4.png",
        title: "Easy to Customize",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos."
    },
    {
        image: "/img/featured_image_5.png",
        title: "Responsive Design",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos."
    },
    {
        image: "/img/featured_image_6.png",
        title: "Help Documentation",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis culpa expedita dignissimos."
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
            <section id="features" className="section features-area style-two overflow-hidden ptb_100">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-10 col-lg-6">
                            {/* Section Heading */}
                            <div className="section-heading">
                                {/* <span className="d-inline-block rounded-pill shadow-sm fw-5 px-4 py-2 mb-3">
                                    <i className="far fa-lightbulb text-primary mr-1" />
                                    <span className="text-primary">{this.state.initData.preHeading}</span>
                                    {this.state.initData.preHeadingspan}
                                </span> */}
                                <h2>{this.state.initData.heading}</h2>
                                <p className="d-none d-sm-block mt-4">{this.state.initData.headingText}</p>
                                <p className="d-block d-sm-none mt-4">{this.state.initData.headingTexttwo}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.data.map((item, idx) => {
                            return (
                                <div key={`ffd_${idx}`} className="col-12 col-md-6 col-lg-4 my-3 res-margin">
                                    {/* Image Box */}
                                    <div className="image-box text-center icon-1 p-5">
                                        {/* Featured Image */}
                                        <div className="featured-img mb-3">
                                            <img className="avatar-sm" src={item.image} alt="" />
                                        </div>
                                        {/* Icon Text */}
                                        <div className="icon-text">
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