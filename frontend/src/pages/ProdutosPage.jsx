import { useEffect, useState } from 'react'
import api from '../services/api'

function ProdutosPage() {
  const [produtos, setProdutos] = useState([])
  const [form, setForm] = useState({ nome: '', descricao: '', preco: '', estoque: '', categoria: { id: '' } })
  const [categorias, setCategorias] = useState([])

  // Carrega produtos e categorias ao abrir a página
  useEffect(() => {
    carregarProdutos()
    carregarCategorias()
  }, [])

  const carregarProdutos = async () => {
    const res = await api.get('/produtos')
    setProdutos(res.data)
  }

  const carregarCategorias = async () => {
    const res = await api.get('/categorias')
    setCategorias(res.data)
  }

  const salvar = async () => {
    await api.post('/produtos', form)
    setForm({ nome: '', descricao: '', preco: '', estoque: '', categoria: { id: '' } })
    carregarProdutos()
  }

  const deletar = async (id) => {
    await api.delete(`/produtos/${id}`)
    carregarProdutos()
  }

  return (
    <div>
      <h2>Produtos</h2>

      <div style={formStyle}>
        <input placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} style={inputStyle} />
        <input placeholder="Descrição" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} style={inputStyle} />
        <input placeholder="Preço" type="number" value={form.preco} onChange={e => setForm({ ...form, preco: e.target.value })} style={inputStyle} />
        <input placeholder="Estoque" type="number" value={form.estoque} onChange={e => setForm({ ...form, estoque: e.target.value })} style={inputStyle} />
        <select value={form.categoria.id} onChange={e => setForm({ ...form, categoria: { id: e.target.value } })} style={inputStyle}>
          <option value="">Selecione a categoria</option>
          {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
        <button onClick={salvar} style={btnStyle}>Salvar</button>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>ID</th><th>Nome</th><th>Preço</th><th>Estoque</th><th>Categoria</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>R$ {p.preco}</td>
              <td>{p.estoque}</td>
              <td>{p.categoriaNome || '-'}</td>
              <td>
                <button onClick={() => deletar(p.id)} style={btnDangerStyle}>Deletar</button>
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

export default ProdutosPage