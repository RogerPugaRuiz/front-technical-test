import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from "../../layouts/Header";

describe('Header', () => {
  it('muestra el logo y el icono del carrito con contador', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    // Verifica que hay dos enlaces (logo y breadcrumbs)
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(2);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByLabelText(/breadcrumbs/i)).toBeInTheDocument();
  });

  it('muestra el id del producto en breadcrumbs si la ruta es de detalles', () => {
    render(
      <MemoryRouter initialEntries={["/product/123"]}>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText('123')).toBeInTheDocument();
  });

});
