import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AlbumService, AlbumDetail, AlbumTrack, AlbumVersion } from '../../services/album.service';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './album.html',
  styleUrls: ['./album.css']
})
export class AlbumComponent implements OnInit {
  album: AlbumDetail | null = null;
  isLoading = true;
  loadError = '';
  readonly Object = Object;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly albumService: AlbumService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.isLoading = false;
      this.loadError = 'Álbum inválido.';
      this.cdr.detectChanges();
      return;
    }

    this.albumService.getAlbum(id).subscribe({
      next: (data) => {
        this.album = data;
        this.isLoading = false;
        this.loadError = '';
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.loadError = 'Não foi possível carregar os dados do álbum.';
        this.cdr.detectChanges();
      }
    });
  }

  formatDuration(seconds?: number): string {
    if (!seconds && seconds !== 0) return '';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  formatArtists(list?: { _id: string; name: string }[]): string {
    if (!list || list.length === 0) return '';
    return list.map(a => a.name).join(', ');
  }

  groupedVersions(): Record<string, AlbumVersion[]> {
    const map: Record<string, AlbumVersion[]> = {};
    if (!this.album?.versions) return map;
    for (const v of this.album.versions) {
      const key = v.physicalSupport || 'outro';
      if (!map[key]) map[key] = [];
      map[key].push(v);
    }
    return map;
  }
}
