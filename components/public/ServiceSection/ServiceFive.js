import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const BASE_URL = "https://my-json-server.typicode.com/themeland/sapp/themeOneServiceSection";

class ServiceSection extends Component {
    render() {
        return (
            <section className="section testimonial-area ptb_100 mt-5 mb-5">
                <div className="container text-center mt-5">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-md-10 col-lg-10">
                            <div className="testimonials owl-carousel">
                                {/* Single Testimonial */}

                                      </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ServiceSection;