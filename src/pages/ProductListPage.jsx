// ProductListPage.jsx
import { useEffect, useState } from 'react';
import { getAllProducts } from '../service/product.service';
import { useNavigate } from 'react-router-dom';

export default function ProductListPage() {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const filteredProducts = products.filter(product =>
		product.brand.toLowerCase().includes(search.toLowerCase()) ||
		product.model.toLowerCase().includes(search.toLowerCase())
	);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchProducts() {
			try {
				const data = await getAllProducts();
				setProducts(data);
			} catch (error) {
				console.error('Error al obtener los productos:', error);
			}
		}
		fetchProducts();
	}, []);
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6 text-center">¡Encuentra el móvil perfecto para ti!</h1>
			<div className="flex justify-center mb-6">
				<input
					type="text"
					placeholder="Buscar por marca o modelo..."
					value={search}
					onChange={e => setSearch(e.target.value)}
					className="w-full max-w-md px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
				/>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{filteredProducts.map(product => (
						<div
						key={product.id}
						className="bg-white border border-gray-200 rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition-shadow cursor-pointer"
						onClick={() => navigate(`/product/${product.id}`)}
					>
						<img src={product.imgUrl} alt={product.model} className="w-32 h-32 object-contain mb-4" />
						<h2 className="font-semibold text-lg mb-2 text-center text-gray-700">{product.brand}-{product.model}</h2>
						<p className="text-gray-600 mb-2">{product.price ? product.price + ' €' : 'Sin precio'}</p>
						{/* Puedes agregar más detalles o un botón aquí */}
					</div>
				))}
			</div>
		</div>
	);
}
