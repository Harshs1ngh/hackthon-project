import { useState } from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import PackagesPage from "./pages/PackagesPage";
import NatpacPage from './pages/NatpacPage';
import InquiryForm from "./components/inquiry/InquiryForm";
import TravelAgentsPage from "./components/Travelagents/TravelAgents";
import ThreeDEarth from "./pages/EarthPage";

interface User {
  id: string;
  name: string;
  email: string;
  role: "traveler" | "agent";
}

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [pageData, setPageData] = useState<any>(null);
  const [user] = useState<User | null>(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquiryPackage, setInquiryPackage] = useState<string | undefined>();

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page);
    setPageData(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowInquiryForm = (packageTitle?: string) => {
    setInquiryPackage(packageTitle);
    setShowInquiryForm(true);
  };

  const handleCloseInquiryForm = () => {
    setShowInquiryForm(false);
    setInquiryPackage(undefined);
  };

  const handleInquirySubmit = (inquiryData: any) => {
    console.log("Inquiry submitted:", inquiryData);
    // send to backend later
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onNavigate={handleNavigate}
            onShowInquiryForm={handleShowInquiryForm}
          />
        );
      case "threeDEarth":
        return <ThreeDEarth />;
      case "packages":
        return (
          <PackagesPage
            onNavigate={handleNavigate}
            onShowInquiryForm={handleShowInquiryForm}
            searchData={pageData?.searchData}
          />
        );
      case "destinations":
        return (
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center py-10">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                  Explore Destinations
                </h1>
                <p className="text-lg text-gray-600 mb-10">
                  Discover the most beautiful and exciting destinations around
                  the world.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Paris, France",
                    desc: "Experience the City of Light with its iconic Eiffel Tower, art museums, and romantic streets.",
                    img: "https://media.istockphoto.com/id/924894324/photo/eiffel-tower-in-paris-france.jpg?s=612x612",
                  },
                  {
                    title: "Bali, Indonesia",
                    desc: "Relax on pristine beaches, explore lush jungles, and immerse yourself in Balinese culture.",
                    img: "https://static.toiimg.com/thumb/msid-53331161,width-748,height-499,resizemode=4,imgsize-190155/Bali.jpg",
                  },
                  {
                    title: "Kyoto, Japan",
                    desc: "Discover ancient temples, beautiful gardens, and the rich history of Japan's cultural capital.",
                    img: "https://media.istockphoto.com/id/876560704/photo/fuji-japan-in-spring.jpg?s=612x612",
                  },
                ].map((d, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                  >
                    <img
                      src={d.img}
                      alt={d.title}
                      className="w-full h-44 object-cover rounded-t-xl"
                    />
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {d.title}
                      </h3>
                      <p className="text-sm text-gray-600">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "agents":
        return (
          <div className="min-h-screen bg-gray-50 pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center py-16">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                  Travel Agents
                </h1>
                <TravelAgentsPage />
              </div>
            </div>
          </div>
        );
      case "hotels":
        return (
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center py-12">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                  Featured Hotels
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Discover the best hotels for your stay, offering comfort and
                  luxury at great prices.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "The Grand Palace Hotel",
                    desc: "Experience luxury and comfort in the heart of the city with world-class amenities.",
                    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/02/ab/15/grand-palace-hotel-sanur.jpg?w=900&h=500&s=1",
                  },
                  {
                    title: "Seaside Resort",
                    desc: "Relax by the beach and enjoy breathtaking ocean views at our premium seaside resort.",
                    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQkmpYpAa1dg17qxwTw-Tccq5akj_8hh6bg&s",
                  },
                  {
                    title: "Mountain Retreat",
                    desc: "Escape to the mountains and enjoy a peaceful retreat surrounded by nature.",
                    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/32/6c/7b/caption.jpg?w=900&h=-1&s=1",
                  },
                ].map((hotel, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                  >
                    <img
                      src={hotel.img}
                      alt={hotel.title}
                      className="w-full h-44 object-cover rounded-t-xl"
                    />
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {hotel.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">
                        {hotel.desc}
                      </p>
                      <button
                        className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                        onClick={() => handleShowInquiryForm(hotel.title)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "natpac":
        return <NatpacPage onNavigate={handleNavigate} />;
      case "contact":
        return (
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center py-20">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                  Ready to Start Your Journey?
                </h1>
                <p className="text-lg text-gray-600">
                  Contact us today to plan your next adventure!
                </p>
                <button
                  onClick={() => handleShowInquiryForm()}
                  className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onShowInquiryForm={handleShowInquiryForm}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} user={user} />

      <main className="flex-1">{renderPage()}</main>

      <Footer onNavigate={handleNavigate} />

      <InquiryForm
        isOpen={showInquiryForm}
        onClose={handleCloseInquiryForm}
        onSubmit={handleInquirySubmit}
        packageTitle={inquiryPackage}
      />
    </div>
  );
}

export default App;
