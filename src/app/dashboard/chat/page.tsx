'use client';
import { useRef, useState } from 'react';
import { Form } from '@/common/components/form/form-provider';
import { Input } from '@/common/components/form/input';
import { MessageType } from '@/common/types/chat';
import { sendMessage } from '@/server/gemini/chat';
import { Content } from '@google/generative-ai';
import { ChevronLeft, Send } from 'lucide-react';
import { ProfilePicture } from '@/common/components/profile-picture';
import LiraPfp from '/public/neutral_lira.jpg';
import Link from 'next/link';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<Content[]>([]);
  const targetRef = useRef<HTMLSpanElement>(null);

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

      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex items-center flex-col p-4">
      <div className="flex flex-start w-full mb-6 mt-2 gap-4 items-center">
        <Link className="h-full flex items-center justify-center" href="/dashboard">
          <ChevronLeft size={24} className="text-primary-dark" />
        </Link>
        <ProfilePicture src={LiraPfp} size={40} alt="Lira Profile Picture" />
        <div className="flex flex-col">
          <h1 className="text-primary-dark text-xl font-bold -mb-[3px]">Lira</h1>
          <div className="text-success text-sm font-medium flex gap-1 items-center">
            <div className="bg-success-light border-2 border-success w-[10px] h-[10px] rounded-full -translate-y-[0.5px]" />
            Online
          </div>
        </div>
      </div>
      <div className="w-full flex-1 flex gap-2 flex-col h-full overflow-y-scroll scrollbar">
        {history.slice(1).map((content) => {
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
        <span ref={targetRef} />
      </div>
      <Form onSubmit={sendClientMessage} className="w-full flex gap-3 mt-4">
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
