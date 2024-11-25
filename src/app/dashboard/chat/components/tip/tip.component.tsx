'use client';
import { cn } from '@/common/utils/cn';
import { X } from 'lucide-react';

export const Tip = ({
  active,
  setActive,
  tip,
}: {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  tip: string;
}) => {
  return (
    <>
      <div
        data-state={active ? 'open' : 'closed'}
        className={cn('h-screen w-screen fixed bg-secondary opacity-50 hidden top-0 left-0', 'data-[state=open]:block')}
        onClick={() => setActive(false)}
      />
      <div
        data-state={active ? 'open' : 'closed'}
        className={cn(
          'w-3/4 shadow-md bg-secondary-light fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 hidden flex-col gap-6',
          'data-[state=open]:flex data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fill-mode-forwards',
        )}
      >
        <div className="w-full flex justify-between">
          <h3 className="text-lg font-medium">English Tip</h3>
          <button onClick={() => setActive(false)} className="h-full aspect-square">
            <X size={18} />
          </button>
        </div>
        <p>{tip}</p>
      </div>
    </>
  );
};
