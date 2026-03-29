import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProdutosPage from './pages/ProdutosPage'
import CategoriasPage from './pages/CategoriasPage'
import ClientesPage from './pages/ClientesPage'
import PedidosPage from './pages/PedidosPage'
import TotemPage from './pages/TotemPage'

function App() {
  const location = useLocation()
  const isTotem = location.pathname === '/totem'

  return (
    <div>
      {!isTotem && <Navbar />}
      <div style={{ padding: isTotem ? '0' : '20px' }}>
        <Routes>
          <Route path="/" element={<ProdutosPage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/pedidos" element={<PedidosPage />} />
          <Route path="/totem" element={<TotemPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App