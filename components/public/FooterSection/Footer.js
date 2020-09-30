import React, { Component } from 'react';
import axios from 'axios';

const BASE_URL = "https://my-json-server.typicode.com/themeland/json-server-1/themeOneFooterSection";

class FooterSection extends Component {
    state = {
        data: {},
        iconList: [],
        footerList_1: [],
        footerList_2: [],
        footerList_3: []
    }
    componentDidMount() {
        axios.get(`${BASE_URL}`)
            .then(res => {
                this.setState({
                    data: res.data,
                    iconList: res.data.iconList,
                    footerList_1: res.data.footerList_1,
                    footerList_2: res.data.footerList_2,
                    footerList_3: res.data.footerList_3
                })
                // console.log(this.state.data)
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div >
                <div className=" d-none d-lg-block" />
                <footer className="footer-area footer-fixed">

                    {/* Footer Bottom */}
                    <div className="footer-bottom">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    {/* Copyright Area */}
                                    <div className="d-flex flex-wrap justify-content-center justify-content-sm-end text-center pb-4">
                                        {/* Copyright Left */}
                                        <div className="text-muted">© Copyrights 2020 Finding Spaces</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default FooterSection;