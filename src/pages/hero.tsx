import React, { useEffect, useState } from 'react';
import heroImage from '../../public/images/hero.webp';
import backgroundMusic from '../../public/audio/music.mp3';
import { VolumeX, Volume2 } from 'lucide-react';
import cursorNext from '../../public/images/cursor.png';

const dialogues = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc. dadadddadasss ",
  "O I I A O O I I I A",
];

export default function Hero() {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleDialogue = () => {
    if (isTyping) {
      // If still typing, show full text immediately
      setDisplayedText(dialogues[dialogueIndex]);
      setIsTyping(false);
    } else if (dialogueIndex < dialogues.length - 1) {
      // Move to next dialogue
      setDialogueIndex(dialogueIndex + 1);
      setDisplayedText('');
      setIsTyping(true);
    } else {
      // Open modal when all dialogues are finished
      setModalOpen(true);
    }
  };

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

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        if (displayedText.length < dialogues[dialogueIndex].length) {
          setDisplayedText(dialogues[dialogueIndex].slice(0, displayedText.length + 1));
        } else {
          setIsTyping(false);
        }
      }, 50); // Adjust the speed of typing here

      return () => clearTimeout(timer);
    }
  }, [displayedText, dialogueIndex, isTyping]);

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
        <p className="bg-black border-4 h-[4.5vh] w-[6vh] text-3xl flex justify-center px-7 items-center border-white text-white">
          LEO
        </p>
        <img src={heroImage} alt="hero" className="size-32 bg-black border-white border-4" />
      </div>

      <div className="bg-black px-2 border-white border-4 h-[16vh] flex flex-col justify-between">
        <p className="text-3xl max-w-[100vw] text-white leading-6 p-2 max-h-1">{displayedText}</p>
        <button
          onClick={handleDialogue}
          className="p-1 m-1 flex self-end bottom-1"
        >
          <img src={cursorNext} className='w-10 h-6' alt="Next" />
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-black p-6 shadow-lg text-center text-white border-4 border-white">
            <p className="text-xl font-bold mb-4">voce deseja continuar?</p>
            <div className="flex flex-col">
              <div className='flex items-center gap-x-2'>
                <img src={cursorNext} alt="Cursor" />
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