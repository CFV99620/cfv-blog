import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function FeaturedPosts() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch solo posts destacados (podría optimizarse en el backend, por ahora filtramos aquí)
    api.get("/api/posts/list/featured")
      .then(res => {
        setFeaturedPosts(res.data);
      })
      .catch(err => console.error("Error al cargar posts destacados:", err));
  }, []);

  // Efecto para el auto-play del carrusel (cambia cada 6 segundos)
  useEffect(() => {
    if (featuredPosts.length <= 1) return; // No animar si hay 1 o 0 posts

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredPosts.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval); // Limpieza al desmontar
  }, [featuredPosts.length]);

  const getImageUrl = (url) => {
    if (!url) return "https://placehold.co/800x400?text=No+Image";
    const driveIdMatch = url.match(/[-\w]{25,}/);
    if (driveIdMatch && driveIdMatch[0]) {
      return `https://lh3.googleusercontent.com/d/${driveIdMatch[0]}`;
    }
    return url;
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === featuredPosts.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredPosts.length - 1 : prev - 1));
  };

  if (featuredPosts.length === 0) {
    return null; // Si no hay destacados, no mostramos nada para no romper el layout
  }

  const post = featuredPosts[currentIndex];

  return (
    <div className="w-full py-4 lg:py-8 mb-8 relative group">
      
      {/* Contenedor principal de la imagen (Hero) */}
      <Link to={`/post/${post.id}`} state={{ post }} className="block focus:outline-none">
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-900">
          <img 
            src={getImageUrl(post.coverImage)} 
            alt={post.title}
            onError={(e) => { e.target.src = "https://placehold.co/800x400?text=Error+Loading+Image"; }}
            className="w-full h-full object-cover opacity-90 transition-all duration-700 hover:scale-105 hover:opacity-100"
          />
          {/* Opcional: Gradiente oscuro sutil interior para darle el look premium */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
        </div>
      </Link>

      {/* Flechas de control (glassmorphism) - Visibles al hacer hover */}
      {featuredPosts.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-[200px] md:top-[250px] -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/40 shadow-lg"
            aria-label="Previous featured post"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-[200px] md:top-[250px] -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/40 shadow-lg"
            aria-label="Next featured post"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      {/* Contenido (Textos debajo de la imagen como en la referencia) */}
      <div className="mt-8 px-2 md:px-0">
        <Link to={`/post/${post.id}`} state={{ post }} className="block group/text">
          {/* Categoría */}
          <span className="text-xs font-bold text-blue-600 tracking-[0.15em] uppercase mb-4 block">
            {post.categories?.join(' - ')}
          </span>

          {/* Título Grande */}
          <h2 className="text-3xl md:text-[2.75rem] font-extrabold text-[#0f172a] leading-[1.15] mb-4 group-hover/text:text-blue-600 transition-colors">
            {post.title}
          </h2>

          {/* Resumen */}
          <p className="text-[#475569] text-base md:text-lg leading-relaxed mb-6 max-w-3xl">
            {post.excerpt || "As silicon meets swarm theory, a new era of distributed artificial intelligence is beginning to reshape the global cognitive landscape. We explore how autonomous agents and blockchain are decentralizing the power of the machine mind."}
          </p>
        </Link>
        
        {/* Metadatos (Autor y Tiempo) + Indicadores del Carrusel */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs font-semibold text-[#64748b]">
            Editorial Staff <span className="mx-1.5 font-normal">•</span> <span className="font-normal opacity-80">8 min read</span>
          </span>

          {/* Puntitos de navegación si hay más de 1 post */}
          {featuredPosts.length > 1 && (
            <div className="flex items-center space-x-2">
              {featuredPosts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "w-6 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Divider sutil al final */}
      <div className="mt-12 w-full h-px bg-slate-100"></div>

    </div>
  );
}

export default FeaturedPosts;
