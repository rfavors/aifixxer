# Stripe Payment Integration Setup

This guide will help you set up Stripe payment processing for the A.I. Fixxer application.

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Node.js and npm installed
3. The A.I. Fixxer application running locally

## Setup Steps

### 1. Get Your Stripe Keys

1. Log in to your Stripe Dashboard
2. Go to Developers > API keys
3. Copy your **Publishable key** and **Secret key**
4. For webhooks, go to Developers > Webhooks and create a new endpoint

### 2. Update Environment Variables

Update the `.env.local` file with your actual Stripe keys:

```env
# Replace with your actual Stripe keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret
```

### 3. Create Stripe Products and Prices

1. In your Stripe Dashboard, go to Products
2. Create the following products:

#### Pro Plan
- **Name**: A.I. Fixxer Pro
- **Description**: For serious developers and small teams
- **Pricing**: 
  - Monthly: $29/month
  - Yearly: $278/year (20% discount)

#### Team Plan
- **Name**: A.I. Fixxer Team
- **Description**: For growing teams and organizations
- **Pricing**:
  - Monthly: $99/month
  - Yearly: $950/year (20% discount)

### 4. Update Price IDs

After creating the products, copy the Price IDs and update `lib/stripe.ts`:

```typescript
export const STRIPE_PRICES = {
  pro_monthly: 'price_your_actual_pro_monthly_id',
  pro_yearly: 'price_your_actual_pro_yearly_id',
  team_monthly: 'price_your_actual_team_monthly_id',
  team_yearly: 'price_your_actual_team_yearly_id',
}
```

### 5. Test the Integration

1. Restart your development server: `npm run dev`
2. Navigate to the pricing page
3. Click on "Start Pro Trial" or "Contact Sales" for Team plan
4. Use Stripe's test card numbers:
   - **Success**: 4242 4242 4242 4242
   - **Decline**: 4000 0000 0000 0002
   - Use any future expiry date and any 3-digit CVC

### 6. Webhook Setup (Optional but Recommended)

For production, set up webhooks to handle subscription events:

1. In Stripe Dashboard, go to Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.deleted`
4. Copy the webhook secret to your environment variables

## File Structure

The Stripe integration includes these files:

- `app/api/checkout/route.ts` - Checkout session creation
- `app/success/page.tsx` - Payment success page
- `lib/stripe.ts` - Stripe configuration and utilities
- `app/components/Pricing.tsx` - Updated pricing component with payment integration

## Security Notes

- Never expose your secret key in client-side code
- Always validate webhooks using the webhook secret
- Use HTTPS in production
- Implement proper error handling and logging

## Troubleshooting

### Common Issues

1. **"Price not configured"** - Make sure you've updated the price IDs in `lib/stripe.ts`
2. **"Stripe is not defined"** - Check that your publishable key is correctly set in `.env.local`
3. **Checkout not redirecting** - Verify your success/cancel URLs are correct

### Testing

- Use Stripe's test mode for development
- Test with different card numbers to simulate various scenarios
- Check Stripe Dashboard logs for detailed error information

## Going Live

1. Switch to live keys in your environment variables
2. Update webhook endpoints to production URLs
3. Test thoroughly with real payment methods
4. Monitor transactions in Stripe Dashboard

For more information, visit the [Stripe Documentation](https://stripe.com/docs).