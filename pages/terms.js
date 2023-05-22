import React from 'react'
import LandingLayout from '../layouts/landing.layout'
import { Container } from '../styles/terms.style'

const Terms = () => {
  return (
    <Container>
       <h2>Introduction</h2>
       <p>These Terms and Conditions (&quot;Terms&quot;) govern the use of the Influenzit platform and services
(&quot;Services&quot;) provided by ascend brand management (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By using our Services, you (&quot;User&quot;,
&quot;you&quot;, or &quot;your&quot;) agree to be bound by these Terms</p>
        <h2>Acceptance of Terms</h2>
        <p>By accessing and using our Services, you acknowledge that you have read, understood, and
agree to be bound by these Terms. We may update or modify these Terms at any time without
prior notice. Your continued use of the Services constitutes your acceptance of any changes or
modifications to the Terms</p>
        <h2>Registration and Account Security</h2>
        <p>To access our Services, you must create an account and provide accurate, complete, and
up-to-date information during the registration process. You are responsible for maintaining the
confidentiality of your account and password and for all activities that occur under your account.
Influenzit reserves the right to suspend or terminate accounts at its sole discretion, including but
not limited to, cases involving fraudulent activity or misuse</p>
    <h2>User Conduct</h2>
    <p>Users are required to comply with all applicable laws and regulations while using our Services.
Prohibited behavior includes, but is not limited to, harassment, spamming, and copyright
infringement. We reserve the right to remove content or terminate accounts for violations of
these Terms</p>
    <h2>Intellectual Property Rights</h2>
    <p>All rights to the Influenzit platform, content, and Services are owned by Influenzit. By submitting
content through the platform, you grant us a non-exclusive, worldwide, royalty-free,
sublicensable, and transferable license to use, reproduce, and display such content.</p>
    <h2>Payment Terms and Escrow</h2>
    <p>The payment structure for using our Services is as follows:</p>
    <h2>Influencers/Creators:</h2>
    <p>Commissions below N150,000: 20%<br />
Commissions between N150,000 and N1,000,000: 10%<br />
Commissions above N1,000,000: 7.5%</p>
<h2>Influencers:</h2>
    <p>Commissions below N150,000: 20%<br />
Commissions between N150,000 and N1,000,000: 10%<br />
Commissions above N1,000,000: 7.5%</p>
    <h2>Business Owners: Subscription plans</h2>
    <p>Free: Limited access and features<br />
Silver: N4,999 per month for additional features and access<br />
Gold: N14,999 per month for full access and features</p>
    <p>Payments made by business owners for campaigns will be held in escrow until the campaign is
marked and accepted as complete by the business owner. In the case of a dispute, either party
may raise the dispute, and we will investigate and resolve it based on the available evidence.</p>
    <p>Users are responsible for any taxes, fees, or charges associated with using our Services.
Invoices, payment disputes, and refund requests must be handled according to our payment
policies</p>
<h2>Third-Party Services</h2>
<p>Our Services may integrate with third-party services, and users agree to comply with the terms
and conditions of those services</p>
<h2>Disclaimers and Limitations of Liability</h2>
<p>Our Services are provided on an &quot;as is&quot; basis, and we disclaim any warranties or guarantees
regarding the performance or results of our platform. Our liability for damages shall be limited to
the amount paid by the user for the Service</p>
<h2>Indemnification</h2>
<p>Users agree to indemnify and hold harmless Influenzit and its affiliates, officers, directors, and
employees from any claims or damages arising from their use of the platform or violation of
these Terms.</p>
<h2>Termination</h2>
<p>Either party may terminate this agreement at any time, with or without cause. Upon termination,
users must cease using our Services and may be required to delete their account.</p>
<h2>Governing Law and Jurisdiction</h2>
<p>These Terms shall be governed by the laws of the applicable jurisdiction. Any disputes arising
from the use of our Services shall be resolved through arbitration or the appropriate court.</p>
<h2>Dispute Resolution</h2>
<p>In the event of a dispute between users, we will use our best efforts to facilitate a resolution.
Users agree to cooperate with our investigation and provide any necessary information to help
resolve the dispute. Our decision in resolving disputes will be final and binding on both parties.</p>
<h2>Miscellaneous</h2>
<p>Additional terms and conditions may apply to certain features or services. In the event of a
conflict between these Terms and any additional terms, the additional terms will prevail.</p>
<h2>Contact Information</h2>
<p>If you have any questions, comments, or concerns about these Terms or our Services, please
contact us at the contact information provided on our website.</p>
<h2>Severability</h2>
<p>If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions
will remain in full force and effect.</p>
<h2>Waiver</h2>
<p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of
those rights.</p>
<h2>Assignment</h2>
<p>You may not assign your rights or obligations under these Terms without our prior written
consent. We may assign our rights and obligations under these Terms at any time without
notice.</p>
<h2>Entire Agreement</h2>
<p>These Terms, along with any additional terms or policies incorporated by reference, constitute
the entire agreement between you and Influenzit and supersede any prior agreements, whether
written or oral, relating to the subject matter hereof.</p>
    </Container>
  )
}
Terms.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Terms;
