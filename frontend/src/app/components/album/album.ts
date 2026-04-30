import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AlbumService, AlbumDetail, AlbumTrack, AlbumVersion } from '../../services/album.service';
import { CollectionService } from '../../services/collection.service';

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

  /** EAN-13s already in the user's collection */
  collectedEans = new Set<string>();
  /** EAN-13s currently being added (loading spinner) */
  addingEans = new Set<string>();
  /** Feedback messages per EAN-13 */
  versionMessages: Record<string, { text: string; type: 'success' | 'error' }> = {};

  constructor(
    private readonly route: ActivatedRoute,
    private readonly albumService: AlbumService,
    private readonly collectionService: CollectionService,
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

    // Load album data and user's collection in parallel
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

    // Pre-load the user's collection to know which versions are already collected
    this.collectionService.getCollection().subscribe({
      next: (items) => {
        this.collectedEans = new Set(items.map(i => i.ean13));
        this.cdr.detectChanges();
      },
      error: () => {
        // Non-critical: buttons will just not be pre-disabled
      }
    });
  }

  /** Add a specific version to the user's collection */
  addToCollection(version: AlbumVersion): void {
    if (!this.album?._id || !version.ean13) return;
    if (this.collectedEans.has(version.ean13)) return;

    this.addingEans.add(version.ean13);
    delete this.versionMessages[version.ean13];
    this.cdr.detectChanges();

    this.collectionService.addToCollection(this.album._id, version.ean13).subscribe({
      next: (response) => {
        this.addingEans.delete(version.ean13);
        this.collectedEans.add(version.ean13);
        this.versionMessages[version.ean13] = {
          text: response.message || 'Versão adicionada à coleção com sucesso!',
          type: 'success'
        };
        this.cdr.detectChanges();

        // Auto-hide success message after 5s
        setTimeout(() => {
          delete this.versionMessages[version.ean13];
          this.cdr.detectChanges();
        }, 5000);
      },
      error: (err) => {
        this.addingEans.delete(version.ean13);

        if (err.status === 409) {
          // Already in collection — mark as collected
          this.collectedEans.add(version.ean13);
          this.versionMessages[version.ean13] = {
            text: err.error?.message || 'Esta versão já se encontra na tua coleção.',
            type: 'error'
          };
        } else {
          this.versionMessages[version.ean13] = {
            text: err.error?.message || 'Erro ao adicionar à coleção.',
            type: 'error'
          };
        }
        this.cdr.detectChanges();

        setTimeout(() => {
          delete this.versionMessages[version.ean13];
          this.cdr.detectChanges();
        }, 5000);
      }
    });
  }

  /** Check if a version is already in the collection */
  isCollected(ean13: string): boolean {
    return this.collectedEans.has(ean13);
  }

  /** Check if a version is currently being added */
  isAdding(ean13: string): boolean {
    return this.addingEans.has(ean13);
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
