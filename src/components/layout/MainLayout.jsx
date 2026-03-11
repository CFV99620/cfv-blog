import { Outlet } from 'react-router-dom'; /* - 'Outlet': Es un "espacio reservado" donde se renderizarán las páginas hijas. */
import NavBar from './NavBar';

/**
 * Componente MainLayout:
 * Define la estructura visual que comparten todas las páginas (Header, Footer, etc.)
 * cfv nota: los comentarios dentro del componente JSX se envuelven en bloques especiales de llaves y asteriscos.
 */
function MainLayout() {
  return (
    /* Contenedor principal: min-h-screen asegura que el layout ocupe al menos toda la altura de la pantalla. */
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar /> {/* Barra de navegación global */}
      {/* Área de contenido principal: max-w-7xl limita el ancho para que no se estire demasiado en pantallas grandes. */}
      <main className="grow max-w-7xl mx-auto px-4 w-full py-8">
        {/* Outlet (cfv nota): Aquí es donde React Router "inyecta" el componente que corresponda a la ruta actual (por ejemplo, PostList si estamos en la raíz). */}
        <Outlet />
      </main>

      {/* Footer: Pie de página con información de copyright y links legales. */}
      <footer className="w-full bg-slate-900 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-slate-400 text-sm">
            © 2024 THE DAILY LEDGER MEDIA GROUP. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
