import React from 'react';
import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';
import Sidebar from '../components/Sidebar';

function Category() {
  const { category } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
        {/* Contenido Principal */}
        <div className="lg:col-span-8">
          <h1 className="text-3xl font-bold border-l-4 border-blue-600 pl-3 mb-8 text-slate-900 tracking-tight uppercase">
            Categoría: {category}
          </h1>
          <PostList category={category} />
        </div>
        
        {/* Barra Lateral (Sidebar) */}
        <div className="lg:col-span-4">
          <Sidebar category={category} />
        </div>
      </div>
    </div>
  );
}

export default Category;
