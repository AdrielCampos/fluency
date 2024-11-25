import { Typewriter } from '@/common/components/typewriter';
import { MessageType } from '@/common/types/chat';
import { Content } from '@google/generative-ai';
import { memo, useMemo } from 'react';

export const Messages = memo(function Messages({ history, loading }: { history: Content[]; loading: boolean }) {
  const slicedHistory = history.length === 1 ? history : history.slice(2);

  const lastModelMessageIndex = useMemo(() => {
    for (let i = slicedHistory.length - 1; i >= 0; i--) {
      const content = slicedHistory[i];
      for (let j = content.parts.length - 1; j >= 0; j--) {
        if (content.parts[j].text?.startsWith('{')) {
          const message = JSON.parse(content.parts[j].text || '') as MessageType;
          if (message.type === 'model') {
            return { contentIndex: i, partIndex: j };
          }
        }
      }
    }
    return null;
  }, [slicedHistory]);

  return (
    <>
      {slicedHistory.map((content, contentIndex) => {
        return content.parts.map((part, partIndex) => {
          if (part.text?.startsWith('{')) {
            const message = JSON.parse(part.text) as MessageType;
            const isLastModelMessage =
              lastModelMessageIndex &&
              lastModelMessageIndex.contentIndex === contentIndex &&
              lastModelMessageIndex.partIndex === partIndex;
            return (
              <p
                key={partIndex}
                className={`rounded-xl w-fit max-w-[70%] p-2 px-4 text-sm ${
                  message.type === 'model'
                    ? 'bg-primary-light text-background-foreground self-start rounded-bl-none'
                    : 'bg-primary-dark text-secondary-light self-end rounded-br-none'
                }
                `}
              >
                {isLastModelMessage ? <Typewriter phrase={message.text} /> : message.text}
              </p>
            );
          }
        });
      })}
      {loading && (
        <div className="rounded-xl w-fit max-w-[70%] p-3 px-4 text-sm bg-primary-light text-background-foreground self-start rounded-bl-none relative">
          <div className="w-full flex justify-center items-center gap-2 translate-y-[2px]">
            <div className="h-[10px] aspect-square bg-primary-dark rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="h-[10px] aspect-square bg-primary-dark rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="h-[10px] aspect-square bg-primary-dark rounded-full animate-bounce" />
          </div>
        </div>
      )}
    </>
  );
});
