import { loadStripe } from '@stripe/stripe-js'

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
let stripePromise: Promise<any>

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

export default getStripe

// Stripe Price IDs - Replace these with your actual Stripe Price IDs
export const STRIPE_PRICES = {
  pro_monthly: 'price_1234567890abcdef', // Replace with actual price ID
  pro_yearly: 'price_1234567890abcdef', // Replace with actual price ID
  team_monthly: 'price_1234567890abcdef', // Replace with actual price ID
  team_yearly: 'price_1234567890abcdef', // Replace with actual price ID
}

// Helper function to get the correct price ID based on plan and billing period
export const getPriceId = (planName: string, billingPeriod: 'monthly' | 'yearly') => {
  const key = `${planName.toLowerCase()}_${billingPeriod}` as keyof typeof STRIPE_PRICES
  return STRIPE_PRICES[key]
}