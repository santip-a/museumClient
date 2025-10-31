import { createPlayer } from './components/player-mp3/player.class';
import { adjustFontSizeToFit } from './components/screen/adjustFontSizeToFit';
import './styles.css'




// пример вставки текста в экранчик
adjustFontSizeToFit('43337');




//выполняется после загрузки HTML
document.addEventListener('DOMContentLoaded', function () {


  // установка работы плеера
  const player = createPlayer()
  // функция динамической замены трека в плеере
  player.loadNewTrack('song.mp3')



  
});






