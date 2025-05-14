import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ImageWithFallback = ({ src, alt, className, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      <motion.img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback; 