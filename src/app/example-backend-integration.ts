/**
 * EXEMPLE D'UTILISATION DU SERVICE AVEC BACKEND
 * 
 * Ce fichier montre comment utiliser le service blog
 * pour récupérer et afficher les données du backend
 */

import { Component, OnInit } from '@angular/core';
import { blogService } from  './services/apps/blog/blog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-example',
  template: `
    <div>
      <h1>Blogs</h1>
      <button (click)="loadBlogs()" class="btn btn-primary">
        Charger les blogs du backend
      </button>
      <div class="blog-list">
        <div *ngFor="let blog of blogs" class="blog-card">
          <h3>{{ blog.title }}</h3>
          <p>{{ blog.description }}</p>
          <button (click)="updateBlog(blog.id)">Modifier</button>
          <button (click)="deleteBlog(blog.id)">Supprimer</button>
        </div>
      </div>
    </div>
  `,
})
export class BlogExampleComponent implements OnInit {
  blogs: any[] = [];
  loading = false;

  constructor(
    private blogService: blogService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    // Optionnel: charger les blogs au démarrage
    // this.loadBlogs();
  }

  /**
   * Charge les blogs depuis le backend
   */
  loadBlogs() {
    this.loading = true;
    this.blogService.getBlogFromBackend().subscribe({
      next: (data) => {
        this.blogs = data;
        this.toastr.success('Blogs chargés avec succès');
        this.loading = false;
      },
      error: (error) => {
        this.toastr.error('Erreur lors du chargement des blogs');
        this.loading = false;
      },
    });
  }

  /**
   * Crée un nouveau blog
   */
  createBlog(blogData: any) {
    this.blogService.createBlog(blogData).subscribe({
      next: (newBlog) => {
        this.blogs.push(newBlog);
        this.toastr.success('Blog créé avec succès');
      },
      error: (error) => {
        this.toastr.error('Erreur lors de la création du blog');
      },
    });
  }

  /**
   * Met à jour un blog
   */
  updateBlog(id: string) {
    const updatedData = { title: 'Nouveau titre', description: 'Nouvelle description' };
    this.blogService.updateBlog(id, updatedData).subscribe({
      next: () => {
        this.toastr.success('Blog mis à jour avec succès');
      },
      error: (error) => {
        this.toastr.error('Erreur lors de la mise à jour du blog');
      },
    });
  }

  /**
   * Supprime un blog
   */
  deleteBlog(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce blog ?')) {
      this.blogService.deleteBlog(id).subscribe({
        next: () => {
          this.blogs = this.blogs.filter((blog) => blog.id !== id);
          this.toastr.success('Blog supprimé avec succès');
        },
        error: (error) => {
          this.toastr.error('Erreur lors de la suppression du blog');
        },
      });
    }
  }
}
