import { MessageType } from '@/common/types/chat';
import { Content } from '@google/generative-ai';
import { memo } from 'react';

export const Messages = memo(function Messages({ history, loading }: { history: Content[]; loading: boolean }) {
  const slicedHistory = history.length === 1 ? history : history.slice(2);
  return (
    <>
      {slicedHistory.map((content) => {
        return content.parts.map((part, index) => {
          if (part.text?.startsWith('{')) {
            const message = JSON.parse(part.text) as MessageType;
            console.log(message);
            return (
              <p
                key={index}
                className={`rounded-xl w-fit max-w-[70%] p-2 px-4 text-sm ${
                  message.type === 'model'
                    ? 'bg-primary-light text-background-foreground self-start rounded-bl-none'
                    : 'bg-primary-dark text-secondary-light self-end rounded-br-none'
                }`}
              >
                {message.text}
              </p>
            );
          }
        });
      })}
      {loading && (
        <div className="rounded-xl w-fit max-w-[70%] p-2 px-4 text-sm bg-primary-light text-background-foreground self-start rounded-bl-none relative">
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
