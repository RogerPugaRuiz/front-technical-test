import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetailsPage from '../../pages/ProductDetailsPage';

// Mocks dentro del factory para evitar problemas de hoisting
vi.mock('../../service/product.service', () => {
  const getProductById = vi.fn(async (id) => ({
    id: 'test-id',
    brand: 'Acer',
    model: 'Liquid Z6',
    price: '120',
    imgUrl: 'https://itx-frontend-test.onrender.com/images/8hKbH2UHPM_944nRHYN1n.jpg',
    cpu: 'Quad-core 1.3 GHz Cortex-A53',
    ram: '2 GB RAM',
    os: 'Android 6.0',
    displayType: 'IPS LCD',
    displayResolution: '720 x 1280',
    battery: '5000 mAh',
    primaryCamera: ['13 MP', 'LED flash'],
    secondaryCmera: '5 MP',
    dimentions: '154 x 77 x 10 mm',
    weight: '120',
    status: 'Available',
    options: {
      colors: [{ code: 1000, name: 'Blue' }],
      storages: [{ code: 2000, name: '16 GB' }]
    },
    colors: ['Blue'],
    internalMemory: ['16 GB']
  }));
  const addProductToCart = vi.fn(async () => ({ count: 2 }));
  return { getProductById, addProductToCart };
});

// Importa los mocks después de vi.mock
import * as productService from '../../service/product.service';

describe('ProductDetailsPage', () => {
  beforeEach(() => {
    productService.getProductById.mockClear();
    productService.addProductToCart.mockClear();
  });

  it('muestra los datos principales del producto', async () => {
    render(
      <MemoryRouter initialEntries={["/product/test-id"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByText(/Acer - Liquid Z6/i)).toBeInTheDocument();
    // El precio aparece dos veces, así que usamos getAllByText
    expect(screen.getAllByText(/120\s*€/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Quad-core 1.3 GHz Cortex-A53/i)).toBeInTheDocument();
    expect(screen.getByText(/2 GB RAM/i)).toBeInTheDocument();
    expect(screen.getByText(/Android 6.0/i)).toBeInTheDocument();
    expect(screen.getByText(/IPS LCD - 720 x 1280/i)).toBeInTheDocument();
    expect(screen.getByText(/5000 mAh/i)).toBeInTheDocument();
    expect(screen.getByText(/13 MP, LED flash/i)).toBeInTheDocument();
    expect(screen.getByText(/5 MP/i)).toBeInTheDocument();
    expect(screen.getByText(/154 x 77 x 10 mm/i)).toBeInTheDocument();
    expect(screen.getByText(/120 g/i)).toBeInTheDocument();
  });

  it('permite seleccionar color y almacenamiento y añadir a la cesta', async () => {
    render(
      <MemoryRouter initialEntries={["/product/test-id"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
    await screen.findByText(/Acer - Liquid Z6/i);
    const colorSelect = screen.getByTestId('color-select');
    const storageSelect = screen.getByTestId('storage-select');
    expect(colorSelect.value).toBe('1000');
    expect(storageSelect.value).toBe('2000');
    const addBtn = screen.getByTestId('add-to-cart-btn');
    fireEvent.click(addBtn);
    await waitFor(() => expect(addBtn).toHaveTextContent(/añadir/i));
  });

  it('muestra los detalles del producto y permite añadir al carrito', async () => {
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByText(/Acer\s*-\s*Liquid Z6/i)).toBeInTheDocument();
    expect(screen.getAllByText(/120\s*€/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Available/i)).toBeInTheDocument();
    const colorSelect = screen.getByTestId('color-select');
    const storageSelect = screen.getByTestId('storage-select');
    expect(colorSelect).toBeInTheDocument();
    expect(storageSelect).toBeInTheDocument();
    fireEvent.change(colorSelect, { target: { value: '1000' } });
    fireEvent.change(storageSelect, { target: { value: '2000' } });
    const addButton = screen.getByTestId('add-to-cart-btn');
    fireEvent.click(addButton);
    expect(addButton).toBeDisabled();
    expect(await screen.findByText('Añadir')).toBeInTheDocument();
  });

  it('muestra mensaje de error si falla la carga', async () => {
    productService.getProductById.mockImplementationOnce(() => Promise.reject('error'));
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByText(/no se pudo cargar el producto/i)).toBeInTheDocument();
  });

  it('muestra mensaje de error si falla al añadir al carrito', async () => {
    productService.addProductToCart.mockImplementationOnce(() => Promise.reject('error'));
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByText(/Acer\s*-\s*Liquid Z6/i)).toBeInTheDocument();
    const addButton = screen.getByTestId('add-to-cart-btn');
    fireEvent.click(addButton);
    expect(await screen.findByText(/no se pudo añadir a la cesta/i)).toBeInTheDocument();
  });
});
