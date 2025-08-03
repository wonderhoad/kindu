import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import kinduHeroCube from "@/assets/kindu-hero-cube.jpg";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center kindu-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="kindu-gradient-primary bg-clip-text text-transparent">
                  Kindu
                </span>
                <br />
                <span className="text-foreground">
                  Sensory Cubes for Growing Minds
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Custom-built cubes for neurodiverse children to explore, grow, and connect. 
                Each cube is personalized to support your child's unique sensory and developmental needs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={() => navigate("/builder")}
                size="lg"
                className="kindu-gradient-primary hover:scale-105 kindu-transition text-lg px-8 py-4 pulse-glow"
              >
                Customize Your Cube
              </Button>
              <Button
                onClick={() => {
                  const section = document.getElementById('about-section');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Module Types</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">Coming Soon</div>
                <div className="text-sm text-muted-foreground">Inclusive Centers Across Kazakhstan</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">AI Support</div>
              </div>
            </div>
          </div>

          {/* Hero Video */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden kindu-shadow-warm float-animation">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="src/assets/kindu-cube.mp4" type="video/mp4" />
                <img
                  src={kinduHeroCube}
                  alt="Kindu Sensory Cube"
                  className="w-full h-full object-cover"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};