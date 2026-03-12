const audioContext = new (window.AudioContext || window.webkitAudioContext)();

export const playSound = (value) => {

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "sine";

  // Frequency based on bar height
  oscillator.frequency.value = value + 200;

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
  }, 50);

};