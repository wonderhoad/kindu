import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import c1Image from "@/assets/c1.png";
import c2Image from "@/assets/c2.png";

export const InteractiveImages = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const images = [
    { src: c1Image, alt: "Kindu Cube Design 1" },
    { src: c2Image, alt: "Kindu Cube Design 2" }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, images.length]);

  const handleImageClick = () => {
    setIsAutoPlay(false);
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlay(false);
    setCurrentImage(index);
  };

  return (
    <div className="relative group cursor-pointer" onClick={handleImageClick}>
      <div className="aspect-square rounded-3xl overflow-hidden kindu-shadow-warm">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={images[currentImage].src}
            alt={images[currentImage].alt}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ 
              duration: 0.6,
              ease: "easeInOut"
            }}
          />
        </AnimatePresence>
        
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ opacity: 1 }}
        >
                   <motion.div
           className="text-white text-sm sm:text-lg font-semibold bg-black/50 px-3 sm:px-4 py-2 rounded-full"
           initial={{ y: 10, opacity: 0 }}
           whileHover={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.2 }}
         >
           <span className="hidden sm:inline">Click to switch</span>
           <span className="sm:hidden">Tap to switch</span>
         </motion.div>
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              handleDotClick(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImage
                ? 'bg-primary scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      {isAutoPlay && (
        <motion.div
          className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Auto-play
        </motion.div>
      )}

      {/* Floating animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 1, -1, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};