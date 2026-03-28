import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '15px 30px',
      display: 'flex',
      gap: '30px',
      alignItems: 'center'
    }}>
      <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>
        🛒 Condomínio Market
      </span>
      <Link to="/" style={linkStyle}>Produtos</Link>
      <Link to="/categorias" style={linkStyle}>Categorias</Link>
      <Link to="/clientes" style={linkStyle}>Clientes</Link>
      <Link to="/pedidos" style={linkStyle}>Pedidos</Link>
    </nav>
  )
}

const linkStyle = {
  color: '#ecf0f1',
  textDecoration: 'none',
  fontSize: '15px'
}

export default Navbar