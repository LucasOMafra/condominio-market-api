package com.condominiomarket.api.service;

import com.condominiomarket.api.model.Cliente;
import com.condominiomarket.api.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    public Cliente buscarPorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com id: " + id));
    }

    public Cliente criar(Cliente cliente) {
        // Garante que não existe outro cliente com o mesmo CPF ou email
        if (clienteRepository.existsByCpf(cliente.getCpf())) {
            throw new RuntimeException("CPF já cadastrado: " + cliente.getCpf());
        }
        if (clienteRepository.existsByEmail(cliente.getEmail())) {
            throw new RuntimeException("Email já cadastrado: " + cliente.getEmail());
        }
        return clienteRepository.save(cliente);
    }

    public Cliente atualizar(Long id, Cliente clienteAtualizado) {
        Cliente cliente = buscarPorId(id);
        cliente.setNome(clienteAtualizado.getNome());
        cliente.setTelefone(clienteAtualizado.getTelefone());
        cliente.setApartamento(clienteAtualizado.getApartamento());
        cliente.setTorre(clienteAtualizado.getTorre());
        // CPF e email não podem ser alterados após cadastro
        return clienteRepository.save(cliente);
    }

    public void deletar(Long id) {
        buscarPorId(id);
        clienteRepository.deleteById(id);
    }
}