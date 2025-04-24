// Servicio para interactuar con la API de productos
const BASE_URL = 'https://itx-frontend-test.onrender.com/api';

export async function getAllProducts() {
  const response = await fetch(`${BASE_URL}/product`);
  if (!response.ok) throw new Error('Error al obtener productos');
  return response.json();
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
		body: {
			id: product.id,
			colorCode: product.colorCode,
			storageCode: product.storageCode,
		}
	});
	if (!response.ok) throw new Error('Error al añadir el producto al carrito');
	return response.json();
}
