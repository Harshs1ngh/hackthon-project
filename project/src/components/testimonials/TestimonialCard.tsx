import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 text-blue-100">
        <Quote size={48} />
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-4 mb-4">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 flex items-center justify-center text-white font-semibold">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
          <p className="text-sm text-gray-600">{testimonial.location}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < testimonial.rating
                ? 'text-yellow-500 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-gray-700 italic leading-relaxed mb-4">
        "{testimonial.comment}"
      </p>

      {/* Package */}
      {testimonial.packageTitle && (
        <div className="border-t pt-4">
          <p className="text-sm text-blue-600 font-medium">
            Package: {testimonial.packageTitle}
          </p>
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;