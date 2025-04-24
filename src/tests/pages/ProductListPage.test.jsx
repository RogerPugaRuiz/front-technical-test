import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductListPage from '../../pages/ProductListPage';

// Mock del servicio de productos
vi.mock('../../service/product.service', () => ({
  getAllProducts: () => Promise.resolve([
    {
      id: '1',
      brand: 'Acer',
      model: 'Liquid Z6',
      price: '120',
      imgUrl: 'https://itx-frontend-test.onrender.com/images/8hKbH2UHPM_944nRHYN1n.jpg'
    },
    {
      id: '2',
      brand: 'Apple',
      model: 'iPhone 13',
      price: '900',
      imgUrl: 'https://itx-frontend-test.onrender.com/images/iphone13.jpg'
    }
  ])
}));

describe('ProductListPage', () => {
  it('muestra la lista de productos', async () => {
    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Acer\s*-\s*Liquid Z6/i)).toBeInTheDocument();
    expect(await screen.findByText(/Apple\s*-\s*iPhone 13/i)).toBeInTheDocument();
  });

  it('filtra productos por búsqueda', async () => {
    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Acer\s*-\s*Liquid Z6/i)).toBeInTheDocument();
    const input = screen.getByPlaceholderText(/buscar por marca o modelo/i);
    fireEvent.change(input, { target: { value: 'Apple' } });
    expect(screen.queryByText(/Acer\s*-\s*Liquid Z6/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Apple\s*-\s*iPhone 13/i)).toBeInTheDocument();
  });
});
