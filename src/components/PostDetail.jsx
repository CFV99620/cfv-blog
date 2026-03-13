import { useParams } from "react-router-dom";

/**
 * Componente PostDetail:
 * Muestra el contenido completo de un artículo basado en su slug.
 */
function PostDetail() {
  const { slug } = useParams();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-12">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">
            Post Detail
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-6 leading-tight">
            Contenido de: {slug}
          </h1>
          <div className="prose prose-slate lg:prose-xl">
            <p className="text-slate-600 leading-relaxed">
              Este es un marcador de posición para el contenido del post con slug: <strong>{slug}</strong>.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              En el futuro, aquí realizaremos una llamada a la API para obtener el contenido completo 
              utilizando el slug de la URL.
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-100">
            <a href="/" className="text-blue-600 font-bold hover:underline">
              ← Volver a la lista
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
