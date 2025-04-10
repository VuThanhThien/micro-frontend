import AppRoutes from "AppRoutes";
import Loader from "components/Loader";
import React from "react";
import './index.css'

function App() {
  return (
    <React.Suspense fallback={<Loader />}>
      <AppRoutes />
    </React.Suspense>
  );
}

export default App;
