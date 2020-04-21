import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Heading from '../../../components/buyers/dashboard/Heading';
import Approval from '../../../components/buyers/dashboard/Approval';
import Subscription from '../../../components/buyers/dashboard/Subscription';
import Resources from '../../../components/buyers/dashboard/Resources';


export default () => (
    <>
        <MainLayout>
            <Container fluid='xl' className='py-5'>
                <Row>
                    <Col xs='5'>
                        <Heading />
                        <Approval />
                        <Subscription />
                    </Col>
                    <Col xs={{ span: 6, offset: 1 }}>
                        <Row className='pb-5 mx-1'>
                            <Button variant="primary" size="md" block>
                                List your home
                            </Button>
                        </Row>
                        <Resources />
                    </Col>
                </Row>
            </Container>
        </MainLayout>
    </>
);
