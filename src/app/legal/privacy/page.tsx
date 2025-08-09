
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function PrivacyPolicyPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 prose dark:prose-invert">
          <p>Last updated: {lastUpdated || '...'}</p>
          
          <p>
            Welcome to Xyvea: The Causality Engine ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
          </p>

          <section>
            <h2>1. Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may collect on the Service includes:
            </p>
            <ul>
              <li>
                <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, that you voluntarily give to us when you register with the application.
              </li>
              <li>
                <strong>Usage Data:</strong> Information our servers automatically collect when you access the Service, such as your IP address, browser type, and the pages you have viewed. For anonymous users, we store a hash of your IP address for rate-limiting purposes only.
              </li>
               <li>
                <strong>User Contributions:</strong> We collect the information you provide when you propose or vote on causal links, including the source URLs and claims you submit.
              </li>
            </ul>
          </section>

          <section>
            <h2>2. Use of Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:
            </p>
            <ul>
                <li>Create and manage your account.</li>
                <li>Provide and improve our services.</li>
                <li>Monitor and analyze usage and trends to improve your experience.</li>
                <li>Enforce our terms and policies, and prevent fraudulent activity.</li>
                <li>Respond to your comments and questions and provide customer service.</li>
            </ul>
          </section>
          
          <section>
            <h2>3. Disclosure of Your Information</h2>
            <p>
              We do not share your personal information with third parties except as described in this Privacy Policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf (e.g., cloud hosting, AI model providers).
            </p>
          </section>

          <section>
            <h2>4. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>
          
          <section>
            <h2>5. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at: privacy@xyvea.example.com
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
