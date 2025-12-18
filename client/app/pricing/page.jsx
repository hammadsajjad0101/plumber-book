import Link from 'next/link';
import Header from '../components/Header';

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small plumbing businesses",
      features: [
        "Unlimited bookings",
        "SMS notifications",
        "Mobile dashboard",
        "Custom booking page",
        "Email support",
        "Basic analytics"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$59",
      period: "/month",
      description: "For growing businesses",
      features: [
        "Everything in Starter",
        "Multiple team members",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "Calendar integrations",
        "Customer management"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large operations",
      features: [
        "Everything in Professional",
        "Unlimited team members",
        "24/7 phone support",
        "API access",
        "White-label solution",
        "Custom integrations",
        "Dedicated account manager"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-100 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-slate-400">Choose the plan that fits your business</p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            ✓ 14-day free trial • No credit card required
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-slate-900/50 backdrop-blur-sm border border-slate-800 shadow-xl rounded-2xl p-8 transition-all hover:-translate-y-1 ${
                plan.popular ? 'shadow-2xl shadow-blue-500/20 relative' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/50 text-white rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-100 mb-2">{plan.name}</h3>
                <p className="text-slate-400 mb-4">{plan.description}</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-5xl font-bold text-slate-100">{plan.price}</span>
                  <span className="text-slate-400 mb-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={`block w-full py-4 rounded-xl font-bold text-center transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:shadow-blue-500/50 hover:scale-105'
                    : 'border-2 border-slate-700 text-slate-300 hover:border-blue-600 hover:text-blue-400'
                }`}
              >
                Start Free Trial
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-slate-100 text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes! You can cancel your subscription at any time with no penalties or fees."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal."
              },
              {
                q: "Is there a setup fee?",
                a: "No setup fees! You only pay the monthly subscription price."
              },
              {
                q: "Can I upgrade or downgrade my plan?",
                a: "Absolutely! You can change your plan at any time, and we'll prorate the difference."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-slate-100 mb-2">{faq.q}</h3>
                <p className="text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
