import { ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, map, of, switchMap, take } from 'rxjs';
import { Track } from '../../models/track.model';
import { MusicApiService } from '../../services/music-api.service';
import { PlayList } from '../../services/play-list.service';

interface AudioSourceResult {
  track: Track | null;
  url: string | null;
  error: string | null;
  autoplay: boolean;
}

@Component({
  selector: 'audio-player',
  templateUrl: 'audio-player.html',
})
export class AudioPlayer implements OnInit {
  private readonly musicApi = inject(MusicApiService);
  private readonly playList = inject(PlayList);
  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly currentIndex$ = toObservable(this.playList.currentIndex);

  currentTrack: Track | null = null;
  audioUrl: string | null = null;
  currentTime = 0;
  duration = 0;
  isPlaying = false;
  playbackError = '';
  volume = 0.72;
  randomMode = false;
  private loadingRandomTrack = false;
  private autoplayAfterLoad = false;
  private objectUrl: string | null = null;

  ngOnInit(): void {
    this.currentIndex$
      .pipe(
        switchMap((index) => {
          const track = index >= 0 ? (this.playList.playList()[index] ?? null) : null;
          const autoplay = this.playList.consumeAutoplayRequest();
          this.audioUrl = null;
          this.currentTime = 0;
          this.duration = 0;
          this.isPlaying = false;
          this.playbackError = '';

          if (!track) {
            return of<AudioSourceResult>({ track: null, url: null, error: null, autoplay: false });
          }

          return this.musicApi.getAudioBlob(track.id).pipe(
            map((blob): AudioSourceResult => ({
              track,
              url: URL.createObjectURL(new Blob([blob], { type: 'audio/mpeg' })),
              error: null,
              autoplay,
            })),
            catchError((error: unknown) => {
              console.error(`Error obteniendo el audio de ${track.name}:`, error);
              return of({
                track,
                url: null,
                error: 'No se pudo cargar el archivo de audio.',
                autoplay: false,
              });
            }),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ track, url, error, autoplay }) => {
        if (this.objectUrl) {
          URL.revokeObjectURL(this.objectUrl);
        }

        this.objectUrl = url;
        this.currentTrack = track;
        this.audioUrl = url;
        this.playbackError = error ?? '';
        this.autoplayAfterLoad = autoplay;
        this.changeDetector.markForCheck();
      });

    this.destroyRef.onDestroy(() => {
      if (this.objectUrl) {
        URL.revokeObjectURL(this.objectUrl);
      }
    });
  }

  get canGoToPreviousTrack(): boolean {
    return this.playList.currentIndex() >= 0;
  }

  get canGoToNextTrack(): boolean {
    const index = this.playList.currentIndex();
    return (
      index >= 0 &&
      (index < this.playList.playList().length - 1 || this.randomMode)
    );
  }

  async togglePlayback(audio: HTMLAudioElement): Promise<void> {
    if (!audio.paused) {
      audio.pause();
      return;
    }

    await this.startPlayback(audio);
  }

  nextTrack(): void {
    if (this.playList.siguienteCancion() || !this.randomMode) {
      return;
    }

    this.playRandomTrack();
  }

  previousTrack(audio: HTMLAudioElement): void {
    if (this.playList.cancionAnterior()) {
      return;
    }

    if (this.playList.currentIndex() >= 0) {
      audio.currentTime = 0;
      this.updatePlayback(audio);
    }
  }

  toggleRandomMode(): void {
    this.randomMode = !this.randomMode;
  }

  handleTrackEnded(): void {
    this.isPlaying = false;
    const currentIndex = this.playList.currentIndex();
    const tracks = this.playList.playList();
    if (currentIndex >= 0 && currentIndex < tracks.length - 1) {
      this.playList.siguienteCancion();
      return;
    }

    if (
      !this.randomMode ||
      this.loadingRandomTrack ||
      currentIndex < 0 ||
      currentIndex !== tracks.length - 1
    ) {
      return;
    }

    this.playRandomTrack();
  }

  private playRandomTrack(): void {
    if (this.loadingRandomTrack) {
      return;
    }

    this.loadingRandomTrack = true;
    this.musicApi
      .getTracks()
      .pipe(
        take(1),
        map((libraryTracks) => {
          const queuedIds = new Set(this.playList.playList().map((track) => track.id));
          const unqueuedTracks = libraryTracks.filter((track) => !queuedIds.has(track.id));
          const candidates = unqueuedTracks.length > 0 ? unqueuedTracks : libraryTracks;
          if (candidates.length === 0) {
            return null;
          }

          return candidates[Math.floor(Math.random() * candidates.length)];
        }),
        catchError((error: unknown) => {
          console.error('Error buscando una canción aleatoria:', error);
          this.playbackError = 'No se pudo buscar otra canción.';
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((track) => {
        this.loadingRandomTrack = false;
        if (!track) {
          if (!this.playbackError) {
            this.playbackError = 'No hay canciones disponibles para reproducir.';
          }
          this.changeDetector.markForCheck();
          return;
        }

        this.playList.agregarCancion(track);
        this.playList.seleccionarCancion(this.playList.playList().length - 1);
      });
  }

  private async startPlayback(audio: HTMLAudioElement): Promise<void> {
    try {
      this.playbackError = '';
      await audio.play();
    } catch (error) {
      this.playbackError = 'No se pudo reproducir el archivo de audio.';
      console.error('Audio playback failed:', error);
    }
  }

  initializeAudio(audio: HTMLAudioElement): void {
    audio.volume = this.volume;
    this.updatePlayback(audio);
    if (this.autoplayAfterLoad) {
      this.autoplayAfterLoad = false;
      void this.startPlayback(audio);
    }
  }

  updatePlayback(audio: HTMLAudioElement): void {
    this.currentTime = audio.currentTime;
    this.duration = Number.isFinite(audio.duration) ? audio.duration : 0;
  }

  seek(audio: HTMLAudioElement, event: Event): void {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || this.duration === 0) {
      return;
    }

    audio.currentTime = Number(input.value);
    this.updatePlayback(audio);
  }

  setVolume(audio: HTMLAudioElement, event: Event): void {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    this.volume = Number(input.value);
    audio.volume = this.volume;
  }

  formatTime(time: number): string {
    if (!Number.isFinite(time) || time < 0) {
      return '0:00';
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  rangeBackground(value: number, max: number): string {
    const percentage = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;
    return `linear-gradient(to right, var(--color-player-text) ${percentage}%, var(--color-player-track) ${percentage}%)`;
  }
}
