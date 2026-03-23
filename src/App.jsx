import { BrowserRouter, Routes, Route } from 'react-router-dom';/* - 'react-router-dom': Librería estándar para manejar la navegación entre páginas.*/
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import PostDetail from './components/PostDetail';
import Category from './pages/Category';

/**
 * Componente Principal (App):
 * Es la raíz de tu aplicación React. Aquí es donde definimos la "Hoja de Ruta"
 * de qué componentes se deben mostrar según la dirección (URL) que visite el usuario.
 * cfv nota: tomar en cuenta que para leer esta documentacion los comentarios dentro de los componentes se envuelven en {/*}
 * las notas se generaron con ia exepto las especificadas como cfv nota
 */ 
function App() {
  return (
    /* BrowserRouter: Envuelve toda la aplicación para habilitar el uso de URLs. // cfv nota: le dice a React: "escucha los cambios en la barra de direcciones del navegador".*/
    <BrowserRouter>
      <Routes>{/*Routes: Actúa como un contenedor que busca la mejor coincidencia entre las rutas definidas. cfv nota: decide qué componente mostrar dependiendo de lo escrito en la URL.*/}
        <Route path="/" element={<MainLayout />}>{/* cfv nota: Es la definición de cada camino específico en este cas para la ruta "/" */}
          <Route index element={<Home />} /> {/* 'index' indica que este es el componente por defecto que se muestra cuando el usuario entra a la raíz ("/") del sitio.*/}
          <Route path="post/:id" element={<PostDetail />} />
          <Route path="category/:category" element={<Category />} />
          
          {/* Aquí podrás añadir más rutas en el futuro, por ejemplo:
              <Route path="about" element={<About />} /> 
          */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
