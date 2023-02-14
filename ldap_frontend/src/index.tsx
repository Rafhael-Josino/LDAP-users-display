import "./index.css";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './components/App';

const router = createBrowserRouter([
    {
        path: "/*", 
        element: <App />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(<RouterProvider router={router} />);