import { Component, inject } from '@angular/core';
import { PlayList } from '../../services/play-list.service';

@Component({
  selector: 'app-playlist',
  templateUrl: 'playlist.html',
})
export class Playlist {
  readonly queue = inject(PlayList);

  seleccionarCancion(index: number): void {
    this.queue.seleccionarCancion(index);
  }
}
