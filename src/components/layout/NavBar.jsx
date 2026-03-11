import { Search } from 'lucide-react'; /* - 'Search': Componente de icono para la funcionalidad de búsqueda. */
import { Link } from 'react-router-dom'; /* - 'Link': Componente de React Router para crear enlaces de navegación sin recargar la página. */

/**
 * Componente NavBar:
 * Renderiza la barra de navegación superior de la aplicación.
 * cfv nota: los comentarios dentro del componente JSX se envuelven en bloques especiales de llaves y asteriscos.
 */
function NavBar() {
  /* Array de categorías de navegación. */
  const navItems = [
    'TECH', 'LIFE', 'CULTURE', 'POLITICS', 
    'BUSINESS', 'SCIENCE', 'OPINION', 'SPORTS'
  ];

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
            THE DAILY LEDGER
          </h1>
        </Link>

        {/* Botones de acción (Iniciar sesión / Suscribirse) cfv nota: el to es para indicar la ruta a la que se va a navegar*/}
        <div className="flex items-center gap-4 md:gap-6">
          <Link to="/signin" className="text-sm font-semibold text-slate-700 hover:text-slate-900 hidden xs:block">
            Sign In
          </Link>
          <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
            Subscribe
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="border-t border-gray-100 py-3 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-6 md:gap-10">
          {/* Generación dinámica de enlaces: Usamos .map() para recorrer el array 'navItems' y crear un <Link> por cada categoría. */}
          {navItems.map((item) => (
            <Link 
              key={item} 
              to={`/category/${item.toLowerCase()}`}
              className="nav-link whitespace-nowrap"
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
