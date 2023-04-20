import { render, screen, fireEvent } from '@testing-library/react';
import ProfileAdmin from '../ProfileAdmin';

describe('ProfileAdmin', () => {
  test('clicking the last button hides the description input field', () => {
    render(<ProfileAdmin />);
    const descriptionInput = screen.getByLabelText('Sobre mí:');
    const editDescriptionButton = screen.getAllByTitle('Editar')[1];

    fireEvent.click(editDescriptionButton);

    expect(descriptionInput).toBeVisible();

    const hideDescriptionButton = screen.getByTitle('Cancelar');

    fireEvent.click(hideDescriptionButton);

    expect(descriptionInput).not.toBeVisible();
  });
});