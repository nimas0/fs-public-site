import React from 'react';
import { Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import StepWizard from 'react-step-wizard';

// Step Components for Wizard
import Disclaimer from '../../../../components/buyers/offerWizard/Disclaimer';
import Amount from '../../../../components/buyers/offerWizard/Amount';
import Deposit from '../../../../components/buyers/offerWizard/Deposit';
import Contingency from '../../../../components/buyers/offerWizard/Contingency';
import Possession from '../../../../components/buyers/offerWizard/Possession';
import Nav from '../../../../components/buyers/offerWizard/Nav';
import Summary from '../../../../components/buyers/offerWizard/Summary';

// Form Control
import { Formik } from 'Formik';

//Generic Header
import Header from '../../../../components/generic/Dialog/Header';

// Auth, Layout Controls
import MainLayout from '../../../../components/layout/MainLayout';
import withAuthUser from '../../../../utils/pageWrappers/withAuthUser';
import withAuthUserInfo from '../../../../utils/pageWrappers/withAuthUserInfo';
import withLoginModal from '../../../../utils/pageWrappers/withLoginModal';
import FinalComment from '../../../../components/buyers/offerWizard/FinalComment';



const stepTitles = {
   1: 'Disclaimer',
   2: 'Choose Amount',
   3: 'Deposit',
   4: 'Contingencies',
   5: 'Possession',
   6: 'Final Comment',
   7: 'Summary',
};

// custom transitions for react-wizard
let custom = {
   enterRight: "animate__animated",
   enterLeft: "animate__animated",
   exitRight: "animate__animated",
   exitLeft: "animate__animated"
}

const OfferPage = ({ AuthUserInfo, showLoginModalAuthUserInfo, showLoginModal }) => {
   const { AuthUser = null } = AuthUserInfo;
   return (
      <MainLayout AuthUser={AuthUser} showLoginModal={showLoginModal}>
         <div data-test='offer-wizard'>
            <Formik
               data-test='form'
               autocomplete='off'
               initialValues={{
                  amount: '',
                  deposit: '',
                  contingency: '',
                  possession: '',
                  comment: ''
               }}
               validationSchema={{}}
               onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                     setSubmitting(false);
                     console.log(values);
                  }, 500);
               }}>
               {({ ...props }) => (
                  <Form noValidate onSubmit={(values) => console.log(values)}>
                     <Container fluid='md' className='p-5 '>
                        <Card className='shadow '>
                           <StepWizard
                              transitions={custom}
                              nav={
                                 <Header
                                    headerText='Propose an Offer'
                                    subHeaderText='1234 Main Street Phoenix AZ'>
                                    <Nav titles={stepTitles} />
                                 </Header>
                              }>
                              <Disclaimer {...props} />
                              <Amount {...props} />
                              <Deposit {...props} />
                              <Contingency {...props} />
                              <Possession {...props} />
                              <FinalComment {...props} />
                              <Summary {...props} />
                           </StepWizard>
                        </Card>
                     </Container>
                  </Form>
               )}
            </Formik>
         </div>
      </MainLayout>
   )
};

export default withAuthUser(withAuthUserInfo(withLoginModal(OfferPage)));