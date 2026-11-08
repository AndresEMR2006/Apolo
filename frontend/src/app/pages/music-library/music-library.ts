import { Component, inject, signal } from '@angular/core';
import { MusicApiService } from '../../services/music-api.service';
import { Track } from '../../models/track.model';
import { PlayList } from '../../services/play-list.service';

@Component({
  selector: 'music-library',
  templateUrl: 'music-library.html',
})
export class MusicLibrary {
  private readonly musicApi = inject(MusicApiService);
  private readonly playList = inject(PlayList);

  serverStatus = true;
  tracks = signal<Track[]>([]);

  ngOnInit() {
    this.musicApi.getTracks().subscribe({
      next: (tracks) => {
        this.tracks.set(tracks);
      },
      error: (error) => {
        console.error('Error obteniendo canciones:', error);
      },
    });
  }

  agregarCancion(track: Track) {
    this.playList.agregarCancion(track);
    console.log(track.name);
  }
}
