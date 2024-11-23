import { ProfilePicture } from '@/common/components/profile-picture';
import { WaveCircle } from './components/wave-circle';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { NewChat } from './components/new-chat';
import { UserProfilePicture } from './components/user-profile-picture';
import LiraPfp from '/public/neutral_lira.jpg';

export default function Dashboard() {
  return (
    <div className="flex items-center flex-col p-4 gap-6 justify-between h-screen">
      <section className="flex justify-between w-full p-6">
        <UserProfilePicture />
      </section>
      <section className="flex flex-col w-full items-center gap-4">
        <WaveCircle percentage={30} />
        <div>
          <h3 className="text-center text-xl font-bold">Iniciante</h3>
          <p className="text-center text-base">A1</p>
        </div>
      </section>
      <section className="w-full flex flex-col gap-6">
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
            <p className="text-sm text-primary-dark">
              Continuar última <br /> conversa
            </p>
            <ChevronRight size={22} className="text-primary-dark" />
          </div>
        </Link>
        <NewChat />
      </section>
    </div>
  );
}
