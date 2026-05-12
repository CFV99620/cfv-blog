import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

/**
 * Componente PostDetail:
 * Muestra el contenido completo de un artículo.
 * Utiliza un enfoque híbrido: usa datos del 'state' del router si están disponibles
 * y los complementa/actualiza con una llamada a la API.
 */
function PostDetail() {
  const { id } = useParams();
  const location = useLocation();// useLocation() es un hook de react-router-dom se usa para obtener o tratar de obtener datos de la ruta actual.
  const [post, setPost] = useState(location.state?.post || null); // location.state?.post es una forma de acceder a los datos que se pasaron al componente cuando se navegó a esta ruta. cfv nota: si no se pasa ningun dato se inicializa en null
  const [loading, setLoading] = useState(!post); // loading es una variable de estado que se usa para indicar si se está cargando el post.
  const [error, setError] = useState(null); // error es una variable de estado que se usa para indicar si hay un error al cargar el post.

  useEffect(() => {
    // Si ya tenemos el post del state, podríamos evitar la llamada o hacerla igual para refrescar.
    // Aquí la hacemos para obtener el contenido completo.
    setLoading(true);// se inicializa en true para que se muestre el loading, esto sirve para que no se muestre el post antes de que se cargue 
    api.get(`/api/posts/post/${id}`)
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar el detalle del post:", err);
        setError("No se pudo cargar el contenido del artículo.");
        setLoading(false);
      });
  }, [id]);

  /**
   * Helper para limpiar URLs de Google Drive (cfv nota):
   */
  const getImageUrl = (url) => {
    if (!url) return "https://placehold.co/1200x800?text=No+Image";
    const driveIdMatch = url.match(/[-\w]{25,}/);
    if (driveIdMatch && driveIdMatch[0]) {
      return `https://lh3.googleusercontent.com/d/${driveIdMatch[0]}`;
    }
    return url;
  };

  if (loading && !post) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center">
        <div className="animate-pulse">
          <div className="h-12 bg-slate-100 rounded-full w-3/4 mx-auto mb-8"></div>
          <div className="h-4 bg-slate-50 rounded-full w-1/2 mx-auto mb-4"></div>
          <div className="h-[400px] bg-slate-100 rounded-2xl w-full mt-12"></div>
        </div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center">
        <h2 className="text-3xl font-bold text-slate-800">{error}</h2>
        <a href="/" className="text-blue-600 font-bold hover:underline mt-8 inline-block">
          ← Volver a la lista histórica
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* 1. Encabezado del Post (Título y Autor) */}
      <header className="max-w-4xl mx-auto pt-16 md:pt-24 pb-12 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#0f172a] leading-[1.1] tracking-tight mb-10 font-serif">
          {post?.title}
        </h1>

        <div className="flex flex-col items-center">
          {/* Avatar del Autor */}
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-100 mb-4 shadow-sm">
            <img 
              src={`https://ui-avatars.com/api/?name=${post?.author || "Test_SRDonCFV"}&background=f1f5f9&color=0f172a`} 
              alt="Author" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-slate-900 mb-0.5">
              {post?.author || "Test_SrDonCFV"}
            </span>
            <span className="text-[11px] text-slate-400 font-medium italic">
              Published {post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : "October 24, 2023"} • 8 min read
            </span>
          </div>
        </div>
      </header>

      {/* 2. Imagen Principal (Wide Image) */}
      <div className="max-w-5xl mx-auto px-4 md:px-0 mb-4">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 aspect-video">
          <img 
            src={getImageUrl(post?.coverImage)} 
            alt={post?.title}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Caption de la imagen */}
        <p className="mt-4 text-center text-xs md:text-sm text-slate-400 italic px-6 max-w-3xl mx-auto leading-relaxed">
          detalle de foto(quiza)
        </p>
      </div>

      {/* 3. Contenido del Artículo */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-[#475569] prose-p:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50/50 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:italic">
          
          {/* Lede (Introducción estilizada) */}
          <p className="text-xl md:text-2xl text-slate-500 italic mb-12 leading-relaxed opacity-80">
            {post?.excerpt || "Introduccion quiza."}
          </p>

          <div className="whitespace-pre-wrap">
            {post?.content || "El contenido completo de este artículo está siendo procesado. Te invitamos a leer nuestro resumen mientras tanto."}
          </div>
        </div>

        {/* 4. Footer del Post (Share & Categorías) */}
        <footer className="mt-20 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">Share:</span>
            <div className="flex gap-4">
               {/* Iconos Simplificados */}
               <button className="text-slate-400 hover:text-blue-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
               </button>
               <button className="text-slate-400 hover:text-blue-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
               </button>
            </div>
          </div>

          <div className="flex gap-2">
            {post?.categories?.map((cat, idx) => (
              <span key={idx} className="px-4 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-wider hover:bg-blue-100 cursor-pointer transition-colors">
                {cat}
              </span>
            ))}
          </div>
        </footer>
        
        <div className="mt-16 text-center">
           <a href="/" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-all uppercase tracking-tighter">
             ← Back to stories
           </a>
        </div>
      </article>
    </div>
  );
}

export default PostDetail;
