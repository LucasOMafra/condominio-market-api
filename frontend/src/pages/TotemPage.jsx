import { useState, useEffect } from 'react'
import api from '../services/api'

const slides = [
  { emoji: '🛒', titulo: 'Mercearia', descricao: 'Qualidade e sabor para sua família', cor: '#c9c92eff' },
  { emoji: '🧃', titulo: 'Sucos Naturais', descricao: 'Frescos e gelados todos os dias', cor: '#27ae60' },
  { emoji: '🧴', titulo: 'Produtos de Limpeza', descricao: 'Tudo para manter sua casa em ordem', cor: '#2980b9' },
  { emoji: '🥛', titulo: 'Laticínios', descricao: 'Leite, queijo e iogurte fresquinhos', cor: '#8e44ad' },
]

function TotemPage() {
  const [tela, setTela] = useState('espera')
  const [slideAtual, setSlideAtual] = useState(0)
  const [cpf, setCpf] = useState('')
  const [cliente, setCliente] = useState(null)
  const [pedido, setPedido] = useState(null)
  const [erro, setErro] = useState('')
  const [ultimoItem, setUltimoItem] = useState(null)

  useEffect(() => {
    if (tela !== 'espera') return
    const timer = setInterval(() => {
      setSlideAtual(prev => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [tela])

  const formatarCpf = (valor) => {
    const numeros = valor.replace(/\D/g, '').slice(0, 11)
    return numeros
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  const identificarCliente = async () => {
    try {
      setErro('')
      const res = await api.get(`/clientes/cpf/${cpf}`)
      setCliente(res.data)
      const pedidoRes = await api.post(`/pedidos/cliente/${res.data.id}`)
      setPedido({ ...pedidoRes.data, itens: pedidoRes.data.itens || [] })
      setTela('carrinho')
    } catch (e) {
      setErro('Cliente não encontrado. Verifique o CPF.')
    }
  }

  const biparProduto = async (produtoId) => {
    try {
      setErro('')
      const res = await api.post(`/pedidos/${pedido.id}/itens?produtoId=${produtoId}&quantidade=1`)
      const itens = res.data.itens || []
      setPedido({ ...res.data, itens })
      setUltimoItem(itens[itens.length - 1])
    } catch (e) {
      setErro(e.response?.data?.message || 'Erro ao bipar produto.')
    }
  }

  const finalizar = async () => {
    try {
      const res = await api.post(`/pedidos/${pedido.id}/finalizar`)
      alert(`Compra finalizada! Total: R$ ${res.data.total}`)
      resetar()
    } catch (e) {
      setErro('Erro ao finalizar pedido.')
    }
  }

  const cancelar = async () => {
    await api.post(`/pedidos/${pedido.id}/cancelar`)
    resetar()
  }

  const resetar = () => {
    setCpf('')
    setCliente(null)
    setPedido(null)
    setUltimoItem(null)
    setErro('')
    setTela('espera')
  }

  const itens = pedido?.itens ?? []
  const slide = slides[slideAtual]

  // Tela de espera — centralizada vertical e horizontalmente
  if (tela === 'espera') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: slide.cor,
        transition: 'background-color 1s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{ textAlign: 'center', color: '#fff', padding: '40px' }}>
          <div style={{ fontSize: '70px', marginBottom: '15px' }}>{slide.emoji}</div>
          <h1 style={{ fontSize: '40px', marginBottom: '10px', margin: '0 0 10px' }}>{slide.titulo}</h1>
          <p style={{ fontSize: '20px', opacity: 0.85, marginBottom: '40px' }}>{slide.descricao}</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
            {slides.map((_, i) => (
              <div key={i} style={{
                width: i === slideAtual ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: '#fff',
                opacity: i === slideAtual ? 1 : 0.4,
                transition: 'all 0.3s ease'
              }} />
            ))}
          </div>
          <button onClick={() => setTela('login')} style={btnTotemStyle}>
            Toque para começar
          </button>
        </div>
      </div>
    )
  }

  // Tela de login — centralizada
  if (tela === 'login') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{ ...cardStyle, maxWidth: '400px' }}>
          <h1 style={{ fontSize: '40px', marginBottom: '10px' }}>🛒</h1>
          <h2 style={{ marginBottom: '10px', color: '#2c3e50' }}>Bem-vindo ao Market!</h2>
          <p style={{ color: '#666', marginBottom: '25px' }}>Digite seu CPF para começar</p>
          <input
            placeholder="000.000.000-00"
            value={cpf}
            onChange={e => setCpf(formatarCpf(e.target.value))}
            style={inputGrandeStyle}
          />
          {erro && <p style={{ color: 'red', marginTop: '10px' }}>{erro}</p>}
          <button onClick={identificarCliente} style={btnGrandeStyle}>Entrar</button>
          <button onClick={() => setTela('espera')} style={{ ...btnGrandeStyle, backgroundColor: '#aaa', marginTop: '10px' }}>
            Voltar
          </button>
        </div>
      </div>
    )
  }

  // Tela do carrinho
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f4f6f8',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <div style={{ width: '100%', maxWidth: '700px', boxSizing: 'border-box' }}>

        <div style={{ ...cardStyle, marginBottom: '20px', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0 }}>👤 {cliente.nome}</h3>
            <small style={{ color: '#666' }}>Apto {cliente.apartamento} — Torre {cliente.torre}</small>
          </div>
          <button onClick={cancelar} style={{ ...btnGrandeStyle, backgroundColor: '#e74c3c', padding: '10px 20px', fontSize: '14px', width: 'auto', marginTop: 0 }}>
            Cancelar
          </button>
        </div>

        {ultimoItem && (
          <div style={{ ...cardStyle, marginBottom: '20px', backgroundColor: '#eafaf1', borderLeft: '5px solid #2ecc71' }}>
            <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>Último item bipado</p>
            <h3 style={{ margin: '5px 0', color: '#2c3e50' }}>{ultimoItem.produtoNome}</h3>
            <p style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#27ae60' }}>
              R$ {ultimoItem.precoUnitario}
            </p>
          </div>
        )}

        <div style={{ ...cardStyle, marginBottom: '20px' }}>
          <p style={{ margin: '0 0 10px', color: '#666' }}>Bipar produto (ID do produto)</p>
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <input
              id="campoBipagem"
              placeholder="ID do produto"
              type="number"
              style={{ ...inputGrandeStyle, margin: 0, flex: 1 }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  biparProduto(e.target.value)
                  e.target.value = ''
                }
              }}
            />
            <button
              onClick={() => {
                const campo = document.getElementById('campoBipagem')
                biparProduto(campo.value)
                campo.value = ''
              }}
              style={{ ...btnGrandeStyle, margin: 0, padding: '10px 20px', width: 'auto' }}>
              Bipar
            </button>
          </div>
          {erro && <p style={{ color: 'red', marginTop: '10px' }}>{erro}</p>}
        </div>

        <div style={{ ...cardStyle, marginBottom: '20px' }}>
          <h3 style={{ margin: '0 0 15px', color: '#2c3e50' }}>🛒 Carrinho</h3>
          {itens.length === 0
            ? <p style={{ color: '#aaa', textAlign: 'center' }}>Nenhum item ainda</p>
            : itens.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee', width: '100%' }}>
                <span>{item.produtoNome} x{item.quantidade}</span>
                <span style={{ fontWeight: 'bold' }}>R$ {item.subtotal}</span>
              </div>
            ))
          }
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '20px', fontWeight: 'bold', width: '100%' }}>
            <span>Total</span>
            <span style={{ color: '#27ae60' }}>
              R$ {itens.reduce((acc, i) => acc + parseFloat(i.subtotal), 0).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Botão finalizar com mesmas dimensões dos cards */}
        <div style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
          <button onClick={finalizar} style={{
            width: '100%',
            fontSize: '20px',
            padding: '22px',
            backgroundColor: '#27ae60',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxSizing: 'border-box',
          }}>
            ✅ Finalizar Compra
          </button>
        </div>

      </div>
    </div>
  )
}

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '30px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  boxSizing: 'border-box',
}

const inputGrandeStyle = {
  padding: '14px',
  fontSize: '18px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  width: '100%',
  marginBottom: '15px',
  boxSizing: 'border-box',
  textAlign: 'center'
}

const btnGrandeStyle = {
  padding: '14px',
  fontSize: '18px',
  backgroundColor: '#2c3e50',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  width: '100%',
  marginTop: '10px',
  boxSizing: 'border-box',
}

const btnTotemStyle = {
  padding: '18px 40px',
  fontSize: '20px',
  backgroundColor: '#fff',
  color: '#2c3e50',
  border: 'none',
  borderRadius: '50px',
  cursor: 'pointer',
  fontWeight: 'bold',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
}

export default TotemPage