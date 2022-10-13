
import React from 'react';
import { Suspense } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import CustomeRoutes from './Routes/CustomeRoutes.js';
import UnderMaintenance from './pages/UnderMaintenance';


function App() {
  const isInMaintenance = false;
  if (isInMaintenance) {
    return <UnderMaintenance />;
  }
  return (
    <>
      <Suspense >
        <Header />
        <CustomeRoutes />
        <Footer />
      </Suspense>
      <a href="javascript:void(0)" className="scrollToTop"><i className="fas fa-angle-double-up"></i></a>

    </>
  );
}


export default App;
