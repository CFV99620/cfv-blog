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
    'HOME', 'TECH', 'LIFE', 'CULTURE', 'POLITICS', 
    'PHILOSOPHY', 'SCIENCE', 'SPORTS'
  ];

  return (
    /* header: Etiqueta semántica para el encabezado de la página. */
    <header className="w-full bg-white border-b border-gray-200">

      {/* Navigation Bar */}
      <nav className="border-t border-gray-100 py-3 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-6 md:gap-10">
          {/* Generación dinámica de enlaces: Usamos .map() para recorrer el array 'navItems' y crear un <Link> por cada categoría. */}
          {navItems.map((item) => (
            <Link 
              key={item} 
              to={item === "HOME" ? "/" : `/category/${item}`}
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
