import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

function Sidebar() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de registro real conectada al backend
    console.log('Registrando usuario con:', email);
  };

  const [recommendedLinks, setRecommendedLinks] = useState([]);

  useEffect(() => {
    api.get("/api/recommendations/list/featured")
      .then(res => {
        setRecommendedLinks(res.data);
      })
      .catch(err => console.error("Error al cargar recommendations destacados:", err));
  }, []);

  return (
    <aside className="space-y-10 py-4 lg:py-8 lg:pl-6">
      
      {/* Sección de Enlaces Recomendados */}
      <div>
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3 mb-6 text-slate-900 tracking-tight uppercase">
          Recomendado
        </h3>
        <ul className="space-y-5 mt-4">
          {recommendedLinks.map((link, index) => (
            <li key={link.id} className="group flex gap-4 items-start">
              <span className="text-3xl font-bold text-slate-200 group-hover:text-blue-200 transition-colors leading-none">
                0{index + 1}
              </span>
              <Link to={link.url} className="text-slate-800 font-bold hover:text-blue-600 transition-colors leading-snug">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Separador (Solo visible en desktop) */}
      <div className="hidden lg:block w-full h-px bg-slate-100"></div>

      {/* Formulario de Registro */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Únete a nuestra comunidad
        </h3>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          Regístrate para guardar tus artículos favoritos y recibir nuestro newsletter exclusivo.
        </p>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Correo electrónico</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico" 
              className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña" 
              className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
          >
            Registrarse
          </button>
        </form>
        
        <p className="text-[10px] text-slate-400 mt-4 text-center leading-relaxed">
          Al suscribirte, aceptas nuestros Términos de Servicio y Política de Privacidad.
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;
