import '@/styles/globals.css'
import '@/styles/login.css';
import Navbar from '@/src/navbar';
import Footer from '@/src/footer';

import store,{Persistor} from '@/src/store';
import {positions,transitions , Provider as AlertProvider} from "react-alert";
import AlertTemplate from 'react-alert-template-basic';;
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


const options = {
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transition:transitions.SCALE,
}


export default function App({ Component, pageProps }) {
  return (
  <>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <PersistGate loading={null} persistor={Persistor}>
          <Navbar/>
            <Component {...pageProps} />
          <Footer/>
        </PersistGate>
      </AlertProvider>
    </Provider>
  </>
  );
}
