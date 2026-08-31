package com.picpay.rh.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.picpay.rh.dto.FuncionarioRequestDTO;
import com.picpay.rh.dto.FuncionarioResponseDTO;
import com.picpay.rh.repository.FuncionarioRepository;

@Service
public class FuncionarioService {

    private final FuncionarioRepository repository;

    public FuncionarioService(FuncionarioRepository repository) {
        this.repository = repository;
    }

    public FuncionarioResponseDTO salvar(FuncionarioRequestDTO funcionarioRequestDTO) {
        return repository.save(funcionarioRequestDTO);
    }

    public List<FuncionarioResponseDTO> buscarTodos() {
        return repository.findAll();
    }

    public FuncionarioResponseDTO buscarPorId(long id) {
        return repository.findById(id);
    }

    public FuncionarioResponseDTO atualizarFuncionario(
            long id,
            FuncionarioRequestDTO funcionarioRequestDTO) {

        return repository.fullAlter(id, funcionarioRequestDTO);
    }

    public FuncionarioResponseDTO atualizarParcialmente(
            long id,
            FuncionarioRequestDTO funcionarioRequestDTO) {

        return repository.partialAlter(id, funcionarioRequestDTO);
    }

    public boolean excluirFuncionario(long id) {
        return repository.remove(id);
    }
}