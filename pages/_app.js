import '../styles/globals.css'

// redux
import { Provider } from 'react-redux'
import store, {persistor} from '../store'
import {PersistGate} from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }) {
  
  return (
    <Provider
      store={store}
    >
      <PersistGate persistor={persistor}>
      <Component {...pageProps} />
      </PersistGate>
    </Provider> 
  )
}

export default MyApp
