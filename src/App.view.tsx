import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Map = React.lazy(() => import('./components/pages/Map/Map'));

interface Props { };

const AppView: React.FC<Props> = (props: React.PropsWithChildren<Props>) => (
  <BrowserRouter>
    <Suspense fallback={null}>
      <Routes>  
        <Route path="/" element={<Map />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

AppView.displayName = 'AppView';
AppView.defaultProps = {};

export default React.memo(AppView);
