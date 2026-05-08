# Guide d'Intégration Backend - Angular

## 🔧 Configuration du Backend

### 1. **URL du Backend**
Modifiez `src/environments/environment.ts` avec votre URL:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',  // ← Votre URL backend
};
```

### 2. **Structure des Services**
Pour chaque module, créez un service dédié:
```
services/
├── api.service.ts          (Service générique)
└── apps/
    ├── blog/
    │   └── blog.service.ts  (Service spécifique)
    ├── contacts/
    │   └── contact.service.ts
    └── ...
```

## 📡 Appels API

### GET - Récupérer des données
```typescript
// Dans le service
getBlogs(): Observable<Blog[]> {
  return this.apiService.get<Blog[]>('/blogs');
}

// Dans le composant
this.blogService.getBlogs().subscribe({
  next: (blogs) => this.blogs = blogs,
  error: (error) => console.error('Erreur:', error)
});
```

### POST - Créer
```typescript
createBlog(data: Blog): Observable<Blog> {
  return this.apiService.post<Blog>('/blogs', data);
}
```

### PUT - Mettre à jour
```typescript
updateBlog(id: string, data: Blog): Observable<Blog> {
  return this.apiService.put<Blog>(`/blogs/${id}`, data);
}
```

### DELETE - Supprimer
```typescript
deleteBlog(id: string): Observable<void> {
  return this.apiService.delete<void>(`/blogs/${id}`);
}
```

## 🔐 Authentification & Tokens

### Créer un Intercepteur pour les Headers
```typescript
// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
```

### Enregistrer dans app.config.ts
```typescript
import { authInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authInterceptor])
    ),
    // ...
  ]
};
```

## 🛡️ CORS (Cross-Origin Resource Sharing)

### Configuration Backend (exemple Node/Express)
```javascript
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:4200', 'https://votredomaine.com'],
  credentials: true
}));
```

### Proxy pour Development
Si CORS pose problème, utilisez un proxy (proxy.conf.json):
```json
{
  "/api": {
    "target": "http://localhost:3000",
    "pathRewrite": { "^/api": "" },
    "changeOrigin": true
  }
}
```

Puis lancez avec: `ng serve --proxy-config proxy.conf.json`

## 🎯 Bonnes Pratiques

1. **Types TypeScript**
   ```typescript
   export interface Blog {
     id: string;
     title: string;
     description: string;
     createdAt: Date;
   }
   ```

2. **Gestion d'Erreurs**
   ```typescript
   this.service.getBlog().subscribe({
     next: (data) => { /* succès */ },
     error: (error) => { 
       this.toastr.error(error.message);
     },
     complete: () => { /* finalisation */ }
   });
   ```

3. **Loading States**
   ```typescript
   loading = signal(false);
   
   loadData() {
     this.loading.set(true);
     this.service.getData().subscribe({
       next: (data) => this.data = data,
       error: () => {},
       complete: () => this.loading.set(false)
     });
   }
   ```

4. **UnSubscribe**
   ```typescript
   // Avec destroy
   private destroy$ = new Subject<void>();
   
   ngOnInit() {
     this.service.getData()
       .pipe(takeUntil(this.destroy$))
       .subscribe(...);
   }
   
   ngOnDestroy() {
     this.destroy$.next();
   }
   ```

## 🚀 Variables d'Environnement

### .env (à la racine du projet)
```
NG_APP_API_URL=http://localhost:3000/api
NG_APP_ENV=development
```

### Accès dans le code
```typescript
apiUrl = environment.apiUrl;
```

## ✅ Checklist

- [ ] `ApiService` créé
- [ ] `environment.ts` configuré avec l'URL du backend
- [ ] Services spécifiques utilisant `ApiService`
- [ ] Intercepteur d'authentification (si nécessaire)
- [ ] Gestion d'erreurs
- [ ] Types TypeScript définis
- [ ] CORS configuré côté backend
- [ ] Tests avec Postman/Insomnia

---

**Besoin d'aide ?** Modifiez `environment.ts` avec votre URL backend et exécutez:
```bash
ng serve
```
