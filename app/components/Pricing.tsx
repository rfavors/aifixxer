'use client'

import { motion } from 'framer-motion'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import getStripe, { getPriceId } from '@/lib/stripe'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out A.I. Fixxer',
    features: [
      '3 scans per month',
      'Basic security analysis',
      'Performance insights',
      'Code quality checks',
      'Email support'
    ],
    limitations: [
      'Limited to 1,000 lines per scan',
      'No priority support',
      'No advanced integrations'
    ],
    cta: 'Start Free',
    popular: false,
    color: 'border-gray-200'
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For serious developers and small teams',
    features: [
      'Unlimited scans',
      'Advanced security analysis',
      'Performance optimization',
      'Code quality metrics',
      'Launch readiness checklist',
      'GitHub integration',
      'One-click fixes',
      'Priority email support',
      'Custom rules'
    ],
    limitations: [],
    cta: 'Start Pro Trial',
    popular: true,
    color: 'border-primary-500 ring-2 ring-primary-500'
  },
  {
    name: 'Team',
    price: '$99',
    period: 'per month',
    description: 'For growing teams and organizations',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Advanced reporting',
      'Custom integrations',
      'SSO authentication',
      'Dedicated account manager',
      'Phone support',
      'Custom training',
      'API access'
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false,
    color: 'border-gray-200'
  }
]

const faqs = [
  {
    question: 'How does the free plan work?',
    answer: 'The free plan gives you 3 scans per month with basic analysis features. Perfect for trying out A.I. Fixxer and seeing the value it provides.'
  },
  {
    question: 'Can I upgrade or downgrade anytime?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay by invoice.'
  },
  {
    question: 'Is there a money-back guarantee?',
    answer: 'Yes! We offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied, we\'ll refund your payment in full.'
  },
  {
    question: 'Do you offer discounts for students or nonprofits?',
    answer: 'Yes! We offer 50% discounts for students and nonprofit organizations. Contact us with proof of eligibility to get your discount code.'
  },
  {
    question: 'What happens to my data if I cancel?',
    answer: 'Your scan history and reports remain accessible for 90 days after cancellation. You can export all your data at any time.'
  }
]

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [loading, setLoading] = useState<string | null>(null)

  const handleCheckout = async (planName: string) => {
    try {
      setLoading(planName)
      
      const priceId = getPriceId(planName, billingPeriod)
      
      if (!priceId) {
        alert('Price not configured for this plan. Please contact support.')
        return
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          planName,
        }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        alert('Error creating checkout session. Please try again.')
        return
      }

      const stripe = await getStripe()
      const { error: stripeError } = await stripe!.redirectToCheckout({
        sessionId,
      })

      if (stripeError) {
        alert('Error redirecting to checkout. Please try again.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(null)
    }
  }

  const getPrice = (basePrice: string) => {
    if (basePrice === '$0') return basePrice
    const price = parseInt(basePrice.replace('$', ''))
    if (billingPeriod === 'yearly') {
      const yearlyPrice = Math.floor(price * 12 * 0.8) // 20% discount
      return `$${yearlyPrice}`
    }
    return basePrice
  }

  const getPeriod = () => {
    return billingPeriod === 'yearly' ? 'per year' : 'per month'
  }

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include our core security and performance analysis.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center">
            <div className="bg-gray-100 p-1 rounded-lg flex">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  billingPeriod === 'yearly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl border-2 ${plan.color} p-8 shadow-sm hover:shadow-lg transition-all duration-200 ${
                plan.popular ? 'transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {getPrice(plan.price)}
                  </span>
                  {plan.price !== '$0' && (
                    <span className="text-gray-500 ml-2">
                      {billingPeriod === 'yearly' ? getPeriod() : plan.period}
                    </span>
                  )}
                </div>
                {billingPeriod === 'yearly' && plan.price !== '$0' && (
                  <p className="text-sm text-green-600 font-medium">
                    Save ${parseInt(plan.price.replace('$', '')) * 12 * 0.2}/year
                  </p>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, limitationIndex) => (
                  <div key={limitationIndex} className="flex items-start">
                    <XMarkIcon className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5 mr-3" />
                    <span className="text-gray-500 text-sm">{limitation}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  if (plan.name === 'Free') {
                    const uploadSection = document.getElementById('upload')
                    uploadSection?.scrollIntoView({ behavior: 'smooth' })
                  } else if (plan.name === 'Team') {
                    alert('Contact Sales: Please email sales@aifixxer.com or call 1-800-AI-FIXXER to discuss your team needs.')
                  } else {
                    handleCheckout(plan.name)
                  }
                }}
                disabled={loading === plan.name}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  plan.popular
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl disabled:hover:bg-primary-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:hover:bg-gray-100'
                }`}
              >
                {loading === plan.name ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  plan.cta
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Enterprise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gray-50 rounded-2xl p-8 lg:p-12 text-center mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            Need custom features, on-premise deployment, or have a large team? 
            We'll create a custom plan that fits your organization's needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => {
                alert('Contact Sales: Please email enterprise@aifixxer.com or call 1-800-AI-FIXXER to discuss your enterprise needs.')
              }}
              className="btn-primary"
            >
              Contact Sales
            </button>
            <button 
              onClick={() => {
                alert('Schedule Demo: This would open a calendar booking system to schedule a personalized demo. Demo purposes only.')
              }}
              className="btn-secondary"
            >
              Schedule Demo
            </button>
          </div>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
            <div>✓ Custom integrations</div>
            <div>✓ On-premise deployment</div>
            <div>✓ 24/7 phone support</div>
            <div>✓ Custom SLA</div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className="text-gray-500">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to secure your AI-generated code?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of developers who trust A.I. Fixxer to keep their code secure and performant.
          </p>
          <button 
            onClick={() => handleCheckout('Pro')}
            disabled={loading === 'Pro'}
            className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading === 'Pro' ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                Processing...
              </div>
            ) : (
              'Start Your Free Trial'
            )}
          </button>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required • Cancel anytime • 30-day money-back guarantee
          </p>
        </motion.div>
      </div>
    </section>
  )
}