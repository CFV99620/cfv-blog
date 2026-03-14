import React from 'react';
import FeaturedPosts from '../components/FeaturedPosts';
import PostList from '../components/PostList';

/**
 * Página Home:
 * Junta el carrusel de destacados en la parte superior
 * y la lista normal de posts en la parte inferior.
 */
function Home() {
  return (
    <>
      <FeaturedPosts />
      
      {/* Podemos poner un div extra o padding si es necesario, 
          pero FeaturedPosts ya tiene su propio margin inferior */}
      <PostList />
    </>
  );
}

export default Home;
