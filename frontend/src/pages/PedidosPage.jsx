import { useEffect, useState } from 'react'
import api from '../services/api'

function PedidosPage() {
  const [pedidos, setPedidos] = useState([])
  const [clientes, setClientes] = useState([])
  const [produtos, setProdutos] = useState([])
  const [clienteId, setClienteId] = useState('')
  const [produtoId, setProdutoId] = useState('')
  const [quantidade, setQuantidade] = useState(1)
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null)

  useEffect(() => {
    carregarPedidos()
    carregarClientes()
    carregarProdutos()
  }, [])

  const carregarPedidos = async () => {
    const res = await api.get('/pedidos')
    setPedidos(res.data)
  }

  const carregarClientes = async () => {
    const res = await api.get('/clientes')
    setClientes(res.data)
  }

  const carregarProdutos = async () => {
    const res = await api.get('/produtos')
    setProdutos(res.data)
  }

  // Abre o carrinho para o cliente selecionado
  const abrirCarrinho = async () => {
    await api.post(`/pedidos/cliente/${clienteId}`)
    carregarPedidos()
  }

  // Bipa o produto e adiciona ao pedido selecionado
  const adicionarItem = async () => {
    await api.post(`/pedidos/${pedidoSelecionado}/itens?produtoId=${produtoId}&quantidade=${quantidade}`)
    carregarPedidos()
  }

  const finalizar = async (id) => {
    await api.post(`/pedidos/${id}/finalizar`)
    carregarPedidos()
  }

  const cancelar = async (id) => {
    await api.post(`/pedidos/${id}/cancelar`)
    carregarPedidos()
  }

  return (
    <div>
      <h2>Pedidos</h2>

      {/* Abre novo carrinho */}
      <div style={formStyle}>
        <select value={clienteId} onChange={e => setClienteId(e.target.value)} style={inputStyle}>
          <option value="">Selecione o cliente</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
        <button onClick={abrirCarrinho} style={btnStyle}>Abrir Carrinho</button>
      </div>

      {/* Adiciona item ao pedido */}
      <div style={formStyle}>
        <select value={pedidoSelecionado} onChange={e => setPedidoSelecionado(e.target.value)} style={inputStyle}>
          <option value="">Selecione o pedido</option>
          {pedidos.filter(p => p.status === 'ABERTO').map(p => (
            <option key={p.id} value={p.id}>Pedido #{p.id} - {p.clienteNome}</option>
          ))}
        </select>
        <select value={produtoId} onChange={e => setProdutoId(e.target.value)} style={inputStyle}>
          <option value="">Selecione o produto</option>
          {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>
        <input type="number" min="1" value={quantidade} onChange={e => setQuantidade(e.target.value)} style={{ ...inputStyle, width: '60px' }} />
        <button onClick={adicionarItem} style={btnStyle}>Bipar Produto</button>
      </div>

      {/* Lista de pedidos */}
      <table style={tableStyle}>
        <thead>
          <tr><th>ID</th><th>Cliente</th><th>Status</th><th>Total</th><th>Itens</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {pedidos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.clienteNome}</td>
              <td>{p.status}</td>
              <td>R$ {p.total}</td>
              <td>
                {p.itens.map(i => (
                  <div key={i.id}>{i.produtoNome} x{i.quantidade} — R$ {i.subtotal}</div>
                ))}
              </td>
              <td style={{ display: 'flex', gap: '5px' }}>
                {p.status === 'ABERTO' && (
                  <>
                    <button onClick={() => finalizar(p.id)} style={btnStyle}>Finalizar</button>
                    <button onClick={() => cancelar(p.id)} style={btnDangerStyle}>Cancelar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const formStyle = { display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }
const inputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '150px' }
const btnStyle = { padding: '8px 16px', backgroundColor: '#2c3e50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
const btnDangerStyle = { ...btnStyle, backgroundColor: '#e74c3c' }
const tableStyle = { width: '100%', borderCollapse: 'collapse' }

export default PedidosPage