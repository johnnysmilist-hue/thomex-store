"use client";

export default function TermsPage() {
  return (
    <div className="py-6 md:py-8 max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">Terms of Service</h1>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">1. Introduction</h2>
          <p>Welcome to Thomex. By accessing or using our platform, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">2. Use of Platform</h2>
          <p>You must be at least 18 years old to make purchases. All information provided during registration must be accurate and kept up to date.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">3. Orders & Payments</h2>
          <p>All prices are listed in Kenyan Shillings (KSh). Orders are confirmed only after successful payment. We reserve the right to cancel orders in case of pricing errors or stock unavailability.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">4. Delivery</h2>
          <p>Delivery times are estimates and may vary. Risk of loss passes to you upon delivery. Please inspect packages before accepting.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">5. Returns & Refunds</h2>
          <p>Items may be returned within 7 days of delivery if unused and in original packaging. Refunds are processed within 5-10 business days.</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">6. Changes to Terms</h2>
          <p>We may update these terms at any time. Continued use of the platform constitutes acceptance of the revised terms.</p>
        </section>
      </div>
    </div>
  );
}