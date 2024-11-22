'use client';
import { cn } from '@/common/utils/cn';

export const Popover = ({
  label,
  active,
  yes,
  no,
}: {
  label: string;
  active: boolean;
  yes: {
    onClick: () => void;
    label: string;
  };
  no: {
    onClick: () => void;
    label: string;
  };
}) => {
  return (
    <>
      <div
        data-state={active ? 'open' : 'closed'}
        className={cn(
          'h-screen w-screen fixed bg-primary-light opacity-50 hidden top-0 left-0',
          'data-[state=open]:block',
        )}
        onClick={no.onClick}
      />
      <div
        data-state={active ? 'open' : 'closed'}
        className={cn(
          'w-3/4 bg-secondary-light fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 hidden flex-col gap-6',
          'data-[state=open]:flex data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fill-mode-forwards',
        )}
      >
        <p className="text-lg">{label}</p>
        <div className="flex flex-wrap gap-4 w-full">
          <button className="flex-1 p-3 border border-primary-dark rounded-lg" onClick={no.onClick}>
            {no.label}
          </button>
          <button className="flex-1 p-3 rounded-lg bg-primary-dark text-secondary-light" onClick={yes.onClick}>
            {yes.label}
          </button>
        </div>
      </div>
    </>
  );
};
