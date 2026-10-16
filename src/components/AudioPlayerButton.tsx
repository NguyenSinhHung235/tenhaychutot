import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speechManager } from '../utils/speech';

interface AudioPlayerButtonProps {
  textToRead: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({
  textToRead,
  label = 'Nghe phát âm',
  className = '',
  size = 'md'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      // Stop speech when component unmounts
      if (isPlaying) {
        speechManager.stop();
      }
    };
  }, [isPlaying]);

  const toggleSpeech = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      speechManager.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speechManager.speak(
        textToRead,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        () => setIsPlaying(false)
      );
    }
  };

  const sizeClasses = {
    sm: 'min-h-[38px] px-3 py-1.5 text-xs',
    md: 'min-h-[44px] px-4 py-2 text-sm',
    lg: 'min-h-[48px] px-5 py-2.5 text-base font-semibold',
  };

  return (
    <button
      type="button"
      onClick={toggleSpeech}
      aria-label={`${label}: ${textToRead}`}
      className={`inline-flex items-center justify-center gap-2 rounded-xl transition-all font-medium border active:scale-95 cursor-pointer select-none focus:ring-2 focus:ring-blue-500 focus:outline-none ${
        isPlaying
          ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-400 text-amber-900 dark:text-amber-200 animate-pulse ring-2 ring-amber-400/50'
          : 'bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
      } ${sizeClasses[size]} ${className}`}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-4 h-4 text-amber-600 dark:text-amber-300 animate-spin" />
          <span>Đang đọc... (Bấm dừng)</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
