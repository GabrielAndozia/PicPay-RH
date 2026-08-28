package com.picpay.rh.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.picpay.rh.entity.Funcionario;
import com.picpay.rh.service.FuncionarioService;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {

    private FuncionarioService service;

    public FuncionarioController(FuncionarioService service) {
        this.service = service;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarFuncionario(
            @PathVariable int id,
            @RequestBody Funcionario funcionario) {

        Funcionario atualizado = service.atualizarFuncionario(id, funcionario);

        if (atualizado == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(atualizado);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> atualizarParcialmente(
            @PathVariable int id,
            @RequestBody Funcionario funcionario) {

        Funcionario atualizado = service.atualizarFuncionarioParcial(id, funcionario);

        if (atualizado == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirFuncionario(
            @PathVariable int id) {

        boolean removido = service.deletarFuncionario(id);

        if (!removido) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}
