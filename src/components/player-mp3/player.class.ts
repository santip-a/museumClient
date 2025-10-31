import { audio, currentTimeEl, durationEl, playPauseBtn, progressBar, progressFill, seekBar, thumb } from '../../constants/constants';


class Player {
  #isPlaying: boolean = false;
  #isDragging: boolean = false;

  constructor() {
    this.#init()
  }


  #init() {
    // Обновление прогресса, времени и позиции бегунка
    audio.addEventListener('loadedmetadata', () => {
      durationEl.textContent = this.#formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      if (!this.#isDragging) { // Только если не тянем thumb
        const progress: number = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = progress + '%';
        seekBar.value = progress.toString();
        thumb.style.left = progress + '%';
        currentTimeEl.textContent = this.#formatTime(audio.currentTime);
      }
    });


    // Обработка seek через range input (оставляем для совместимости)
    seekBar.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      this.#setProgress(parseFloat(target.value));
    });

    // Поддержка тач-событий для seek-bar (как было, но теперь используем #setProgress)
    seekBar.addEventListener('touchstart', (e: TouchEvent) => {
      this.#isDragging = true;
      this.#updateSeek(e.touches[0].clientX);
    });

    seekBar.addEventListener('touchmove', (e: TouchEvent) => {
      if (this.#isDragging) {
        e.preventDefault();
        this.#updateSeek(e.touches[0].clientX);
      }
    });

    seekBar.addEventListener('touchend', () => {
      this.#isDragging = false;
    });

    // КЛИК по шкале для seek (на десктопе) — теперь используем #setProgress
    progressBar.addEventListener('click', (e: MouseEvent) => {
      const rect: DOMRect = progressBar.getBoundingClientRect();
      const percent: number = (e.clientX - rect.left) / rect.width;
      this.#setProgress(percent * 100);
    });

    // Перетаскивание thumb мышью (десктоп)
    thumb.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault();
      this.#isDragging = true;
      const onMouseMove = (ev: MouseEvent): void => {
        this.#updateSeek(ev.clientX);
      }
      const onMouseUp = (): void => {
        this.#isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    // Перетаскивание thumb тачем (смартфон)
    thumb.addEventListener('touchstart', (e: TouchEvent) => {
      e.preventDefault();
      this.#isDragging = true;
      const onTouchMove = (ev: TouchEvent): void => {
        this.#updateSeek(ev.touches[0].clientX);
      }
      const onTouchEnd = (): void => {
        this.#isDragging = false;
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
      }
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', onTouchEnd);
    });

    // Кнопка play/pause
    playPauseBtn.addEventListener('click', () => {
      if (this.#isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Play';
      } else {
        audio.play();
        playPauseBtn.textContent = 'Pause';
      }
      this.#isPlaying = !this.#isPlaying;
    });

    // Сброс при окончании
    audio.addEventListener('ended', () => {
      this.#isPlaying = false;
      playPauseBtn.textContent = 'Play';
      progressFill.style.width = '0%';
      thumb.style.left = '0%';
      seekBar.value = '0';
      audio.currentTime = 0;
      currentTimeEl.textContent = '0:00';
    });

  }


  // Форматирование времени
  #formatTime(seconds: number): string {
    const mins: number = Math.floor(seconds / 60);
    const secs: number = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Функция для установки прогресса (reusable для синхронизации)
  #setProgress(percent: number): void {
    percent = Math.max(0, Math.min(100, percent)); // Ограничиваем 0-100%
    progressFill.style.width = percent + '%';
    seekBar.value = percent.toString();
    thumb.style.left = percent + '%';
    const seekTime = (percent / 100) * audio.duration;
    if (!isNaN(seekTime)) {
      audio.currentTime = seekTime;
      currentTimeEl.textContent = this.#formatTime(audio.currentTime);
      // Автоматически запускаем воспроизведение, если оно остановлено
      if (!this.#isPlaying) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
        this.#isPlaying = true;
      }
    }
  }


  #updateSeek(clientX: number): void {
    const rect: DOMRect = progressBar.getBoundingClientRect(); // Используем progress-bar для точного расчета
    const percent: number = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    this.#setProgress(percent * 100);
  }


  loadNewTrack(newSrc: string): void {


    // Ставим новый источник
    audio.src = newSrc;

    // Перезагружаем аудио (загружает метаданные, вроде duration)
    audio.load();

    // Сбрасываем UI-компоненты плеера
    currentTimeEl.textContent = '0:00';  // Текущее время
    durationEl.textContent = '0:00';     // Длительность (обновится через loadedmetadata)
    progressFill.style.width = '0%';     // Шкала прогресса
    thumb.style.left = '0%';             // Бегунок
    seekBar.value = '0';                 // Seek-bar значение
    this.#isPlaying = false;                   // Флаг проигрывания
    playPauseBtn.textContent = 'Play';   // Текст кнопки

    // Если хочешь автоматически запустить: audio.play(); #isPlaying = true; playPauseBtn.textContent = 'Pause';
    // Но по умолчанию оставим на паузе — пользователь сам нажмет Play
  }

}



// Фабричная функция
export function createPlayer(): Player {
  return new Player();
}