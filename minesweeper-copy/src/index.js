import '@babel/polyfill';
import './index.html';
import './index.scss';
import './js/main.js';

import  flag_sound from './audio/flag_sound.mp3';
const audio = new Audio();
audio.src = flag_sound;

import mine from './audio/mine.mp3';
const audio1 = new Audio();
audio1.src = mine;

import win from './audio/win.mp3';
const audio2 = new Audio();
audio2.src = win;

import cells from './audio/cells.mp3';
const audio3 = new Audio();
audio3.src = cells;

