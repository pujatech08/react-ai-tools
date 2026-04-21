function RecentSearch({ recentHistory,setRecentHistory,askQuestion}){
     // 🔥 Clear history
  const clearHistory = () => {
    localStorage.removeItem("history");
    setRecentHistory([]);
  };
   
    return(
        <>
        
      {/* Sidebar */}
      <div className="col-span-1 dark:bg-zinc-800">
        <h1 className="text-xl dark:text-white text-zinc-800 pt-3 flex justify-center gap-2">
          <span>Recent search</span>
          <button onClick={clearHistory}>🗑</button>
        </h1>

        <ul className="text-left overflow-auto mt-2">
          {recentHistory.map((item, index) => (
            <li
              key={index}
              onClick={() => askQuestion(item)}
              className="pl-5 px-5 truncate dark:text-zinc-400 cursor-pointer dark:hover:bg-zinc-700 dark:hover:text-zinc-200" hover:bg-red-200 hover:text-zinc-800
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
        </>
    )
}

export default RecentSearch