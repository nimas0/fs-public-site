import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/sapp/themeOneServiceSection";

class ServiceSection extends Component {
    state = {
        data: {},
        serviceData: []
    }
    componentDidMount(){
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    serviceData: res.data.serviceData
                })
                // console.log(this.state.data)
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <section className="section service-area bg-gray overflow-hidden ptb_100">
                <div className="container">
                    <div className="row justify-content-between">
                    <div className="col-12 col-lg-6 order-2 order-lg-1">
                        {/* Service Text */}
                        <div className="service-text pt-4 pt-lg-0">
                        <h2 className="text-capitalize mb-4">{this.state.data.heading}</h2>
                        {/* Service List */}
                        <ul className="service-list">
                            {this.state.serviceData.map((item, idx) => {
                                return(
                                    <div key={`so_${idx}`}>
                                        {/* Single Service */}
                                        <li className="single-service media py-2">
                                            <div className="service-icon pr-4">
                                                <span><i className={item.iconClass} /></span>
                                            </div>
                                            <div className="service-text media-body">
                                                <p>{item.text}</p>
                                            </div>
                                        </li>
                                    </div>
                                );
                            })}
                        </ul>
                        <a href="/#" className="btn btn-bordered mt-4">{this.state.data.buttonText}</a>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 order-1 order-lg-2 d-none d-lg-block">
                        {/* Service Thumb */}
                        <div className="service-thumb mx-auto">
                        <img src={this.state.data.thumbOne} alt="" />
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ServiceSection;