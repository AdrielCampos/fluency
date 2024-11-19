'use client';
import { Form } from '@/common/components/form/form-provider';
import { Input } from '@/common/components/form/input';
import { MessageType } from '@/common/types/chat';
import { sendMessage } from '@/server/gemini/chat';
import { Content } from '@google/generative-ai';
import { ChevronLeft, Send } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<Content[]>([]);

  const sendClientMessage = async (values: Record<string, unknown>) => {
    try {
      if (!values.message || typeof values.message !== 'string') {
        throw new Error('Message is required');
      }
      const res = await sendMessage({ fluencyLevel: 'a1', history, message: { text: values.message, type: 'user' } });
      if (res.res !== 200) {
        throw new Error('Failed to send message');
      }
      setMessage('');
      setHistory(JSON.parse(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex items-center flex-col px-4">
      <div className="flex flex-start w-full py-6 gap-4 items-center">
        <ChevronLeft size={24} className="text-primary-dark" />
        <div>
          <Image
            src="/pfp.jpeg"
            className="rounded-full outline outline-primary-dark outline-2 outline-offset-4"
            width={40}
            height={40}
            alt="Profile Picture"
          />
        </div>
        <div>
          <h1 className="text-primary-dark text-xl font-bold">Lira</h1>
          <div className="text-primary-dark text-sm flex gap-1 items-center">
            <div className="bg-success w-2 h-2 rounded-full -translate-y-[1px]" />
            Online
          </div>
        </div>
      </div>
      <div className="w-full flex-1 flex gap-2 flex-col h-full overflow-y-scroll scrollbar">
        {history.slice(1).map((content, index) => {
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
      </div>
      <Form onSubmit={sendClientMessage} className="w-full flex gap-3 py-4">
        <Input
          name="message"
          type="text"
          placeholder="Mensagem"
          validation={['required']}
          className="flex-1"
          onChange={setMessage}
          value={message}
        />
        <button
          type="submit"
          className="bg-primary-dark text-secondary-light aspect-square w-10 h-10 flex items-center justify-center rounded-full"
        >
          <Send size={19} className="-translate-x-[1.5px] translate-y-[1px]" />
        </button>
      </Form>
    </div>
  );
}
