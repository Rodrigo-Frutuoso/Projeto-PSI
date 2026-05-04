import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Notification {
  id: string;
  requestId: string;
  albumTitle: string;
  status: 'aceite' | 'recusado';
  read: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly apiUrl = '/api/version-requests';
  private readonly tokenKey = 'auth_token';
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();
  
  private notificationToastSubject = new BehaviorSubject<{message: string, show: boolean}>({message: '', show: false});
  public notificationToast$ = this.notificationToastSubject.asObservable();
  
  private pollingInterval?: ReturnType<typeof setInterval>;
  private previousRequestsMap: Map<string, string> = new Map();

  constructor(private readonly http: HttpClient) {
    console.log('✅ NotificationService INICIALIZADO');
    this.startGlobalPolling();
  }

  private getAuthHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    };
  }

  private startGlobalPolling(): void {
    this.pollingInterval = setInterval(() => {
      console.log('🔄 Polling global de pedidos...');
      this.checkVersionRequestsStatus();
    }, 3000);
    console.log('✅ Polling iniciado');
  }

  private checkVersionRequestsStatus(): void {
    this.http.get<any[]>(`${this.apiUrl}`, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (requests) => {
        console.log('📦 Pedidos recebidos:', requests.length, 'pedidos');
        
        for (const request of requests) {
          const previousStatus = this.previousRequestsMap.get(request.id);
          console.log(`  📋 ${request.id}: anterior=${previousStatus}, atual=${request.status}`);
          
          if (previousStatus && previousStatus !== request.status && request.status !== 'em análise') {
            const statusText = request.status === 'aceite' ? 'Aceite ✅' : 'Recusado ❌';
            console.log(`  ✅✅✅ MUDANÇA DETECTADA! ${request.albumTitle} - ${statusText}`);
            this.showNotification(`Pedido "${request.albumTitle}" foi ${statusText}`);
          }
          this.previousRequestsMap.set(request.id, request.status);
        }
      },
      error: (err) => {
        console.error('❌ Erro no polling:', err);
      }
    });
  }

  private showNotification(message: string): void {
    console.log('🎯 Mostrando notificação:', message);
    this.notificationToastSubject.next({message, show: true});
    console.log('✅ Toast subject atualizado');
    
    setTimeout(() => {
      console.log('🔄 Escondendo notificação...');
      this.notificationToastSubject.next({message: '', show: false});
    }, 4000);
  }

  getMyNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>('/api/notifications', {
      headers: this.getAuthHeaders()
    }).pipe(
      map(notifications => {
        this.notificationsSubject.next(notifications);
        return notifications;
      })
    );
  }

  getUnreadCount(): Observable<number> {
    return this.notifications$.pipe(
      map(notifications => notifications.filter(n => !n.read).length)
    );
  }

  respondToRequest(requestId: string, action: 'aceite' | 'recusado'): Observable<any> {
    return this.http.post(`${this.apiUrl}/${requestId}/respond`, { action }, {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        this.getMyNotifications().subscribe();
        return response;
      })
    );
  }

  markAsRead(notificationId: string): Observable<any> {
    return this.http.patch(`/api/notifications/${notificationId}/read`, {}, {
      headers: this.getAuthHeaders()
    });
  }

  refreshNotifications(): void {
    this.getMyNotifications().subscribe();
  }

  clearAllNotifications(): Observable<any> {
    return this.http.delete('/api/notifications', {
      headers: this.getAuthHeaders()
    }).pipe(
      map(response => {
        this.notificationsSubject.next([]);
        return response;
      })
    );
  }
}
