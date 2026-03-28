package com.condominiomarket.api.controller;

import com.condominiomarket.api.dto.PedidoResponseDTO;
import com.condominiomarket.api.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;

    @PostMapping("/cliente/{clienteId}")
    public ResponseEntity<PedidoResponseDTO> criarPedido(@PathVariable Long clienteId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pedidoService.criarPedido(clienteId));
    }

    @PostMapping("/{pedidoId}/itens")
    public ResponseEntity<PedidoResponseDTO> adicionarItem(
            @PathVariable Long pedidoId,
            @RequestParam Long produtoId,
            @RequestParam Integer quantidade) {
        return ResponseEntity.ok(pedidoService.adicionarItem(pedidoId, produtoId, quantidade));
    }

    @DeleteMapping("/{pedidoId}/itens/{itemId}")
    public ResponseEntity<PedidoResponseDTO> removerItem(
            @PathVariable Long pedidoId,
            @PathVariable Long itemId) {
        return ResponseEntity.ok(pedidoService.removerItem(pedidoId, itemId));
    }

    @PostMapping("/{pedidoId}/finalizar")
    public ResponseEntity<PedidoResponseDTO> finalizar(@PathVariable Long pedidoId) {
        return ResponseEntity.ok(pedidoService.finalizar(pedidoId));
    }

    @PostMapping("/{pedidoId}/cancelar")
    public ResponseEntity<PedidoResponseDTO> cancelar(@PathVariable Long pedidoId) {
        return ResponseEntity.ok(pedidoService.cancelar(pedidoId));
    }

    @GetMapping
    public ResponseEntity<List<PedidoResponseDTO>> listarTodos() {
        return ResponseEntity.ok(pedidoService.listarTodos());
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<PedidoResponseDTO>> listarPorCliente(@PathVariable Long clienteId) {
        return ResponseEntity.ok(pedidoService.listarPorCliente(clienteId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.buscarPorId(id));
    }
}