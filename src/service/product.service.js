// Servicio para interactuar con la API de productos
const BASE_URL = 'https://itx-frontend-test.onrender.com/api';
const PRODUCTS_CACHE_KEY = 'products_cache';
const PRODUCTS_CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hora en ms

export async function getAllProducts() {
  const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < PRODUCTS_CACHE_EXPIRATION) {
      return data;
    }
  }
  const response = await fetch(`${BASE_URL}/product`);
  if (!response.ok) throw new Error('Error al obtener productos');
  const data = await response.json();
  localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  return data;
}

export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/product/${id}`);
  if (!response.ok) throw new Error('Error al obtener el producto');
  return response.json();
}

export async function addProductToCart(product) {
	const response = await fetch(`${BASE_URL}/cart`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(product),
	});
	if (!response.ok) throw new Error('Error al añadir el producto al carrito');
	const data = await response.json();
	const cartCount = localStorage.getItem('cartCount');
	if (cartCount) {
		data.count += parseInt(cartCount, 10);
	}
	// Persistir el número de productos en la cesta
	localStorage.setItem('cartCount', data.count);
	window.dispatchEvent(new Event('cartCountChanged'));
	return data;
}

export async function getCartCount() {
	const count = localStorage.getItem('cartCount');
	return count ? parseInt(count, 10) : 0;
}


