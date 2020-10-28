import React, { Component } from 'react';
import axios from 'axios';



class FaqSection extends Component {
    state = {
        data: {
            "heading": "Frequently asked questions",
            "headingTwo": "Have questions? Look here",
            "headingText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
            "headingTexttwo": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati.",
            "faqText": "Haven't find suitable answer?",
            "faqTextLink": "Tell us what you need.",

        },
        faqData: [
            {
                "id": 1,
                "title": "Does Finding Spaces Use Real Estate Agents?",
                "content": "No. Finding Spaces allows buyers and sellers to work directly, online, without real estate agents."
            },
            {
                "id": 2,
                "title": "How Much Does It Cost To Use Finding Spaces?",
                "content": "Nothing! Finding Space’s dashboard is completely free for buyers and sellers. Addition real estate related tools and resources will be available for purchase"
            },
            {
                "id": 3,
                "title": "Does Finding Spaces Create A Real Estate Contract For Me?",
                "content": "No. A free purchase agreement (drafted by and reviewed by attorneys in Arizona and meeting all the requirements of a binding contract) will be provided for completion after the buyer and seller have agreed on terms."
            },
            {
                "id": 4,
                "title": "Does Finding Spaces Create A Real Estate Contract For Me?",
                "content": "No. A free purchase agreement (drafted by and reviewed by attorneys in Arizona and meeting all the requirements of a binding contract) will be provided for completion after the buyer and seller have agreed on terms."
            },
            {
                "id": 5,
                "title": "Is the Finding Spaces Contract A Legally Binding Document?",
                "content": "Yes. Our purchase agreement has been drafted by and reviewed by attorneys in Arizona and meeting all the requirements of a binding contract"
            },
            {
                "id": 7,
                "title": "What Services Does Finding Spaces Provide?",
                "content": "Finding Spaces provides a platform for buyers and sellers to complete the real estate process on their own. We’ll guide you through the process from start to finish. You’ll receive a personalized dashboard that walks the buyers and sellers through each step and provides real estate tools and resources along the way."
            },
            {
                "id": 8,
                "title": "What Is A Finding Spaces Property Code?",
                "content": "This is a unique code assigned to each property. Buyers must have this code to access a properties listing page where the buyer can communicate with the seller, schedule showings, and make offers. Finding Spaces yard signs display the code optimally"
            },
            {
                "id": 9,
                "title": "Do you need my credit card information?",
                "content": "Yes, Finding Spaces collects financial information for verification of its users and for optional purchases throughout the process."
            }
        ],
        faqDataTwo: [
            {
                "id": 1,
                "title": "What Does For Sale By Owner mean?",
                "content": "Buying or selling For Sale By Owner means no real estate agent is involved in the process, therefore, you don't have to pay a middle man for their services."
            },
            {
                "id": 2,
                "title": "Is For Sale By Owner Safe?",
                "content": "Finding Spaces provides the same safeguards as a real estate agent would offer. Our legal documents have been professionally drafted and reviewed by Arizona attorneys. The rest of the hard work is completed by a title/escrow company of your choice."
            },
            {
                "id": 3,
                "title": "What are the benefits of For Sale By Owner?",
                "content": "By cutting out the middleman you not only save thousands, but you are able to complete the process your way without any inconsistencies!"
            },

        ],
        faqDataThree: [
            {
                "id": 1,
                "title": "Does Finding Spaces Advertise My Home?",
                "content": "No, Finding Spaces will give you the tools and resources needed and provides tips on the best advertising and marketing practices."
            },
            {
                "id": 2,
                "title": "Why Finding Spaces?",
                "content": "It’s a completely free way to sell you home! Real estate agents do nothing that you can’t. We make it easy and non intimidating. Give it a try."
            },
            {
                "id": 3,
                "title": "What Prevents Unqualified Offers?",
                "content": "We require all buyers to submit a pre-approval before being able to book a showing or make an offer. The sellers will be able to if a buyer can bypass the approval process."
            },
            {
                "id": 4,
                "title": "How Do Buyers Submit Offers?",
                "content": "Sellers will give potential buyers their property code where buyers go to make “quick offers”. Quick offers are designed to get the buyer and seller to agree on the essential terms of an offer before filling out the purchase agreement. These are NOT binding agreements.  Finding Spaces will walk the buyer through our quick offer process. Once all terms are agreed on, a purchase agreement will be provided along with instructions on the next steps of the process."
            }
        ],
        faqDataFour: [
            {
                "id": 1,
                "title": "Can First Time Buyers Use Finding Spaces?",
                "content": "Yes! Buying a home without an agent saves buyers just as much money as it saves sellers. Homes for sale can be overpriced to compensate for agent commissions."
            },
            {
                "id": 2,
                "title": "How Do I Find A House?",
                "content": "Finding Spaces does not list properties. The best way to find a Finding Spaces listing is to search “for sale by owners” on zillow."
            },
            {
                "id": 3,
                "title": "How Do I Make An Offer?",
                "content": "When receiving a property code for a property, submit a pre-approval and get access to “quick offers”. Quick offers are designed to get the buyer and seller to agree on the essential terms of an offer before filling out the purchase agreement. These are NOT binding agreements.  Finding Spaces will walk the buyer through our quick offer process. Once all terms are agreed on, a purchase agreement will be provided along with instructions on the next steps of the process."
            },
            {
                "id": 4,
                "title": "How Do Buyers Submit Offers?",
                "content": "Finding Spaces is FREE for buyers."
            }
        ]
    }

    render() {
        return (
            <section className="section faq-area style-two ptb_100">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-7">
                            {/* Section Heading */}
                            <div className="section-heading text-center">
                                <h2 className="font-weight-bold text-uppercase">{this.state.data.heading}</h2>
                                {/* <p className="d-none d-sm-block mt-4">{this.state.data.headingText}</p>
                                <p className="d-block d-sm-none mt-4">{this.state.data.headingTexttwo}</p> */}
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {/* FAQ Content */}
                            <div className="faq-content">
                                {/* sApp Accordion */}
                                <div className="accordion" id="sApp-accordion">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-6">
                                            {/* Single Card */}
                                            <h3><b>About Finding Spaces</b></h3>
                                            {this.state.faqData.map((item, idx) => {
                                                return (
                                                    <div key={`fo_${idx}`} className=" border-0">
                                                        {/* Card Header */}
                                                        <div className="card-header bg-inherit border-0 p-0">
                                                            <h2 className="mb-0">
                                                                <button className="btn px-0 py-2" type="button">
                                                                    {item.title}
                                                                </button>
                                                            </h2>
                                                        </div>
                                                        {/* Card Body */}
                                                        <div className="card-body px-0 py-3">
                                                            {item.content}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="col-12 col-md-6">
                                            {/* Single Card */}
                                            <h3><b>About For Sale By Owner</b></h3>
                                            {this.state.faqDataTwo.map((item, idx) => {
                                                return (
                                                    <div key={`ft_${idx}`} className=" border-0">
                                                        {/* Card Header */}
                                                        <div className="card-header bg-inherit border-0 p-0">
                                                            <h2 className="mb-0">
                                                                <button className="btn px-0 py-2" type="button">
                                                                    {item.title}
                                                                </button>
                                                            </h2>
                                                        </div>
                                                        {/* Card Body */}
                                                        <div className="card-body px-0 py-3">
                                                            {item.content}
                                                        </div>
                                                    </div>
                                                );
                                            })}



                                            {/* Single Card */}
                                            <div className='mt-5'>
                                                <h3><b>Sellers</b></h3>
                                                {this.state.faqDataThree.map((item, idx) => {
                                                    return (
                                                        <div key={`fo_${idx}`} className=" border-0">
                                                            {/* Card Header */}
                                                            <div className="card-header  bg-inherit border-0 p-0">
                                                                <h2 className="mb-0">
                                                                    <button className="  btn px-0 py-2" type="button">
                                                                        {item.title}
                                                                    </button>
                                                                </h2>
                                                            </div>
                                                            {/* Card Body */}
                                                            <div className="  card-body px-0 py-3">
                                                                {item.content}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Single Card */}
                                            <div className='mt-5'>
                                                <h3><b>Buyers</b></h3>
                                                {this.state.faqDataFour.map((item, idx) => {
                                                    return (
                                                        <div key={`ft_${idx}`} className=" border-0">
                                                            {/* Card Header */}
                                                            <div className="card-header bg-inherit border-0 p-0">
                                                                <h2 className="mb-0">
                                                                    <button className="btn px-0 py-2" type="button">
                                                                        {item.title}
                                                                    </button>
                                                                </h2>
                                                            </div>
                                                            {/* Card Body */}
                                                            <div className="card-body px-0 py-3">
                                                                {item.content}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div className=" accordion" id="sApp-accordion">
                                    <div className="row justify-content-center align-items-center">
                                        <div className="mt-5 col-12 col-md-6">

                                        </div>
                                        <div className="col-12 col-md-6">

                                        </div>

                                    </div>
                                    <div className="row justify-content-center">
                                        {/* <p className="text-body text-center pt-4 fw-5">{this.state.data.faqText} <a href="/#">{this.state.data.faqTextLink}</a></p> */}
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

export default FaqSection;