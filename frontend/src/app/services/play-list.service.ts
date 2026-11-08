import { Injectable, signal } from '@angular/core';
import { Track } from '../models/track.model';

@Injectable({
  providedIn: 'root',
})
export class PlayList {
  readonly playList = signal<Track[]>([]);
  readonly currentTrack = signal<Track | null>(null);
  readonly currentIndex = signal(-1);
  private autoplayRequested = false;

  agregarCancion(track: Track) {
    const updatedTracks = [...this.playList(), track];
    this.playList.set(updatedTracks);
    if (this.currentIndex() < 0) {
      this.autoplayRequested = false;
      this.currentIndex.set(0);
      this.currentTrack.set(track);
    }
  }

  seleccionarCancion(index: number): void {
    const track = this.playList()[index];
    if (!track) {
      return;
    }

    this.autoplayRequested = true;
    this.currentIndex.set(index);
    this.currentTrack.set(track);
  }

  consumeAutoplayRequest(): boolean {
    const shouldAutoplay = this.autoplayRequested;
    this.autoplayRequested = false;
    return shouldAutoplay;
  }

  siguienteCancion(): boolean {
    const nextIndex = this.currentIndex() + 1;
    if (this.currentIndex() < 0 || nextIndex >= this.playList().length) {
      return false;
    }

    this.seleccionarCancion(nextIndex);
    return true;
  }

  cancionAnterior(): boolean {
    const previousIndex = this.currentIndex() - 1;
    if (this.currentIndex() <= 0) {
      return false;
    }

    this.seleccionarCancion(previousIndex);
    return true;
  }

  limpiar(): void {
    this.playList.set([]);
    this.currentIndex.set(-1);
    this.currentTrack.set(null);
    this.autoplayRequested = false;
  }
}
