'use client';
import Link from 'next/link';
import { ProfilePicture } from '@/common/components/profile-picture';
import { WaveCircle } from './components/wave-circle';
import { ChevronRight } from 'lucide-react';
import { NewChat } from './components/new-chat';
import { UserProfilePicture } from './components/user-profile-picture';
import { useUserProvider } from '@/common/providers/user-provider';
import { FluencyLevel, FluencyLevelTag } from '@/common/types/fluency-level';
import { Loading } from '@/common/components/loading';
import LiraPfp from '/public/happy_lira.jpg';
import { HandleScore } from '@/common/utils/handle-score';

export default function Dashboard() {
  const { user } = useUserProvider();

  return user && user !== 'unlogged' ? (
    <div className="flex items-center flex-col p-4 gap-6 justify-between h-screen">
      <section className="flex justify-between w-full p-6">
        <UserProfilePicture />
      </section>
      <section className="flex flex-col w-full items-center gap-4">
        <WaveCircle percentage={HandleScore(user.score).percentage} />
        <div>
          <h3 className="text-center text-xl font-bold">{FluencyLevel[HandleScore(user.score).fluencyLevel]}</h3>
          <p className="text-center text-base">{FluencyLevelTag[HandleScore(user.score).fluencyLevel]}</p>
        </div>
      </section>
      <section className="w-full flex flex-col gap-6">
        {user.history.length > 0 && (
          <Link
            href="/dashboard/chat"
            className="flex gap-4 w-full justify-between border border-primary bg-secondary p-3 rounded-lg items-center"
          >
            <div className="flex gap-4 items-center">
              <ProfilePicture src={LiraPfp} alt="Lira Profile Picture" size={40} />
              <div className="flex flex-col">
                <h1 className="text-primary-dark text-xl font-bold -mb-[3px]">Lira</h1>
                <div className="text-success text-sm font-medium flex gap-1 items-center">
                  <div className="bg-success-light border-2 border-success w-[10px] h-[10px] rounded-full -translate-y-[0.5px]" />
                  Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-primary-dark">Continuar conversa</p>
              <ChevronRight size={22} className="text-primary-dark" />
            </div>
          </Link>
        )}
        <NewChat hasChat={user.history.length > 0} user={user} />
      </section>
    </div>
  ) : (
    <Loading />
  );
}
