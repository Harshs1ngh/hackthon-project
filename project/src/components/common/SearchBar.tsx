import React, { useState, useEffect, useRef } from "react";
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
  const emmaVoice = useRef<SpeechSynthesisVoice | null>(null);

  // ✅ Preload Emma voice on mount
  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      const emma = voices.find(
        (v) =>
          v.name === "Microsoft Emma Online (Natural) - English (United States)"
      );
      if (emma) {
        emmaVoice.current = emma;
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

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

    const questions = [
      { key: "destination", text: "Where do you want to go?" },
      { key: "startDate", text: "Okay! What is your check-in date? Please say like September 15 2025." },
      { key: "endDate", text: "What is your check-out date?" },
      { key: "travelers", text: "How many travelers?" },
    ];

    let currentStep = 0;
    let answers: any = { ...searchData };

    const askQuestion = () => {
      // cancel any speaking
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(questions[currentStep].text);
      if (emmaVoice.current) utterance.voice = emmaVoice.current;

      // when question is finished → start recognition
      utterance.onend = () => {
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.continuous = false;

        recognition.onstart = () => setListening(true);

        recognition.onresult = (event: any) => {
          let transcript = event.results[0][0].transcript.trim();
          console.log("🎤 Transcript:", transcript);

          // ✅ Clean transcript: remove trailing punctuation
          transcript = transcript.replace(/[.,!?]$/g, "").trim();

          let value: any = transcript;

          if (questions[currentStep].key === "destination") {
            // ✅ Extract last word as destination (e.g., "I want to go Dubai" → "Dubai")
            const words = transcript.split(" ");
            value = words[words.length - 1];
          }

          if (questions[currentStep].key === "travelers") {
            const num = parseInt(transcript.replace(/\D/g, "")) || 1;
            value = num;
          }

          if (questions[currentStep].key === "startDate" || questions[currentStep].key === "endDate") {
            const parsed = new Date(transcript);
            if (!isNaN(parsed.getTime())) {
              value = parsed.toISOString().split("T")[0];
            }
          }

          // update state + answers
          answers[questions[currentStep].key] = value;
          setSearchData((prev) => ({ ...prev, [questions[currentStep].key]: value }));
        };

        recognition.onend = () => {
          setListening(false);
          currentStep++;
          if (currentStep < questions.length) {
            setTimeout(() => askQuestion(), 500); // next Q
          } else {
            onSearch(answers); // final trigger
          }
        };

        recognition.start();
      };

      speechSynthesis.speak(utterance);
    };

    askQuestion(); // 🚀 start flow
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
