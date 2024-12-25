import React, { useEffect, useState } from 'react';
import heroImage from '../images/hero.webp';
import backgroundMusic from '../audio/music.mp3';
import { VolumeX, Volume2 } from 'lucide-react';
import { ImPointRight } from "react-icons/im";

const dialogues = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. dadadddadasss ",
  "O I I A O O I I I A",
];

export default function Hero() {
  const [dialogue, setDialogue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleDialogue = () => {
    if (dialogue < dialogues.length - 1) {
      setDialogue(dialogue + 1);
    } else {
      setModalOpen(true);
    }
  };

  // const handleYes = () => {
  //   setModalOpen(false);
  // };

  // const handleNo = () => {
  //   setModalOpen(false);
  //   setDialogue(0);
  // };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    const audio = document.getElementById('background-audio') as HTMLAudioElement;
    if (audio) {
      audio.volume = 0.5;
      audio.muted = isMuted;
      audio.play().catch((err) => console.error('Falha ao reproduzir o áudio:', err));
    }
  }, [isMuted]);

  return (
    <div className="relative flex flex-col gap-y-1 m-1">

      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 bg-black opacity-70 text-white p-3 rounded-full shadow-md hover:bg-gray-800 z-50"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>


      <audio id="background-audio" src={backgroundMusic} loop autoPlay hidden></audio>


      <div className="flex justify-between items-end">
        <p className="bg-black border-4 h-[4.5vh] w-[6vh] text-2xl font-bold flex justify-center items-center border-white text-white">
          LEO
        </p>
        <img src={heroImage} alt="hero" className="size-32 bg-black border-white border-4" />
      </div>


      <div className="bg-black border-white border-4 h-[16vh] flex flex-col justify-between">
        <p className="text-3xl max-w-[100vw] text-white leading-6 p-2 max-h-1">{dialogues[dialogue]}</p>
        <button
          onClick={handleDialogue}
          className="p-1 m-1 flex self-end bottom-1"
        >
          <ImPointRight className='text-red-700 size-7' />
        </button>
      </div>


      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-black p-6 shadow-lg text-center text-white border-4 border-white">
            <p className="text-xl font-bold mb-4">voce deseja continuar?</p>
            <div className="flex flex-col">
              <div className='flex items-center gap-x-2'>
                <ImPointRight className='text-red-700 size-7' />
                <a
                  href="/yes"
                  className="text-6xl"
                >
                  SIM
                </a>
              </div>

              <a
                href='/no'
                className="text-6xl"
              >
                NAO
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
