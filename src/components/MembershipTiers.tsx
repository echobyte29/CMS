
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { ButtonCustom } from './ui/button-custom';
import { cn } from '@/lib/utils';

type MembershipTier = {
  id: string;
  name: string;
  audience: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
};

const membershipTiers: MembershipTier[] = [
  {
    id: 'student',
    name: 'Student Membership',
    audience: 'For enrolled students',
    price: '$15',
    period: 'year',
    features: [
      'Access to all chapter events',
      'Workshop participation',
      'Digital Communications',
      'Networking opportunities',
      'Member-only resources',
      'Mentorship program access',
    ],
  },
  {
    id: 'professional',
    name: 'Professional Membership',
    audience: 'For industry professionals',
    price: '$65',
    period: 'year',
    features: [
      'All student membership benefits',
      'Leadership opportunities',
      'Speaker opportunities at events',
      'Industry connection priority',
      'Professional development resources',
      'Voting rights in chapter elections',
      'Exclusive industry networking events',
    ],
    popular: true,
  },
  {
    id: 'alumni',
    name: 'Alumni Membership',
    audience: 'For graduated members',
    price: '$40',
    period: 'year',
    features: [
      'All student membership benefits',
      'Alumni-exclusive events',
      'Mentorship opportunities',
      'Career advancement resources',
      'Leadership opportunities',
      'Continued access to ACM resources',
    ],
  },
];

interface MembershipTiersProps {
  className?: string;
}

const MembershipTiers = ({ className }: MembershipTiersProps) => {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  return (
    <div id="join" className={cn('py-12', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Membership</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our community of computing professionals and students. Select the membership tier that best suits your needs and career stage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {membershipTiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                'glass-card p-6 flex flex-col transition-all duration-300',
                tier.popular 
                  ? 'border-primary shadow-lg ring-1 ring-primary/20 md:scale-105 z-10' 
                  : 'hover:shadow-md',
                hoveredTier && hoveredTier !== tier.id ? 'opacity-80' : ''
              )}
              onMouseEnter={() => setHoveredTier(tier.id)}
              onMouseLeave={() => setHoveredTier(null)}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-xl font-semibold mb-1">{tier.name}</h3>
                <p className="text-sm text-muted-foreground">{tier.audience}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-sm text-muted-foreground ml-1">/{tier.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <ButtonCustom
                className="w-full mt-auto"
                variant={tier.popular ? 'default' : 'outline'}
              >
                Join {tier.name.split(' ')[0]}
              </ButtonCustom>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            All memberships are annual and auto-renew. You can cancel anytime. Need help choosing? <a href="#" className="text-primary underline">Contact us</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MembershipTiers;
