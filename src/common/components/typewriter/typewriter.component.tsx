import { useState, useEffect } from 'react';

type TypewriterProps = {
  phrase: string;
};

export function Typewriter({ phrase }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < phrase.length) {
        setDisplayedText((prev) => prev + phrase[index]);
        setIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [index, phrase]);

  return <>{displayedText || '\u00A0'}</>;
}
