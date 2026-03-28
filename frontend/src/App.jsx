import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProdutosPage from './pages/ProdutosPage'
import CategoriasPage from './pages/CategoriasPage'
import ClientesPage from './pages/ClientesPage'
import PedidosPage from './pages/PedidosPage'

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<ProdutosPage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/pedidos" element={<PedidosPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App