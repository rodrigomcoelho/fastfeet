import { useSelector } from 'react-redux';

import CreateRoutes from './routes';

export default function App() {
  const isSigned = useSelector((state) => state.auth.signed);
  return CreateRoutes(isSigned);
}
