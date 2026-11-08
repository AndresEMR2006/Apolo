import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../models/track.model';

interface ApiStatusResponse {
  status: string;
  application: string;
}

@Injectable({
  providedIn: 'root',
})
export class MusicApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api';

  getStatus(): Observable<ApiStatusResponse> {
    return this.http.get<ApiStatusResponse>(`${this.apiUrl}/status`);
  }

  getTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.apiUrl}/tracks`);
  }

  getAudioBlob(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/tracks/${encodeURIComponent(id)}/audio`, {
      responseType: 'blob',
    });
  }
}
