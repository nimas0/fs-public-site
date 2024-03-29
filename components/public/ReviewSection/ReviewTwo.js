import React, { Component } from 'react';

const data = [
    {
        id: "1",
        avatorImg: "/img/avatar-1.png",
        reviewer: "John Doe",
        address: "Los Angeles, California",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam rem sunt nulla ducimus expedita, incidunt laborum assumenda. Deleniti iste placeat nostrum incidunt rem laudantium, sapiente, cum, molestias unde, quidem labore.",
        icon_1: "fas fa-star",
        icon_2: "fas fa-star",
        icon_3: "fas fa-star",
        icon_4: "fas fa-star",
        icon_5: "far fa-star"
    },
    {
        id: "2",
        avatorImg: "/img/avatar-2.png",
        reviewer: "Jassica William",
        address: "Los Angeles, California",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam rem sunt nulla ducimus expedita, incidunt laborum assumenda. Deleniti iste placeat nostrum incidunt rem laudantium, sapiente, cum, molestias unde, quidem labore.",
        icon_1: "fas fa-star",
        icon_2: "fas fa-star",
        icon_3: "fas fa-star",
        icon_4: "fas fa-star",
        icon_5: "fas fa-star"
    },
    {
        id: "3",
        avatorImg: "/img/avatar-3.png",
        reviewer: "Johnson Smith",
        address: "Los Angeles, California",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam rem sunt nulla ducimus expedita, incidunt laborum assumenda. Deleniti iste placeat nostrum incidunt rem laudantium, sapiente, cum, molestias unde, quidem labore.",
        icon_1: "fas fa-star",
        icon_2: "fas fa-star",
        icon_3: "fas fa-star",
        icon_4: "fas fa-star",
        icon_5: "far fa-star"
    }
]

class ReviewSection extends Component {
    render() {
        return (
          <section className="section testimonial-area ptb_100">
            <div className="container text-center">
              <div className="row justify-content-center align-items-center">
                <div className="col-12 col-md-10 col-lg-8">
                  <div className="testimonials owl-carousel">
                    {/* Single Testimonial */}

                    <div className="single-testimonial p-3 p-md-5">
                      <img style={{ width: '25%' }} src='\img\documentIcon.png' className="mx-auto" alt="" />
                      {/* Client Name */}
                      <h3 className="client-name mt-4 mb-2">All legal documents needed for the process are included for <b className='text-primary'>FREE</b>!</h3>
                      {/* Client Rating */}
                      <div className="client-rating mt-2 mb-3">
                        {/* <i className={item.icon_1} />
                                        <i className={item.icon_2} />
                                        <i className={item.icon_3} />
                                        <i className={item.icon_4} />
                                        <i className={item.icon_5} /> */}
                      </div>
                      {/* Client Description */}
                      <div className="client-description">
                        {/* Client Text */}

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

export default ReviewSection;