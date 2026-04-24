import { Outlet } from 'react-router-dom';
import Head from './Head';


/**
 * Componente AdminLayout:
 * Define la estructura visual específica para el panel de administración.
 * A diferencia del MainLayout, este no incluye el Head (Navbar) ni el Footer público,
 * lo que te permite crear una interfaz limpia para administrar el sitio.
 */
function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="min-h-screen flex flex-col bg-white">
      <Head /> {/* Barra de navegación global */}
      {/* Área de contenido del panel */}
      <main className="grow max-w-7xl mx-auto px-4 w-full py-8">
        <Outlet />
      </main>
      </div>
    </div>
  );
}

export default AdminLayout;
