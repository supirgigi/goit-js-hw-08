import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframeRef = document.querySelector('iframe');
const player = new Player(iframeRef);

player.on('timeupdate', throttle(onPlay, 1000));

setPlayerTime();

function onPlay({ seconds }) {
  localStorage.setItem(STORAGE_KEY, seconds);
}

function setPlayerTime() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    return;
  }

  player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
}
