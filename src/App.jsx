import { useEffect, useRef, useState } from "react";
import { URL } from "./constants";
import "./App.css";

import RecentSearch from "./components/RecentSearch.jsx";
import QuestionAnswer from "./components/QuestionAnswer.jsx";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || [],
  );
  const [loader, setLoader] = useState(false);

  const scrollRef = useRef(null);

  // 🔥 Main function
  const askQuestion = async (inputValue) => {
    const payloadData = inputValue || question;
    if (!payloadData) return;

    // ✅ Save only typed questions
    if (!inputValue) {
      let history = JSON.parse(localStorage.getItem("history")) || [];

      history = history.filter((item) => item !== question);
      history = [question, ...history];

      localStorage.setItem("history", JSON.stringify(history));
      setRecentHistory(history);
    }

    setLoader(true);

    try {
      let response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: payloadData }] }],
        }),
      });

      response = await response.json();

      let dataString =
        response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      dataString = dataString.split("* ").map((item) => item.trim());

      setResult((prev) => [
        ...prev,
        { type: "q", text: payloadData },
        { type: "a", text: dataString },
      ]);

      if (!inputValue) setQuestion("");
    } catch (err) {
      console.error(err);
    } finally {
      // ✅ keep loader visible briefly
      setTimeout(() => setLoader(false), 500);

      // ✅ smooth scroll
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  // 🔥 Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      askQuestion();
    }
  };

  //Dark mode feature
  const [darkMode, setDarkMode] = useState("dark");
  useEffect(()=>{
    if(darkMode == "dark"){
          document.documentElement.classList.add("dark") 
    }else{
      document.documentElement.classList.remove("dark");
    }
  })
  //

  return (
    <div className={darkMode=='dark' ? 'dark':'light'}>
      <div className="grid grid-cols-5 h-screen text-center">
        <select onChange={(event)=> setDarkMode(event.target.value)} className="fixed text-white bottom-0 p-5">
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <RecentSearch
          recentHistory={recentHistory}
          setRecentHistory={setRecentHistory}
          askQuestion={askQuestion}
        />

        {/* Main */}
        <div className="col-span-4 p-10 flex flex-col">
          {/* Heading */}
          <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700 mb-4">
            Hello User, Ask me Anything
          </h1>

          {/* Chat */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4">
            <ul className="flex flex-col gap-3 dark:text-zinc-300 bg-grey:800">
              {result.map((item, index) => (
                <QuestionAnswer key={index} item={item} index={index} />
              ))}

              {/* ✅ Loader here */}
              {loader && (
                <li className="flex justify-start">
                  <div className="p-2 text-white animate-pulse">Typing...</div>
                </li>
              )}
            </ul>
          </div>

          {/* Input */}
          <div className="dark:bg-zinc-800 bg-red-100 w-1/2 p-1 pr-5 dark:text-white text-zinc-800 m-auto rounded-4xl border border-zinc-700 flex h-16 mt-4">
            <input
              type="text"
              value={question}
              onKeyDown={handleKeyDown}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full h-full p-3 outline-none bg-transparent"
              placeholder="Ask me anything"
            />
            <button onClick={() => askQuestion()} className="px-4">
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
