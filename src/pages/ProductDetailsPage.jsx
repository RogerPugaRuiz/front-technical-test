// ProductDetailsPage.jsx
import { useParams } from 'react-router-dom';

export default function ProductDetailsPage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Product Details Page</h1>
      <p>ID del producto: {id}</p>
      {/* Aquí irán los detalles del producto */}
    </div>
  );
}
