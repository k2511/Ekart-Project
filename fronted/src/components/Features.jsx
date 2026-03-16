import React from "react";
import { Truck, Shield, Headphones } from "lucide-react";

const featuresData = [
  {
    id: 1,
    title: "Free Shipping",
    description: "On orders over $50",
    icon: Truck,
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  {
    id: 2,
    title: "Secure Payment",
    description: "100% secure transactions",
    icon: Shield,
    bg: "bg-green-100",
    text: "text-green-600",
  },
  {
    id: 3,
    title: "24/7 Support",
    description: "Dedicated customer support",
    icon: Headphones,
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
];

const Features = () => {
  return (
    <section className="w-full py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          
          {featuresData.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="flex items-start space-x-4"
              >
                {/* Icon Wrapper */}
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center ${feature.bg}`}
                >
                  <Icon className={`h-6 w-6 ${feature.text}`} />
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Features;