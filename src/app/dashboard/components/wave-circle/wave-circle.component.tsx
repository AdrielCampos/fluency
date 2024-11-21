import { memo } from 'react';
import './wave-circle.styled.css';

export const WaveCircle = memo(function WaveCircle({ percentage }: { percentage: number }) {
  const generateRandomValues = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const data = Array.from({ length: 15 }, () => ({
    size: generateRandomValues(5, 15),
    delay: generateRandomValues(0, 5),
    duration: generateRandomValues(5, 8),
    left: generateRandomValues(0, 100),
  }));

  const calculateCustomTranslate = (percentage: number): string => {
    return `-${((percentage - 10) / 10) * 5 + 55}%`;
  };

  return (
    <div className="circle">
      <div
        className="wave before:animate-wave after:animate-waveSlow overflow-hidden"
        // @ts-expect-error: percentage is not typed
        style={{ '--custom-translate': calculateCustomTranslate(percentage) }}
      >
        <ul
          className="absolute bottom-0 left-0 w-full overflow-hidden"
          style={{
            height: `${percentage - 5}%`,
          }}
        >
          {data.map((circle, i) => (
            <li
              key={i}
              className="absolute bottom-[-150px] bg-primary-light opacity-20 rounded-full aspect-square"
              style={{
                width: `${circle.size}%`,
                left: `${circle.left}%`,
                animation: `animate ${circle.duration}s linear infinite`,
                animationDelay: `${circle.delay}s`,
              }}
            />
          ))}
        </ul>
      </div>
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(255,255,255,0.8)]">
        {percentage}%
      </p>
    </div>
  );
});
