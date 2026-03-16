import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

/**
 * Componente PostList:
 * Muestra una lista de los artículos más recientes con una imagen y un resumen.
 */
function PostList() {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    /* Llamada a la API para obtener los posts */
    api.get("/api/posts/list")
      .then(res => {
        console.log("Posts recibidos:", res.data); // Log para depuración
        setPosts(res.data);
      })
      .catch(err => console.error("Error al cargar posts:", err));
  }, []);

  /**
   * Helper para limpiar URLs de Google Drive (cfv nota):
   * Las URLs de Drive a veces necesitan ser transformadas para mostrarse en un tag <img>.
   */
  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/400x250?text=No+Image";
    // Si es un link de Drive tipo 'view', intentamos convertirlo a un link de imagen directa
    //return url.replace("file/d/", "uc?export=view&id=").replace("/view?usp=sharing", "").replace("/view", "");

   
    // Regex para extraer el ID de Google Drive de varios formatos de URL
    const driveIdMatch = url.match(/[-\w]{25,}/);
    if (driveIdMatch && driveIdMatch[0]) {
      return `https://lh3.googleusercontent.com/d/${driveIdMatch[0]}`;
    }
    
    return url;
  };

  return (
    <div className="w-full py-4">
      
      {/* Encabezado Principal: border-l-4 crea la línea azul lateral (cfv nota) */}
      <h2 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-10 text-slate-900 tracking-tight uppercase">
        Latest Stories
      </h2>

      {/* Lista de Posts */}
      <div className="space-y-12">
        {posts.slice(0, visibleCount).map(post => (
          /* Enlace envolvente: Redirecciona al detalle del post usando su slug */
          <Link key={post.id} to={`/post/${post.id}`} className="group block focus:outline-none">
            <article className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8">
              
              {/* Imagen del Post */}
              <div className="overflow-hidden rounded-lg shadow-sm border border-slate-100">
                <img 
                  src={getImageUrl(post.coverImage)} 
                  alt={post.title}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x250?text=Error+Loading+Image"; }}
                  className="w-full h-48 md:h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Contenido (Texto) a la derecha */}
              <div className="flex flex-col justify-center">
              {/* Categoría (Opcional, usando un valor estático o de post) */}
              <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase mb-2">
                {post.categories?.join(' - ')}
              </span>
              

                {/* Título: font-serif para ese toque de periódico elegante */}
                <h3 className="text-2xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors mb-3">
                  {post.title}
                </h3>

                {/* Resumen (Excerpt) */}
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
                {post.excerpt || "Cities are rethinking green spaces and pedestrian zones as they adapt to the post-car era and climate volatility."}
                </p>

                {/* Fecha / Tiempo transcurrido */}
                <span className="text-xs text-slate-400 font-medium">
                  4 hours ago
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Botón de Carga: Se muestra solo si hay más posts por cargar */}
      {/* condicion && (renderizado true) en caso de false no ejecuta el segmento Se le conoce como evaluación de "cortocircuito" (short-circuit evaluation). */}
      {visibleCount < posts.length ? 
        <div className="mt-16 pt-8 border-t border-slate-100 italic">
          <button 
            onClick={() => setVisibleCount(posts.length)}
            className="w-full py-4 px-6 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold hover:bg-slate-100 transition-colors text-sm"
          >
            Load More Stories
          </button>
        </div>
      :
      <div className="mt-16 pt-8 border-t border-slate-100 italic">
        <button 
          onClick={() => setVisibleCount(2)}
          className="w-full py-4 px-6 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold hover:bg-slate-100 transition-colors text-sm"
        >
          Show Less Stories
        </button>
      </div>
      }

    </div>
  );
}

export default PostList;
