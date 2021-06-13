import React from "react";



const DividerWithText = ({ children }) => (
  <>
    <div className='container'>
      <div className='border' />
      <span className='content'>{children}</span>
      <div className='border' />
    </div>
    <style jsx>
      {`
      .container {
        display: "flex",
        alignItems: "center"
        }
      .border {
        borderBottom: "2px solid lightgray",
        flexGrow: 1,
        }
      .content {
            paddingTop: 2rem,
            paddingBottom: 3rem,
            paddingRight: 1rem,
            paddingLeft: 1rem,
            fontWeight: 500,
            fontSize: 22,
            color: "lightgray"
    }
      `}

    </style>
  </>
 );
export default DividerWithText;