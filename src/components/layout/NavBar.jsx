import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

function NavBar() {
  const navItems = [
    'TECH', 'LIFE', 'CULTURE', 'POLITICS', 
    'BUSINESS', 'SCIENCE', 'OPINION', 'SPORTS'
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Search Icon */}
        <div className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900 transition-colors">
          <Search size={20} />
          <span className="text-sm font-medium hidden sm:inline">Search</span>
        </div>

        {/* Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-slate-900 whitespace-nowrap">
            THE DAILY LEDGER
          </h1>
        </Link>

        {/* Right Actions */}
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
