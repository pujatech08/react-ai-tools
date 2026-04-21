import Answers from "./Answers";

const QuestionAnswer = ({ item, index }) => {
  return (
    <>
      {item.type === "q" ? (
        <li className="flex justify-end">
          <div className="p-2 dark:bg-zinc-700 bg-red-100 dark:text-white text-zinc-800 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl max-w-[70%]">
            <Answers answer={item.text} />
          </div>
        </li>
      ) : (
        item.text.map((ansItem, i) => (
          <li key={i} className="flex justify-start">
            <div className="p-2 dark:text-white text-zinc-800">
              <Answers answer={ansItem} />
            </div>
          </li>
        ))
      )}
    </>
  );
};

export default QuestionAnswer;