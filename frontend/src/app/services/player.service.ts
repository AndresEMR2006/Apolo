import { Injectable } from '@angular/core';
import { Track } from '../models/track.model';

@Injectable({
  providedIn: 'root',
})
export class Player {
  private random = false;
  private duration = '';

  play() {}

  pause() {}

  nextSong() {}

  previousSong() {}
}
