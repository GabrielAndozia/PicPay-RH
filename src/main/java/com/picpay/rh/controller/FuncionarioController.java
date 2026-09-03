package com.picpay.rh.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.picpay.rh.dto.FuncionarioRequestDTO;
import com.picpay.rh.dto.FuncionarioResponseDTO;
import com.picpay.rh.service.FuncionarioService;

@RestController
@RequestMapping("/funcionarios")
@CrossOrigin(originPatterns = "http://localhost:*")
public class FuncionarioController {

    private final FuncionarioService service;

    public FuncionarioController(FuncionarioService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<FuncionarioResponseDTO> salvar(
            @RequestBody FuncionarioRequestDTO funcionarioRequestDTO) {

        FuncionarioResponseDTO funcionario = service.salvar(funcionarioRequestDTO);

        return ResponseEntity.ok(funcionario);
    }

    @GetMapping
    public ResponseEntity<List<FuncionarioResponseDTO>> buscarTodos() {

        return ResponseEntity.ok(service.buscarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FuncionarioResponseDTO> buscarPorId(
            @PathVariable long id) {

        FuncionarioResponseDTO funcionario = service.buscarPorId(id);

        return ResponseEntity.ok(funcionario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FuncionarioResponseDTO> atualizarFuncionario(
            @PathVariable long id,
            @RequestBody FuncionarioRequestDTO funcionarioRequestDTO) {

        FuncionarioResponseDTO funcionario =
                service.atualizarFuncionario(id, funcionarioRequestDTO);

        return ResponseEntity.ok(funcionario);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<FuncionarioResponseDTO> atualizarParcialmente(
            @PathVariable long id,
            @RequestBody FuncionarioRequestDTO funcionarioRequestDTO) {

        FuncionarioResponseDTO funcionario =
                service.atualizarParcialmente(id, funcionarioRequestDTO);

        return ResponseEntity.ok(funcionario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirFuncionario(
            @PathVariable long id) {

        service.excluirFuncionario(id);

        return ResponseEntity.noContent().build();
    }
}