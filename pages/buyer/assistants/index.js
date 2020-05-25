import React from 'react'
import MainLayout from '../../../components/layout/MainLayout'
import InfoGeneralComp from '../../../components/InfoGeneralComp'
import { useRouter } from 'next/router';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';

import withAuthUser from '../../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../../utils/pageWrappers/withAuthUserInfo';
import withLoginModal from '../../../utils/pageWrappers/withLoginModal';

const Assistant = () => {
    const router = useRouter();
    return (
        <MainLayout>
            <InfoGeneralComp
                cancelRoute='/buyer/dashboard'
                header='Invite a family member or friend to view a home in your absence'
                colHeader='How does this work?'
                colSubHeader='Finding Spaces will email these recipients with instructions on becoming verified as your showing buddy.

                Once verified they will begin receiving email updates, appointment reminders, instructions, and most importantly be able to show the property for you in the instance you can not physically attend the property yourself.'
            >
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId='formGridEmail'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter First Name' />
                        </Form.Group>

                        <Form.Group as={Col} controlId='formGridPassword'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter Last Name' />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId='formGridAddress1'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control placeholder='Enter Email' />
                    </Form.Group>
                    <Form.Group controlId='formGridAddress1'>
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows="4" placeholder='Type your message here' />
                    </Form.Group>

                </Form>
            </InfoGeneralComp>
        </MainLayout>
    )
}

export default withAuthUser(withAuthUserInfo(withLoginModal(Assistant)));
