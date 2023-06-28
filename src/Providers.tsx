/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { ModalProvider, light, dark } from '@andex/uikit'
import { useThemeManager } from './state/user/hooks'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import store from './state'

const ThemeProviderWrapper = (props: any) => {
  const [isDark] = useThemeManager();
  return <ThemeProvider theme={isDark ? dark : light} {...props} />
}

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProviderWrapper>
          <ModalProvider>{children}</ModalProvider>
        </ThemeProviderWrapper>
      </HelmetProvider>
    </Provider>
  )
}

export default Providers