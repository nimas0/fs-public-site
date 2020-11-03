import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronUp,
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faCheck
} from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap';
const BASE_URL = "https://my-json-server.typicode.com/themeland/sapp/themeOneWorkSection";

class Work extends Component {
    state = {
        data: {},
        workData: []
    }
    componentDidMount() {
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    workData: res.data.workData
                })
                // console.log(this.state.data)
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <section className="section work-area bg-overlay overflow-hidden pb-5 mb-3">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-9">
                            {/* Work Content */}
                            <div className=" text-center">
                                {/* <h2 className="text-primary font-weight-bold text-uppercase">Buy and Sell Real Estate Effortlessly </h2> */}
                                <img className='d-flex justify-content-center' src='\img\floatingNeighborhood.png' />
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-12 col-md-4">
                            {/* Single Work */}
                            <div className="text-center p-3">
                                <div className="text-primary font-weight-bold work-icon">
                                    <FontAwesomeIcon size='lg' icon={faCheck} />
                                </div>
                                <h3 className="text-primary font-weight-bold py-2">Save Money</h3>
                                <p className="text-dark">4-6% is what most real estate agents charge for their services.</p>
                                <p className="text-dark">Selling yourself cost absolutely nothing
</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            {/* Single Work */}
                            <div className=" text-center p-3">
                                {/* Work Icon */}
                                <div className="font-weight-bold text-primary work-icon">
                                    <FontAwesomeIcon size='lg' icon={faCheck} />
                                </div>
                                <h3 className="text-primary py-4 font-weight-bold">Work In Your Best Interest
</h3>
                                <p className="text-dark">Real estate agents aren’t always incentivized to work in your best interest. Finding an agent that is loyal and you can trust can be like finding a needle and a haystack.
</p>

                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            {/* Single Work */}
                            <div className=" text-center p-2">
                                {/* Work Icon */}
                                <div className="font-weight-bold text-primary work-icon">
                                    <FontAwesomeIcon size='lg' icon={faCheck} />
                                </div>
                                <h3 className="font-weight-bold text-primary py-3">Be Your Own Boss</h3>
                                <p className="text-dark">You know yourself and your home better than anyone
</p>
                                <p className="text-dark">Controlling the process means doing it your way
</p>
                            </div>
                        </div>

                        <div className="container text-center">
                            <div className="row justify-content-center align-items-center">
                                <div className=" p-1 ">
                                    {/* Client Name */}
                                    <div className="col-12">
                                        {/* <img style={{ width: '35%' }} src='https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/websiteimages%2FFamily%20sitting%20under%20roof.png?alt=media&token=7655c85c-9152-409b-891c-f086af4e0779' className="mx-auto" alt="" />
                                        <img style={{ width: '45%' }} src='https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/logo%20idea-2-transparent.png?alt=media&token=0bc11614-2775-4c8c-8052-c897afb2b336' className="mx-auto" alt="" /> */}



                                        {/* <h6 className='pt-4'>The platform and features are free to sign up. Other items, such as yard signs and photography, are available for purchase.</h6> */}

                                        <Button className="font-weight-bold text-uppercase card-default btn shadow w-100 p-3 mt-sm-4" href='http://localhost:3001/showings'>GET STARTED FOR FREE TODAY</Button>
                                    </div>
          
                                    <div className='mt-5'>
                                        <div className='d-inline font-weight-bold m-2'>
                                            Email: <h6 className='d-inline  m-2'>support@findingspaces.com</h6>
                                        </div>
                                        {/* <div className='d-inline font-weight-bold m-2'>
                                            Call: <h6 className='d-inline  m-2'>1-800-700-0000</h6>
                                        </div> */}
                                    </div>

                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Work;