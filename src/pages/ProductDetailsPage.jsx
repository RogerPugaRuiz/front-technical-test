// ProductDetailsPage.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById, addProductToCart } from '../service/product.service';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
        // Selecciona por defecto la primera opción
        setSelectedColor(data.options?.colors?.[0]?.code || '');
        setSelectedStorage(data.options?.storages?.[0]?.code || '');
      } catch (err) {
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    setAdding(true);
    setAddError(null);
    try {
      const res = await addProductToCart({ id, colorCode: selectedColor, storageCode: selectedStorage });
      // Persistir el número de productos en la cesta
      localStorage.setItem('cartCount', res.count);
      window.dispatchEvent(new Event('cartCountChanged'));
    } catch (e) {
      setAddError('No se pudo añadir a la cesta');
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="text-center mt-8">Cargando...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white mb-8 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow p-5 transition-colors duration-300">
      <div className="flex flex-col items-center">
        <img src={product.imgUrl} alt={product.model} className="w-40 h-40 object-contain mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{product.brand} - {product.model}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-2">{product.price} €</p>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{product.status}</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
        <div><strong className="text-gray-700 dark:text-gray-300">Marca:</strong> <span className="text-gray-900 dark:text-white">{product.brand}</span></div>
        <div><strong className="text-gray-700 dark:text-gray-300">Modelo:</strong> <span className="text-gray-900 dark:text-white">{product.model}</span></div>
        <div><strong className="text-gray-700 dark:text-gray-300">Precio:</strong> <span className="text-gray-900 dark:text-white">{product.price} €</span></div>
        <div><strong className="text-gray-700 dark:text-gray-300">CPU:</strong> <span className="text-gray-900 dark:text-white">{product.cpu}</span></div>
        <div><strong className="text-gray-700 dark:text-gray-300">RAM:</strong> <span className="text-gray-900 dark:text-white">{product.ram}</span></div>
        <div><strong className="text-gray-700 dark:text-gray-300">Sistema Operativo:</strong> <span className="text-gray-900 dark:text-white">{product.os}</span></div>
        <div><strong className="text-gray-700 dark:text-gray-300">Resolución de pantalla:</strong> <span className="text-gray-900 dark:text-white">{product.displayType} - {product.displayResolution}</span></div>
        <div><strong className="text-gray-700 dark:text-gray-300">Batería:</strong> <span className="text-gray-900 dark:text-white">{product.battery}</span></div>
        <div><strong className="text-gray-700 dark:text-gray-300">Cámaras principales:</strong> <span className="text-gray-900 dark:text-white">{Array.isArray(product.primaryCamera) ? product.primaryCamera.join(', ') : product.primaryCamera}</span></div>
        <div><strong className="text-gray-700 dark:text-gray-300">Cámara frontal:</strong> <span className="text-gray-900 dark:text-white">{product.secondaryCmera}</span></div>
        <div><strong className="text-gray-700 dark:text-gray-300">Dimensiones:</strong> <span className="text-gray-900 dark:text-white">{product.dimentions}</span></div>
        <div><strong className="text-gray-700 dark:text-gray-300">Peso:</strong> <span className="text-gray-900 dark:text-white">{product.weight ? product.weight + ' g' : 'No disponible'}</span></div>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center items-center">
          <div className="w-full">
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">Color</label>
            <select
              className="border-2 border-blue-400 dark:border-blue-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-blue-700 dark:text-blue-200 bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 transition"
              value={selectedColor}
              onChange={e => setSelectedColor(e.target.value)}
              data-testid="color-select"
            >
              {product.options?.colors?.map(opt => (
                <option key={opt.code} value={opt.code}>{opt.name}</option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-200">Almacenamiento</label>
            <select
              className="border-2 border-blue-400 dark:border-blue-600 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-blue-700 dark:text-blue-200 bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 transition"
              value={selectedStorage}
              onChange={e => setSelectedStorage(e.target.value)}
              data-testid="storage-select"
            >
              {product.options?.storages?.map(opt => (
                <option key={opt.code} value={opt.code}>{opt.name}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900 text-white px-8 py-3 rounded-full shadow-lg text-lg font-bold hover:scale-105 hover:from-blue-600 hover:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-950 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          onClick={handleAddToCart}
          disabled={adding}
          data-testid="add-to-cart-btn"
        >
          {adding ? 'Añadiendo...' : 'Añadir'}
        </button>
      </div>
      {addError && <div className="text-red-500 mt-2 text-center font-semibold">{addError}</div>}
    </div>
  );
}
