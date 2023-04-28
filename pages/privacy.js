import React from 'react'
import LandingLayout from '../layouts/landing.layout'
import { Container } from '../styles/terms.style'

const Privacy = () => {
  return (
    <div>
        <Container>
          <p>This Privacy Policy describes how Influenzit collects, uses, and shares your personal
            information when you use our platform and services (&quot;Services&quot;). By using our Services, you
            agree to the collection and use of information in accordance with this policy.
          </p>
          <h2>Information We Collect</h2>
          <p>a. Personal Information: When you register for an account or use our Services, we may collect
            information such as your name, email address, phone number, and social media account
            information.
          </p>
          <p>b. Usage Information: We collect information about how you use our Services, including your
            interactions with our platform, the content you view, and the duration of your sessions
          </p>
          <p>
          c. Device and Technical Information: We collect information about your device, such as your IP
          address, device type, operating system, and browser type.
          </p>
          <p>
          d. Cookies and Tracking Technologies: We use cookies and other tracking technologies to
collect information about your activity on our Services and to provide a personalized experience
          </p>
          <h2>How We Use Your Information</h2>
          <p style={{ marginBottom: "14px" }}>We use your information for various purposes, including to:</p>
          <p>a. Provide and maintain our Services</p>
          <p>b. Improve and personalize your experience</p>
          <p>c. Communicate with you about our Services, promotions, and updates</p>
          <p>d. Analyze usage and trends to better understand our user base</p>
          <p>e. Detect, prevent, and address technical issues and security threats</p>
          <p>f. Comply with legal obligations and protect our rights</p>
          <h2>How We Share Your Information</h2>
          <p style={{ marginBottom: "14px" }}>We may share your information with third parties in the following situations:</p>
          <p>a. Service Providers: We may share your information with third-party service providers who
assist us in providing and maintaining our Services, such as payment processors, analytics
providers, and marketing partners</p>
          <p>
          b. Business Transfers: In the event of a merger, acquisition, or other business transfer, we may
transfer your information to the new owner.
          </p>
          <p>
          c. Compliance with Laws: We may disclose your information if required to do so by law or in
response to a legal request.
          </p>
          <p>
          d. Protection of Rights: We may disclose your information to protect our rights, property, or
safety, or the rights, property, or safety of others.
          </p>
          <h2>Security</h2>
          <p>We take reasonable measures to protect your personal information from unauthorized access,
alteration, or destruction. However, no method of transmission or storage is 100% secure, and
we cannot guarantee the absolute security of your information.</p>
          <h2>Your Rights and Choices</h2>
          <p style={{ marginBottom: "14px" }}>You have certain rights and choices regarding your personal information:</p>
          <p>a. Access, Update, or Delete: You can access, update, or request deletion of your personal
information by contacting us at the contact information provided on our website.</p>
          <p>b. Opt-out: You can opt-out of receiving promotional communications from us by following the
unsubscribe instructions in the email or by contacting us.</p>
          <p>c. Cookies: You can manage your cookie preferences through your browser settings.</p>
          <h2>Third-Party Links</h2>
          <p>Our Services may contain links to third-party websites or services that are not owned or
controlled by Influenzit. We are not responsible for the privacy practices or content of these
third-party websites or services</p>
          <h2>Children&apos;s Privacy</h2>
          <p>Our Services are not intended for use by children under the age of 13. We do not knowingly
collect personal information from children under 13. If we become aware that we have collected
personal information from a child under 13, we will take steps to delete that information.</p>
          <h2>Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by
posting the new Privacy Policy on our website. Your continued use of our Services after any
changes to this Privacy Policy constitutes your acceptance of the updated policy.</p>
          <h2>Contact Us</h2>
          <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p>Email: privacy@influenzit.com<br />
Phone: +234 8028723803</p>
          <p>We will respond to your inquiries and address any concerns as quickly as possible.</p>
        </Container>
    </div>
  )
}
Privacy.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)
export default Privacy