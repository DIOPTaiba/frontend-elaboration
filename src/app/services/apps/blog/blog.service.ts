import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../../api.service';
import { blogPosts } from 'src/app/pages/apps/blogs/blogData';

@Injectable({
  providedIn: 'root',
})
export class blogService {
  private blogPosts = signal<any[]>(blogPosts);
  private selectedPost = signal<any | null>(null);

  constructor(private apiService: ApiService) {}

  /**
   * Récupère tous les blogs du backend
   */
  public getBlogFromBackend(): Observable<any[]> {
    return this.apiService.get<any[]>('/blogs').pipe(
      tap((posts) => this.blogPosts.set(posts))
    );
  }

  /**
   * Retourne les blogs en cache (local)
   */
  public getBlog() {
    return this.blogPosts();
  }

  /**
   * Crée un nouveau blog
   */
  public createBlog(blogData: any): Observable<any> {
    return this.apiService.post<any>('/blogs', blogData).pipe(
      tap((newPost) => {
        this.blogPosts.update((posts) => [...posts, newPost]);
      })
    );
  }

  /**
   * Met à jour un blog
   */
  public updateBlog(id: string, blogData: any): Observable<any> {
    return this.apiService.put<any>(`/blogs/${id}`, blogData).pipe(
      tap((updatedPost) => {
        this.blogPosts.update((posts) =>
          posts.map((post) => (post.id === id ? updatedPost : post))
        );
      })
    );
  }

  /**
   * Supprime un blog
   */
  public deleteBlog(id: string): Observable<any> {
    return this.apiService.delete<any>(`/blogs/${id}`).pipe(
      tap(() => {
        this.blogPosts.update((posts) => posts.filter((post) => post.id !== id));
      })
    );
  }

  public selectBlogPost(title: string) {
    const post = this.blogPosts().find((post) => post.title === title);
    this.selectedPost.set(post || null);
  }

  public getSelectedPost() {
    return this.selectedPost();
  }
}
