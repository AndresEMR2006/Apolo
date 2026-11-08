import { Component, inject } from '@angular/core';
import { MusicLibrary } from './pages/music-library/music-library';
import { AudioPlayer } from './pages/audio-player/audio-player';
import { Playlist } from './pages/playlist/playlist';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [MusicLibrary, Playlist, AudioPlayer],
})
export class App {}
