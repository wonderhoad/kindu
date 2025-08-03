import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";

interface StatData {
  year: string;
  value: number;
  isProjection?: boolean;
}

const data: StatData[] = [
  { year: "2002", value: 300 },
  { year: "2010", value: 1100 },
  { year: "2016", value: 2300 },
  { year: "2020", value: 4800 },
  { year: "2025", value: 7500, isProjection: true }
];

export const AnimatedChart = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div ref={ref} className="mb-20">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-4">📈 Understanding Autism Today</h3>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Autism diagnosis rates in Kazakhstan have grown significantly over the past two decades, highlighting the urgent need for accessible therapeutic tools.
        </p>
      </div>
      
      <Card className="p-8 kindu-shadow mb-8">
        <h4 className="text-2xl font-semibold text-center mb-8">Growth of Autism Diagnoses in Kazakhstan</h4>
        
        {/* Animated Bar Chart */}
        <div className="relative h-48 sm:h-64 mb-8">
          <div className="flex items-end justify-between h-full px-2 sm:px-4">
            {data.map((item, index) => (
              <div key={item.year} className="flex flex-col items-center flex-1 mx-1 sm:mx-2">
                {/* Bar */}
                <motion.div
                  className={`w-full max-w-12 sm:max-w-16 rounded-t-lg ${
                    item.isProjection 
                      ? 'bg-gradient-to-t from-accent to-accent/70' 
                      : 'bg-gradient-to-t from-primary to-primary/70'
                  }`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={isInView ? { 
                    height: `${(item.value / maxValue) * 100}%`, 
                    opacity: 1 
                  } : { height: 0, opacity: 0 }}
                  transition={{ 
                    duration: 1.2, 
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                />
                
                {/* Value Label */}
                <motion.div
                  className={`text-sm sm:text-lg font-bold mt-2 ${
                    item.isProjection ? 'text-accent' : 'text-primary'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2 + 0.8 
                  }}
                >
                  {item.value.toLocaleString()}
                </motion.div>
                
                {/* Year Label */}
                <motion.div
                  className="text-xs sm:text-sm text-muted-foreground mt-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.2 + 1.0 
                  }}
                >
                  {item.year}
                  {item.isProjection && (
                    <span className="block text-xs text-accent">(projection)</span>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Indicators */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <div className="p-4 bg-primary/10 rounded-lg">
            <div className="text-2xl font-bold text-primary">25x</div>
            <div className="text-sm text-muted-foreground">Growth since 2002</div>
          </div>
          <div className="p-4 bg-orange-100 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">56%</div>
            <div className="text-sm text-muted-foreground">Projected growth by 2025</div>
          </div>
          <div className="p-4 bg-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">Early</div>
            <div className="text-sm text-muted-foreground">Intervention is key</div>
          </div>
        </motion.div>
      </Card>
    </div>
  );
};