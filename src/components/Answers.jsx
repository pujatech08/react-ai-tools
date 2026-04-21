import ReactMarkdown from "react-markdown";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { checkHeading, replaceHeadingStarts } from "../helper";
import SyntaxHighlighter from "react-syntax-highlighter";

const Answers = ({ answer, index, totalResult }) => {

  const isHeading = checkHeading(answer);
  const ans = replaceHeadingStarts(answer);

  const components = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");

      return !inline && match ? (
        <SyntaxHighlighter   
          {...props}
          children={ String(children).replace(/\n$/, "")}
          style={dark}
          language={match[1]}
          PreTag="div" />
      ) : (
        <code {...props} className="{className}">{children}</code>
      );
    }
  };

  return (
    <>
      {
        index == 0 && totalResult > 1 ? (
          <span className="text-3xl">{ans}</span>
        ) : isHeading ? (
          <>
          <span className="pt-2 text-lg block dark:text-white text-zinc-800">{ans}</span>
          </>
        ) : (
           <ReactMarkdown components={components}>
            {ans}
          </ReactMarkdown>
        )
      }
    </>
  );
};

export default Answers;