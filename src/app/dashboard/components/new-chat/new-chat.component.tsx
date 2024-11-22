'use client';
import { Popover } from '@/common/components/popover/popover.component';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const NewChat = () => {
  const router = useRouter();
  const [active, setActive] = useState(false);

  const createNewChat = () => {
    console.log('yes');
    setActive(false);
    router.push('/dashboard/chat');
  };

  return (
    <>
      <button
        onClick={() => setActive(true)}
        className="flex gap-2 w-full bg-primary-dark text-secondary-light items-center justify-center p-3 rounded-lg border-none"
      >
        <Plus size={22} />
        <p>Nova conversa</p>
      </button>
      <Popover
        label="Deseja criar uma nova conversa? Esta ação excluirá a conversa atual."
        active={active}
        yes={{
          onClick: createNewChat,
          label: 'Criar',
        }}
        no={{
          onClick: () => setActive(false),
          label: 'Cancelar',
        }}
      />
    </>
  );
};
