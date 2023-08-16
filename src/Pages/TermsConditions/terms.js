import visa from "../../Assets/Images/visa.png";
import paypal from "../../Assets/Images/paypal.png";
import pay from "../../Assets/Images/pay.png";
import "./terms.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetPackage } from "../../Services/Profile";

export const TermsComponent = () => {
  const [packages, setPackages] = useState([]);

  const fetchPackage = async () => {
    const data = await GetPackage();
    return data;
  };

  const fetchPackageData = () => {
    fetchPackage().then((data) => {
      setPackages(data?.data);
    });
  };

  useEffect(() => {
    fetchPackageData();
  }, []);
  return (
    <div className="body-wrapper">
      <div className="content pt-4">
        <section className="section-container p-0 mt-2">
          <div className="archive-title mb-4 ml-4">
            <p>Terms and Conditions</p>
          </div>
          <div className="container mx-auto my-8 px-4">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-xl">
                Panoptesan Terms and Conditions: REV. 7.26.23 Terms and
                Conditions for "Panoptesan."
              </p>
              <div className="mt-4">
                <strong>1. Introduction</strong>
                <br />
                <p>
                  Welcome to Panoptesan ("the App"). By downloading, installing,
                  or using the App, you agree to be bound by these Terms and
                  Conditions. If you do not agree with any part of these terms,
                  please refrain from using the App.
                </p>
              </div>
              <div className="mt-4">
                <strong>2. License and Usage</strong>
                <br />
                <strong> 2.1</strong> License: [The Brand-It, LLC, DBA
                "Panoptesan"] grants you a non-exclusive, non-transferable,
                revocable license to use the App for personal, non-commercial
                purposes, subject to these Terms.
                <br />
                <strong> 2.2</strong> Restrictions: You shall not, in any
                circumstances, distribute, lease, license, sell, modify, or
                create derivative works based on the App, in whole or in part.
              </div>
              <div className="mt-4">
                <strong>3. Data Collection and Privacy</strong>
                <br />
                <strong> 3.1</strong> Data Collection: The App may collect
                certain data from your device, including but not limited to
                video recordings, location data, and device information. By
                using the App, you consent to the collection and use of this
                data in accordance with our Privacy Policy.
                <br />
                <strong> 3.2</strong> Privacy Policy: For information on how we
                collect, use, and protect your data, please refer to our Privacy
                Policy, which is incorporated into these Terms by reference.
              </div>
              <div className="mt-4">
                <strong>4. User Responsibilities</strong>
                <br />
                <strong> 4.1</strong> Lawful Use: You agree to use the App only
                for lawful purposes and in compliance with all applicable laws
                and regulations.
                <br />
                <strong> 4.2</strong> Content Ownership: You retain ownership of
                any content you create or upload to the App. By using the App,
                you grant [The Brand-It, LLC, DBA "Panoptesan"] a worldwide,
                non-exclusive, royalty-free license to use, reproduce, modify,
                adapt, publish, and distribute such content solely for the
                purpose of providing and improving the App.
              </div>
              <div className="mt-4">
                <strong>5. Prohibited Activities</strong>
                <br />
                While using the App, you must not:
                <br /> <strong> 5.1</strong> Violate any applicable laws or
                regulations.
                <br />
                <strong> 5.2</strong> Infringe upon the intellectual property
                rights of others.
                <br />
                <strong> 5.3</strong> Engage in unauthorized access or interfere
                with the App's security features.
                <br />
                <strong> 5.4</strong> Transmit or distribute any harmful or
                malicious code.
                <br />
                <strong> 5.5</strong> Engage in any activity that may disrupt or
                harm the App or its users.
              </div>
              <div className="mt-4">
                <strong>6. Limitation of Liability</strong>
                <br />
                <strong> 6.1</strong> No Warranty: The App is provided on an
                "as-is" basis without any warranties, express or implied. [The
                Brand-It, LLC, DBA "Panoptesan"] disclaims all warranties,
                including but not limited to warranties of merchantability,
                fitness for a particular purpose, and non-infringement.
                <br /> <strong> 6.2</strong> Limitation of Liability: In no
                event shall [The Brand-It, LLC, DBA "Panoptesan"] be liable for
                any direct, indirect, incidental, special, or consequential
                damages arising out of or in connection with the use of the App.
              </div>
              <p className="mt-4">
                <strong>7. Indemnification</strong>
                <br />
                You agree to indemnify and hold [The Brand-It, LLC, DBA
                "Panoptesan"] harmless from and against any claims, damages,
                liabilities, losses, and expenses (including reasonable
                attorney's fees) arising out of or in connection with your use
                of the App or any breach of these Terms.
              </p>
              <p className="mt-4">
                <strong>8. Modifications</strong>
                <br />
                [The Brand-It, LLC, DBA "Panoptesan"] reserves the right to
                modify or update these Terms and Conditions at any time. We will
                provide notice of significant changes through the App or other
                appropriate means. By continuing to use the App after the
                changes take effect, you accept the updated Terms.
              </p>
              <p className="mt-4">
                <strong>9. Governing Law</strong>
                <br />
                These Terms and Conditions shall be governed by and construed in
                accordance with the laws of [The United States of
                America/Oregon].
              </p>
              <p className="mt-4">
                <strong>10. Contact</strong>
                <br />
                If you have any questions or concerns regarding these Terms and
                Conditions, please contact us at [contact@panoptesan.com].
              </p>
              <p className="mt-4">
                By using the dash cam app, you acknowledge that you have read,
                understood, and agreed to these Terms and Conditions.
              </p>
            </div>
          </div>
        </section>
        <script src="./assets/js/mlib.js"></script>
        <script src="./assets/js/functions.js"></script>
      </div>
    </div>
  );
};
