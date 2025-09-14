import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, TrendingUp, Users, Shield, Award } from "lucide-react";
import SearchBar from "../components/common/SearchBar";
import PackageCard from "../components/packages/PackageCard";
import DestinationCard from "../components/destinations/DestinationCard";
import AgentCard from "../components/agents/AgentCard";
import TestimonialCard from "../components/testimonials/TestimonialCard";
import {
  mockPackages,
  mockDestinations,
  mockAgents,
  mockTestimonials,
} from "../data/mockData";

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
  onShowInquiryForm: (packageTitle?: string) => void;
}

// ✅ Count-up hook
const useCountUp = (end: number, duration = 2000, trigger: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [end, duration, trigger]);

  return count;
};

const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onShowInquiryForm,
}) => {
  // ---------------- Typing Effect ----------------
  const [currentWord, setCurrentWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const words = ["Adventure", "Destination", "Experience", "Journey", "Escape"];

  useEffect(() => {
    const typingSpeed = isDeleting ? 80 : 150;

    const handleTyping = () => {
      const current = words[wordIndex];
      if (!isDeleting) {
        setCurrentWord(current.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setCurrentWord(current.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, words]);
  // ------------------------------------------------

  const stats = [
    { icon: Users, value: 50000, label: "Happy Travelers", suffix: "+" },
    { icon: Shield, value: 500, label: "Verified Agents", suffix: "+" },
    { icon: Award, value: 1000, label: "Tour Packages", suffix: "+" },
    { icon: TrendingUp, value: 99, label: "Satisfaction Rate", suffix: "%" },
  ];

  const [inView, setInView] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  const handleSearch = (searchData: any) => {
    console.log("Search data:", searchData);
    onNavigate("packages", { searchData });
  };

  const featuredPackages = mockPackages.filter((pkg) => pkg.featured);
  const popularDestinations = mockDestinations.filter((dest) => dest.popular);
  const topAgents = mockAgents.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 overflow-hidden py-28 md:py-36">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Travel Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-orange-600/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
            Discover Your Next{" "}
            <span className="block bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              {currentWord}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Connect with trusted travel experts and create unforgettable
            journeys. From spiritual pilgrimages to exotic getaways, we make
            your travel dreams come true.
          </p>
            
          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            className="max-w-4xl mx-auto mb-10"
          />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
            <button
              onClick={() => onNavigate("packages")}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Explore Packages</span>
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => onShowInquiryForm()}
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Plan Custom Trip</span>
            </button>
          </div>
        </div>

        {/* Floating Stats */}
        <div
          ref={statsRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex space-x-8"
        >
          {stats.map((stat, index) => {
            const count = useCountUp(stat.value, 2000, inView);
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-center shadow-lg hover:bg-white/20 transition"
              >
                <stat.icon className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {count.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Popular Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore breathtaking locations around the world with our curated
              destination guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {popularDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onExplore={(destinationId) =>
                  onNavigate("destination-details", { destinationId })
                }
              />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate("destinations")}
              className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-orange-600 transition-all inline-flex items-center space-x-2"
            >
              <span>Explore All Destinations</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Trusted Travel Agents */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Trusted Travel Agents
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with verified and experienced travel professionals for
              personalized service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {topAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onContact={() => onShowInquiryForm()}
                onViewProfile={(agentId) =>
                  onNavigate("agent-profile", { agentId })
                }
              />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate("agents")}
              className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-orange-600 transition-all inline-flex items-center space-x-2"
            >
              <span>View All Agents</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from real travelers who trusted us with their
              dream vacations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of happy travelers who have discovered their perfect
            trip with TourConnect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onShowInquiryForm()}
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Get Your Free Quote
            </button>
            <button
              onClick={() => onNavigate("agents")}
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all"
            >
              Find Travel Agent
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
