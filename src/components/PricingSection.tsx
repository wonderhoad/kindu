import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PricingSection = () => {
  const navigate = useNavigate();

  const componentPricing = [
    { name: "Cube Body", price: "4 500₸", description: "Oak wood construction" },
    { name: "Zip-Zip Panel", price: "1 550₸", description: "Fine motor skills training" },
    { name: "Bio Panel", price: "1 600₸", description: "Natural textures experience" },
    { name: "Eco-Sea Panel", price: "3 400₸", description: "Magnetic ocean sorting game" },
    { name: "Help Kindu Panel", price: "1 400₸", description: "Character puzzle solving" },
    { name: "Hedgehog Panel", price: "900₸", description: "Tactile sensory soothing" },
    { name: "Press the Planet Panel", price: "3 600₸", description: "Interactive planet exploration" },
  ];

  const totalPrice = "16 950₸";

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Transparent <span className="kindu-gradient-primary bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every cube is custom-built based on your child's needs. Here's our transparent 
            component pricing structure.
          </p>
        </div>

        {/* Component Pricing Breakdown */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="kindu-shadow hover:kindu-shadow-warm kindu-transition">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl mb-2">Component Pricing</CardTitle>
              <p className="text-muted-foreground">Build your perfect sensory cube</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {componentPricing.map((component, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <div className="font-semibold">{component.name}</div>
                    <div className="text-sm text-muted-foreground">{component.description}</div>
                  </div>
                  <div className="text-lg font-bold kindu-gradient-primary bg-clip-text text-transparent">
                    {component.price}
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-4 mt-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10">
                  <div className="font-bold text-lg">Total (All Components)</div>
                  <div className="text-2xl font-bold kindu-gradient-primary bg-clip-text text-transparent">
                    {totalPrice}
                  </div>
                </div>
              </div>
              
              <div className="text-center pt-6">
                <Button 
                  onClick={() => navigate("/builder")}
                  className="kindu-gradient-primary hover:scale-105 kindu-transition px-8 py-3"
                  size="lg"
                >
                  Customize Your Cube
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Global Vision */}
        <div className="flex justify-center">
          <Card className="p-8 kindu-shadow kindu-gradient-hero max-w-2xl">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <Globe className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-semibold">Global Vision</h3>
            </div>
            <p className="text-muted-foreground mb-4 text-center">
              Starting in Kazakhstan, our goal is to make Kindu cubes accessible worldwide. We're developing:
            </p>
            <ul className="space-y-2 text-muted-foreground text-center">
              <li>• International shipping partnerships</li>
              <li>• Regional manufacturing centers</li>
              <li>• Local therapy center partnerships</li>
              <li>• Multilingual AI support (Du)</li>
              <li>• Cultural adaptation of modules</li>
            </ul>
            <div className="mt-6 p-4 bg-kindu-yellow/20 rounded-lg">
              <p className="text-sm font-medium text-center">
                🌍 Pre-order now to help us expand globally and get early-bird pricing!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};