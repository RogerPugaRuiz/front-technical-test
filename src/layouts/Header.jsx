// Header.jsx
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/cb579089-1513-4b3a-b4fd-b45e19598b06.png';

export default function Header() {
  const location = useLocation();
  const match = location.pathname.match(/^\/product\/(\w+)/);
  const productId = match ? match[1] : null;

  return (
    <header className="p-4 mb-8 flex items-center border-b border-gray-200 dark:border-gray-600">
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
          {productId && (
            <>
              <li className="mx-2 text-gray-500 dark:text-gray-400">/</li>
              <li className="text-gray-500 dark:text-gray-400">{productId}</li>
            </>
          )}
        </ol>
      </nav>
    </header>
  );
}
