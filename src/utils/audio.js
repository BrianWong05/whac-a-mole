/**
 * Audio utility module for game sound effects
 * Uses HTML5 Audio API with new instance per play for overlapping sounds
 */

// Get the base URL from Vite (handles deployment paths like /whac-a-mole/)
const BASE_URL = import.meta.env.BASE_URL || '/';

// Default sound URL - uses base path for correct deployment
const DEFAULT_SOUND_URL = `${BASE_URL}pop.mp3`;
const FALLBACK_SOUND_URL = 'https://cdn.freesound.org/previews/707/707270_11523868-lq.mp3';

/**
 * Play a sound effect. Creates a new Audio instance each time to allow overlapping.
 * @param {string} [soundUrl] - Optional URL to the sound file. Defaults to pop sound.
 */
export function playSound(soundUrl = DEFAULT_SOUND_URL) {
  try {
    const audio = new Audio(soundUrl);
    
    // Handle error by trying fallback URL
    audio.onerror = () => {
      if (soundUrl !== FALLBACK_SOUND_URL) {
        // Try fallback URL if local file fails
        const fallbackAudio = new Audio(FALLBACK_SOUND_URL);
        fallbackAudio.play().catch(() => {
          // Silently fail - don't break the game for audio issues
        });
      }
    };
    
    audio.play().catch(() => {
      // Silently fail if autoplay is blocked or other error
      // This is expected on some browsers before user interaction
    });
  } catch (error) {
    // Gracefully handle any Audio API errors
    console.warn('Audio playback failed:', error);
  }
}

export default { playSound };

