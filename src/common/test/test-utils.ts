/* import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import { ChatContext } from "../../application/context/ChatContext/ChatContext";
import { AppContext } from "../../application/context/AppContext";

const customRender = (ui, options = {}) => {
  const Providers = ({ children }) => (
    <AppContext.Provider value={{ user: { name: '' } }}>
        {children}
    </AppContext>
  );
  return render(ui, { wrapper: Providers });
};

export * from '@testing-library/react';
export { customRender as render, userEvent };
 */