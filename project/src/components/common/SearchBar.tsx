import React, { useState } from "react";
import { Search, Calendar, Users, MapPin, Mic } from "lucide-react";

interface SearchBarProps {
  onSearch: (searchData: any) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = "" }) => {
  const [searchData, setSearchData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 2,
  });

  const [listening, setListening] = useState(false);

  const handleSearch = () => {
    onSearch(searchData);
  };

  const startVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;

    const questions = [
      { key: "destination", text: "Where do you want to go?" },
      { key: "startDate", text: "What is your check-in date? Please say like September 15 2025." },
      { key: "endDate", text: "What is your check-out date? Please say like September 20 2025." },
      { key: "travelers", text: "How many travelers?" },
    ];

    let currentStep = 0;

    const askQuestion = () => {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(questions[currentStep].text);

      utterance.onend = () => {
        recognition.stop();
        setTimeout(() => {
          recognition.start();
          setListening(true);
        }, 500);
      };

      speechSynthesis.speak(utterance);
    };

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      // ✅ Remove trailing punctuation like . , ! ?
      transcript = transcript.trim().replace(/[.,!?]$/, "");
      console.log("🎤 Transcript:", transcript);

      setSearchData((prev) => {
        let value: any = transcript;

        // ✅ Special handling
        if (questions[currentStep].key === "travelers") {
          const num = parseInt(transcript.replace(/\D/g, "")) || 1;
          value = num;
        }

        if (questions[currentStep].key === "startDate" || questions[currentStep].key === "endDate") {
          try {
            const parsed = new Date(transcript);
            if (!isNaN(parsed.getTime())) {
              // convert → YYYY-MM-DD
              value = parsed.toISOString().split("T")[0];
            }
          } catch (e) {
            console.warn("Could not parse date:", transcript);
          }
        }

        return { ...prev, [questions[currentStep].key]: value };
      });

      if (event.results[0].isFinal) {
        recognition.stop();
        setListening(false);

        currentStep++;
        if (currentStep < questions.length) {
          askQuestion();
        } else {
          speechSynthesis.cancel();
          onSearch({ ...searchData });
        }
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Voice error:", event.error);
      setListening(false);
      recognition.stop();

      if (event.error === "no-speech") {
        alert("I didn’t hear anything. Try again after speaking clearly.");
      }
    };

    recognition.onend = () => {
      setListening(false);
    };

    askQuestion();
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">
        {/* Destination */}
        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <MapPin size={16} className="mr-1 text-blue-600" />
            Where to?
          </label>
          <input
            type="text"
            placeholder="Enter destination"
            value={searchData.destination}
            onChange={(e) =>
              setSearchData({ ...searchData, destination: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <Calendar size={16} className="mr-1 text-blue-600" />
            Check-in
          </label>
          <input
            type="date"
            value={searchData.startDate}
            onChange={(e) =>
              setSearchData({ ...searchData, startDate: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <Calendar size={16} className="mr-1 text-blue-600" />
            Check-out
          </label>
          <input
            type="date"
            value={searchData.endDate}
            onChange={(e) =>
              setSearchData({ ...searchData, endDate: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>

        {/* Travelers */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <Users size={16} className="mr-1 text-blue-600" />
            Travelers
          </label>
          <select
            value={searchData.travelers}
            onChange={(e) =>
              setSearchData({
                ...searchData,
                travelers: parseInt(e.target.value),
              })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Person" : "People"}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-orange-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Search size={18} />
          <span>Search</span>
        </button>

        {/* 🎤 Mic Button */}
        <button
          type="button"
          onClick={startVoiceSearch}
          className={`p-3 rounded-full transition-all duration-300 flex items-center justify-center 
            ${
              listening
                ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-400"
                : "bg-gray-100 hover:bg-gray-200 text-blue-600"
            }`}
        >
          <Mic size={20} />
        </button>
      </div>

      {listening && (
        <p className="text-xs text-red-500 mt-2 animate-pulse">Listening...</p>
      )}
    </div>
  );
};

export default SearchBar;
