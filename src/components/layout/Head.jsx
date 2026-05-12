import { Search, ArrowLeft } from 'lucide-react'; /* - 'Search': Componente de icono para la funcionalidad de búsqueda. *//** cfv nota: se agrego ArrowLeft es un icono para volver a la pagina de inicio desde el panel de administracion */
import { Link, useLocation } from 'react-router-dom'; /* - 'Link': Componente de React Router para crear enlaces de navegación sin recargar la página. */ /** cfv nota: useLocation es un hook de React Router para obtener la ubicación actual */

/**
 * Componente Head:
 * Renderiza la barra de navegación superior de la aplicación.
 * cfv nota: los comentarios dentro del componente JSX se envuelven en bloques especiales de llaves y asteriscos.
 */
function Head() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    /* header: Etiqueta semántica para el encabezado de la página. */
    <header className="w-full bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Search Icon */}
        <div className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900 transition-colors">
          <Search size={20} />
          <span className="text-sm font-medium hidden sm:inline">Search</span>
        </div>

        {/* Logo: Link nos lleva a la página de inicio (/) */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-slate-900 whitespace-nowrap">
            THE ORDINARY LIFE
          </h1>
        </Link>

        {/* Right Side - Publish/Home Button */}
        <div className="flex items-center">
          <Link 
            to={isAdmin ? "/" : "/admin"} 
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-colors shadow-sm"
          >
            {isAdmin && <ArrowLeft size={16} />}
            <span>{isAdmin ? "Home" : "Publicar"}</span>
          </Link>
        </div>

      </div>

    </header>
  );
}

export default Head;
