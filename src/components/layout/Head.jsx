import { Search } from 'lucide-react'; /* - 'Search': Componente de icono para la funcionalidad de búsqueda. */
import { Link } from 'react-router-dom'; /* - 'Link': Componente de React Router para crear enlaces de navegación sin recargar la página. */

/**
 * Componente Head:
 * Renderiza la barra de navegación superior de la aplicación.
 * cfv nota: los comentarios dentro del componente JSX se envuelven en bloques especiales de llaves y asteriscos.
 */
function Head() {

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

      </div>

    </header>
  );
}

export default Head;
