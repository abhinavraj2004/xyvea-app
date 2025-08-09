
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function TermsOfServicePage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 prose dark:prose-invert">
          <p>Last updated: {lastUpdated || '...'}</p>

          <p>
            Please read these Terms of Service ("Terms") carefully before using the Xyvea: The Causality Engine application (the "Service") operated by us.
          </p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>
          </section>

          <section>
            <h2>2. Accounts</h2>
            <p>
              When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
            </p>
          </section>

          <section>
            <h2>3. User Conduct and Content</h2>
            <p>
              You are responsible for the content you contribute to the platform, including proposed links and evidence. You agree not to submit any content that is unlawful, harmful, or infringes on the rights of others. We reserve the right, but not the obligation, to monitor and remove content that we determine in our sole discretion is objectionable or violates any party's intellectual property or these Terms of Service.
            </p>
             <p>
              Public contributions may be displayed publicly and associated with your user profile. Private contributions (available to Pro users) will remain visible only to you and authorized team members.
            </p>
          </section>

          <section>
            <h2>4. AI-Generated Content</h2>
            <p>
                The Service uses artificial intelligence to analyze and summarize evidence. This AI-generated content is for informational purposes only and may contain inaccuracies. We do not guarantee the accuracy, completeness, or usefulness of any information on the Service and neither adopt nor endorse, nor are we responsible for, the accuracy or reliability of any opinion, advice, or statement made.
            </p>
          </section>
          
          <section>
            <h2>5. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

           <section>
            <h2>6. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect.
            </p>
          </section>

          <section>
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at: terms@xyvea.example.com
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
