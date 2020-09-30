import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/sapp/themeOneDiscoverSection";

class DiscoverSection extends Component {
    state = {
        data: {},
        discoverData: [],
        discoverIcon: []
    }
    componentDidMount() {
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    discoverData: res.data.discoverData,
                    discoverIcon: res.data.discoverIcon
                })
                // console.log(this.state.data)
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <section className="section discover-area bg-gray overflow-hidden ptb_100">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-lg-6 order-2 order-lg-1">
                            {/* Discover Thumb */}
                            <div className="mx-auto pt-5 pt-lg-0">
                                <img style={{width: '100%'}} src='https://firebasestorage.googleapis.com/v0/b/finding-spaces-73b23.appspot.com/o/websiteimages%2Fhouseonhillwithsign.png?alt=media&token=555a5ec5-c0dc-49b4-a0b1-484adc7034ab' alt="" />
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 order-1 order-lg-2">
                            {/* Discover Text */}
                            <div className="discover-text pt-4 pt-lg-0">
                                <h2 className="pb-4 pb-sm-0 font-weight-bold">{'BUYING WITH FINDING SPACES'}</h2>
                                <p className="d-none d-sm-block pt-3 pb-4 ">Finding Spaces also helps buyers buy properties without any assistance. Buying directly from a seller can save you thousands of dollars!
</p>
                                {/* Check List */}
                                <ul className="check-list">

                                    <div >
                                        <li className="py-2">
                                            {/* List Box */}
                                            <div className="list-box media">
                                                <span className="icon align-self-center"></span>
                                                <span className="media-body pl-2">
                                                    <h5>Request Finding Spaces Property Code</h5>
                                                    <p>You will need the property’s 5 digit code to get more information, schedule a showing or make an offer.
</p>
                                                </span>

                                            </div>
                                        </li>
                                    </div>
                                    <div >
                                        <li className="py-2">
                                            {/* List Box */}
                                            <div className="list-box media">
                                                <span className="icon align-self-center"></span>
                                                <span className="media-body pl-2">
                                                    <h5>Tour Home
</h5>
                                                    <p>The sellers available hours for tours will be listed on their listing page. Schedule a time that works best for you to check out the property.
</p>
                                                </span>

                                            </div>
                                        </li>
                                    </div>
                                    <div >
                                        <li className="py-2">
                                            {/* List Box */}
                                            <div className="list-box media">
                                                <span className="icon align-self-center"></span>
                                                <span className="media-body pl-2">
                                                    <h5>Negotiate Offer</h5>
                                                    <p>Use our simple intuitive platform to make and negotiate terms of your purchase agreement.

</p>
                                                </span>

                                            </div>
                                        </li>
                                    </div>
                                    <div >
                                        <li className="py-2">
                                            {/* List Box */}
                                            <div className="list-box media">
                                                <span className="icon align-self-center"></span>
                                                <span className="media-body pl-2">
                                                    <h5>Complete Sales Contract</h5>
                                                    <p>A free purchase agreement (drafted by and reviewed by attorneys in Arizona and meeting all the requirements of a binding contract) will be drafted from the terms you and the buyer agreed on. Once completed and signed we will send to the title company of your choice.</p>
                                                </span>

                                            </div>
                                        </li>
                                    </div>
                                    <div >
                                        <li className="py-2">
                                            {/* List Box */}
                                            <div className="list-box media">
                                                <span className="icon align-self-center"></span>
                                                <span className="media-body pl-2">
                                                    <h5>Closing</h5>
                                                    <p>Once all of the terms of the purchase agreement are fulfilled, it's time for closing! Finding Spaces will make sure you know what to do to prepare for your big day!

</p>
                                                </span>

                                            </div>
                                        </li>
                                    </div>

                                </ul>
                                {/* <div className="icon-box d-flex mt-3">
                                    {this.state.discoverIcon.map((item, idx) => {
                                        return (
                                            <div key={`il_${idx}`} className="service-icon pr-3">
                                                <span><i className={item.iconClass} /></span>
                                            </div>
                                        );
                                    })}
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default DiscoverSection;