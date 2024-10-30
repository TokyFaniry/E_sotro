import React, { useState, useEffect } from "react";

const Typewriter = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timeout); 
    }
  }, [index, text, speed]);

  return <h1 className="col">{displayedText}</h1>;
};

export default Typewriter;
