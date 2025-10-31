
// константы для экранчика
export const resultElement = document.querySelector('.result') as HTMLElement;
export const screenElement = document.querySelector('.screen') as HTMLElement;

// константы для плеера
export const audio: HTMLAudioElement = document.getElementById('audio-element') as HTMLAudioElement;
export const playPauseBtn: HTMLButtonElement = document.getElementById('play-pause-btn') as HTMLButtonElement;
export const progressFill: HTMLElement = document.querySelector('.progress-fill') as HTMLElement;
export const seekBar: HTMLInputElement = document.querySelector('.seek-bar') as HTMLInputElement;
export const thumb: HTMLElement = document.querySelector('.thumb') as HTMLElement;
export const currentTimeEl: HTMLElement = document.getElementById('current-time') as HTMLElement;
export const durationEl: HTMLElement = document.getElementById('duration') as HTMLElement;
export const progressBar: HTMLElement = document.querySelector('.progress-bar') as HTMLElement;
export const songUrl: HTMLElement = document.querySelector('.--song') as HTMLElement;