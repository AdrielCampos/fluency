'use client';
import { useEffect, useRef, useState } from 'react';
import { Form } from '@/common/components/form/form-provider';
import { Input } from '@/common/components/form/input';
import { sendMessage } from '@/server/gemini/chat';
import { Content } from '@google/generative-ai';
import { ChevronLeft, Lightbulb, Send } from 'lucide-react';
import { ProfilePicture } from '@/common/components/profile-picture';
import { Messages } from './components/messages';
import LiraPfp from '/public/happy_lira.jpg';
import ElatedLiraPfp from '/public/elated_lira.jpg';
import SadLiraPfp from '/public/sad_lira.jpg';
import Link from 'next/link';
import { setChat } from '@/server/firebase/chat';
import { useUserProvider } from '@/common/providers/user-provider';
import { Loading } from '@/common/components/loading';
import { MessageType } from '@/common/types/chat';
import { Tip } from './components/tip';

export default function Chat() {
  const { user, refresh } = useUserProvider();
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentTip, setCurrentTip] = useState('');
  const [tipActive, setTipActive] = useState(false);
  const targetRef = useRef<HTMLSpanElement>(null);

  const sendClientMessage = async (values: Record<string, unknown>) => {
    try {
      if (!values.message || typeof values.message !== 'string') {
        throw new Error('Message is required');
      }
      if (!user || user === 'unlogged') {
        throw new Error('User is not logged in');
      }
      setMessage('');
      setLoading(true);

      const actualHistory = history;

      setHistory((lastValues) => [
        ...lastValues,
        {
          role: 'user',
          parts: [
            {
              text: JSON.stringify({
                type: 'user',
                text: values.message,
              }),
            },
          ],
        },
      ]);

      const res = await sendMessage({
        score: user.score,
        history: actualHistory,
        message: { text: values.message, type: 'user' },
      });
      if (res.res !== 200) {
        throw new Error('Failed to send message');
      }

      const newHistory = JSON.parse(res.data) as Content[];
      const lastMessage = JSON.parse(newHistory[newHistory.length - 1].parts[0].text || '') as MessageType;

      setCurrentTip(lastMessage.tip || '');
      await setChat(user.uid, newHistory, user.score + +lastMessage.score);
      refresh();

      setLoading(false);
      setHistory(newHistory);
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && user !== 'unlogged' && user.history && user.history.length > 0 && user.history[0].parts[0].text) {
      const lastMessage = JSON.parse(user.history[user.history.length - 1].parts[0].text || '') as MessageType;
      setCurrentTip(lastMessage.tip || '');
      setHistory(user.history);
    }
  }, [user]);

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  return user && user !== 'unlogged' ? (
    <div className="h-screen flex items-center flex-col p-4">
      <div className="flex w-full mb-6 mt-2 items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          <Link className="h-full flex items-center justify-center" href="/dashboard">
            <ChevronLeft size={24} className="text-primary-dark" />
          </Link>
          <ProfilePicture
            src={
              history.length > 0
                ? JSON.parse(history[history.length - 1].parts[0].text || '').emotion === 'elated'
                  ? ElatedLiraPfp
                  : JSON.parse(history[history.length - 1].parts[0].text || '').emotion === 'sad'
                  ? SadLiraPfp
                  : LiraPfp
                : LiraPfp
            }
            size={40}
            alt="Lira Profile Picture"
          />
          <div className="flex flex-col">
            <h1 className="text-primary-dark text-xl font-bold -mb-[3px]">Lira</h1>
            <div className="text-success text-sm font-medium flex gap-1 items-center">
              <div className="bg-success-light border-2 border-success w-[10px] h-[10px] rounded-full -translate-y-[0.5px]" />
              Online
            </div>
          </div>
        </div>
        {currentTip && (
          <>
            <div
              onClick={() => setTipActive(true)}
              className="rounded-full aspect-square h-4/5 bg-info flex items-center justify-center mr-4 animate-pulse cursor-pointer"
            >
              <Lightbulb className="text-info-foreground" size={18} />
            </div>
            <Tip active={tipActive} setActive={setTipActive} tip={currentTip} />
          </>
        )}
      </div>
      <div className="w-full flex-1 flex gap-2 px-1 flex-col h-full overflow-y-scroll scrollbar">
        <Messages history={history} loading={loading} />
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
          disabled={loading}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-primary-dark text-secondary-light aspect-square w-10 h-10 flex items-center justify-center rounded-full"
        >
          <Send size={19} className="-translate-x-[1.5px] translate-y-[1px]" />
        </button>
      </Form>
    </div>
  ) : (
    <Loading />
  );
}
