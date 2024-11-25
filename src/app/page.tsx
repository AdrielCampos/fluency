import { GoogleLogin } from '@/common/components/google-login';
import { ProfilePicture } from '@/common/components/profile-picture';
import LiraPfp from '/public/happy_lira.jpg';

export default function Home() {
  return (
    <div className="w-full min-h-screen p-8 py-12 flex flex-col items-center justify-between gap-16">
      <h1 className="text-4xl font-bold text-center">Fluency</h1>
      <div className="flex flex-col items-center justify-center gap-4">
        <ProfilePicture src={LiraPfp} size={84} alt="Lira Profile Picture" />
        <h2 className="text-center text-2xl font-semibold ">Aprenda inglês com a Lira</h2>
        <p className="text-center text-sm">
          Converse com uma inteligência artificial que vai te ajudar a aprender inglês de forma rápida e eficiente.
        </p>
      </div>
      <GoogleLogin />
    </div>
  );
}
