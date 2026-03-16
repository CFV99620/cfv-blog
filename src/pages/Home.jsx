import React from 'react';
import FeaturedPosts from '../components/FeaturedPosts';
import PostList from '../components/PostList';
import Sidebar from '../components/Sidebar';

/**
 * Página Home:
 * Integra el carrusel de destacados y lista de posts en la columna principal,
 * y la barra lateral (Sidebar) en la columna derecha.
 */
function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
        {/* Contenido Principal */}
        <div className="lg:col-span-8">
          <FeaturedPosts />
          <PostList />
        </div>
        
        {/* Barra Lateral (Sidebar) */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Home;
