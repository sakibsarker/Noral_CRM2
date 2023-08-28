import { Provider } from 'react-redux'

import { ReactElement, ReactNode } from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import store from './../store'

import '../styles/style.scss'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <>
    <Provider store={store}>
      <Head>
        <title>Nolara ERP</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
    </>
  )
}
