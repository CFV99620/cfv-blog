import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      <main className="flex-grow max-w-7xl mx-auto px-4 w-full py-8">
        <Outlet />
      </main>
      {/* Footer will go here later */}
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
