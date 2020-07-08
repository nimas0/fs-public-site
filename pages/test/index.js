import React from 'react'
import MessageProposal from '../../components/buyers/chat/Message/MessageProposal';
export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>

                <div>
                    Hello Next.js
                </div>
                <MessageProposal
                    data={
                        {
                            author: 'alsdfjsljflsjdflsj',
                            displayName: 'Nicholas Massie',
                            message: 'test test test test test',
                            photoURL: 'https://lh4.googleusercontent.com/-XHC55bB5zZ4/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJMryDNCPlQfr9J5B_gJIjx107M_bQ/photo.jpg',
                            timestamp: new Date()
                        }
                    }
                    isMine={true}
                    startsSequence={true}
                    endsSequence={true}
                    showTimestamp={true}
                />
            </>
        )
    }
}