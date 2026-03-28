import { useEffect, useState } from 'react'
import api from '../services/api'

function CategoriasPage() {
  const [categorias, setCategorias] = useState([])
  const [form, setForm] = useState({ nome: '', descricao: '' })

  useEffect(() => { carregarCategorias() }, [])

  const carregarCategorias = async () => {
    const res = await api.get('/categorias')
    setCategorias(res.data)
  }

  const salvar = async () => {
    await api.post('/categorias', form)
    setForm({ nome: '', descricao: '' })
    carregarCategorias()
  }

  const deletar = async (id) => {
    await api.delete(`/categorias/${id}`)
    carregarCategorias()
  }

  return (
    <div>
      <h2>Categorias</h2>

      <div style={formStyle}>
        <input placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} style={inputStyle} />
        <input placeholder="Descrição" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} style={inputStyle} />
        <button onClick={salvar} style={btnStyle}>Salvar</button>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr><th>ID</th><th>Nome</th><th>Descrição</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {categorias.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nome}</td>
              <td>{c.descricao}</td>
              <td><button onClick={() => deletar(c.id)} style={btnDangerStyle}>Deletar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const formStyle = { display: 'flex', gap: '10px', marginBottom: '20px' }
const inputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '150px' }
const btnStyle = { padding: '8px 16px', backgroundColor: '#2c3e50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
const btnDangerStyle = { ...btnStyle, backgroundColor: '#e74c3c' }
const tableStyle = { width: '100%', borderCollapse: 'collapse' }

export default CategoriasPage