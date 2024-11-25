'use client';
import { Loading } from '@/common/components/loading';
import { Popover } from '@/common/components/popover/popover.component';
import { useUserProvider } from '@/common/providers/user-provider';
import { User } from '@/common/types/database-user';
import { setChat } from '@/server/firebase/chat';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const NewChat = ({ hasChat, user }: { hasChat: boolean; user: User }) => {
  const { refresh } = useUserProvider();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const createNewChat = async () => {
    setLoading(true);
    setActive(false);
    const { res } = await setChat(user.uid, [], user.score);

    if (res === 200) {
      await refresh();
      router.push('/dashboard/chat');
      return;
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => {
          if (hasChat) {
            setActive(true);
          } else {
            createNewChat();
          }
        }}
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
      {loading && <Loading />}
    </>
  );
};
