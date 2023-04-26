import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const Index = lazy(() => import('./routes/index'));
const WantEat = lazy(() => import('./routes/wanteat'));
const NoHotFood = lazy(() => import('./routes/nohotfood'));
const HotFood = lazy(() => import('./routes/hotfood'));
const Noodle = lazy(() => import('./routes/noodle'));
const Rice = lazy(() => import('./routes/rice'));
const JapaneseFood = lazy(() => import('./routes/japanesefood'));
const Nextweek = lazy(() => import('./routes/nextweek'));
const Feedback = lazy(() => import('./routes/feedback'));
const Error = lazy(() => import('./routes/404'));
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Suspense><Index /></Suspense>
      },
      {
        path: "/wanteat",
        element: <Suspense><WantEat /></Suspense>
      },
      {
        path: "/feedback",
        element: <Suspense><Feedback /></Suspense>
      },
      {
        path: "/nohotfood",
        element: <Suspense><NoHotFood /></Suspense>
      },
      {
        path: "/hotfood",
        element: <Suspense><HotFood /></Suspense>
      },
      {
        path: "/noodle",
        element: <Suspense><Noodle /></Suspense>
      },
      {
        path: "/rice",
        element: <Suspense><Rice /></Suspense>
      },
      {
        path: "/japanesefood",
        element: <Suspense><JapaneseFood /></Suspense>
      },
      {
        path: "/nextweek",
        element: <Suspense><Nextweek /></Suspense>
      },
      {
        path: "*",
        element: <Suspense><Error /></Suspense>
      }
    ]

  }

]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)