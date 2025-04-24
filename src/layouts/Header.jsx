// Header.jsx
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/cb579089-1513-4b3a-b4fd-b45e19598b06.png';

export default function Header() {
  const location = useLocation();
  // Extraer el modelo si la ruta es /product/:model
  const match = location.pathname.match(/^\/product\/(.+)$/);
  const productModel = match ? decodeURIComponent(match[1]) : null;

  return (
    <header className="p-4 mb-8 flex items-center border-b border-gray-200 dark:border-gray-600 justify-between">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>
        <nav className="ml-4 text-sm" aria-label="breadcrumbs">
          <ol className="list-reset flex">
            <li>
              <Link to="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Inicio
              </Link>
            </li>
            {productModel && (
              <>
                <li className="mx-2 text-gray-500 dark:text-gray-400">/</li>
                <li className="text-gray-500 dark:text-gray-400">{productModel}</li>
              </>
            )}
          </ol>
        </nav>
      </div>
      <div className="relative flex items-center">
        <div className='text-gray-700 dark:text-gray-500 cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        </div>
        <span className="absolute -top-4 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">0</span>
      </div>
    </header>
  );
}
