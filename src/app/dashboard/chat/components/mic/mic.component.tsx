/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Mic as MicIcon, Send, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export const Mic = ({
  open,
  setOpen,
  setResponse,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setResponse: (response: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (open) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      setRecognition(recognition);
    } else {
      setRecognition(null);
    }
  }, [open]);

  const startSpeech = useCallback(() => {
    if (recognition) {
      recognition.start();
    }
  }, [recognition]);

  const sendSpeech = useCallback(() => {
    if (recognition) {
      setLoading(true);
      recognition.onresult = (e: any) => {
        recognition.abort();
        setResponse(e.results[0][0].transcript);
        setOpen(false);
        setLoading(false);
      };
    }
  }, [recognition, setResponse, setOpen]);

  const stopSpeech = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setOpen(false);
    }
  }, [recognition, setOpen]);

  useEffect(() => {
    if (recognition) {
      startSpeech();
    }
  }, [recognition, startSpeech]);

  return open ? (
    <div className="fixed top-0 left-0 z-30 h-screen w-screen">
      <div className="w-full h-full bg-primary opacity-90" />
      <div className="w-full h-full flex flex-col items-center justify-center text-secondary-light absolute top-0 left-0">
        <div className="flex flex-col items-center justify-center gap-8">
          <MicIcon size={72} className="drop-shadow-md" />
          <div className="h-16 w-72 flex items-center justify-center gap-4">
            <div className="h-[60%] w-6 bg-secondary-light rounded-full animate-speechDelay" />
            <div className="h-[60%] w-6 bg-secondary-light rounded-full animate-speech" />
            <div className="h-[60%] w-6 bg-secondary-light rounded-full animate-speechDelay" />
          </div>
        </div>
        {!loading && (
          <div className="flex w-full items-center justify-center gap-16 absolute bottom-10">
            <button className="p-4 drop-shadow-md bg-secondary-light rounded-full text-foreground" onClick={stopSpeech}>
              <X size={26} />
            </button>
            <button className="p-4 drop-shadow-md bg-primary-dark rounded-full" onClick={sendSpeech}>
              <Send size={24} className="-translate-x-[1.5px] translate-y-[1px]" />
            </button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};
