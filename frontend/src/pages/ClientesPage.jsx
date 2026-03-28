import { useEffect, useState } from 'react'
import api from '../services/api'

function ClientesPage() {
  const [clientes, setClientes] = useState([])
  const [form, setForm] = useState({ nome: '', cpf: '', email: '', telefone: '', apartamento: '', torre: '' })

  useEffect(() => { carregarClientes() }, [])

  const carregarClientes = async () => {
    const res = await api.get('/clientes')
    setClientes(res.data)
  }

  const salvar = async () => {
    await api.post('/clientes', form)
    setForm({ nome: '', cpf: '', email: '', telefone: '', apartamento: '', torre: '' })
    carregarClientes()
  }

  const deletar = async (id) => {
    await api.delete(`/clientes/${id}`)
    carregarClientes()
  }

  return (
    <div>
      <h2>Clientes</h2>

      <div style={formStyle}>
        <input placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} style={inputStyle} />
        <input placeholder="CPF" value={form.cpf} onChange={e => setForm({ ...form, cpf: e.target.value })} style={inputStyle} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
        <input placeholder="Telefone" value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} style={inputStyle} />
        <input placeholder="Apartamento" value={form.apartamento} onChange={e => setForm({ ...form, apartamento: e.target.value })} style={inputStyle} />
        <input placeholder="Torre" value={form.torre} onChange={e => setForm({ ...form, torre: e.target.value })} style={inputStyle} />
        <button onClick={salvar} style={btnStyle}>Salvar</button>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr><th>ID</th><th>Nome</th><th>CPF</th><th>Email</th><th>Apto</th><th>Torre</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {clientes.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nome}</td>
              <td>{c.cpf}</td>
              <td>{c.email}</td>
              <td>{c.apartamento}</td>
              <td>{c.torre}</td>
              <td><button onClick={() => deletar(c.id)} style={btnDangerStyle}>Deletar</button></td>
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

export default ClientesPage