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

        validarFuncionario(funcionarioRequestDTO);

        return repository.save(funcionarioRequestDTO);
    }

    public List<FuncionarioResponseDTO> buscarTodos() {
        return repository.findAll();
    }

    public FuncionarioResponseDTO buscarPorId(long id) {

        validarId(id);

        return repository.findById(id);
    }

    public FuncionarioResponseDTO atualizarFuncionario(
            long id,
            FuncionarioRequestDTO funcionarioRequestDTO) {

        validarId(id);
        validarFuncionario(funcionarioRequestDTO);

        return repository.fullAlter(id, funcionarioRequestDTO);
    }

    public FuncionarioResponseDTO atualizarParcialmente(
            long id,
            FuncionarioRequestDTO funcionarioRequestDTO) {

        validarId(id);
        validarPatch(funcionarioRequestDTO);

        return repository.partialAlter(id, funcionarioRequestDTO);
    }

    public boolean excluirFuncionario(long id) {

        validarId(id);

        return repository.remove(id);
    }


    private void validarId(long id) {

        if (id <= 0) {
            throw new IllegalArgumentException(
                    "O ID deve ser maior que zero."
            );
        }
    }

    private void validarFuncionario(FuncionarioRequestDTO funcionario) {

        if (funcionario == null) {
            throw new IllegalArgumentException(
                    "Os dados do funcionário não podem ser nulos."
            );
        }

        if (funcionario.getNome() == null ||
            funcionario.getNome().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "O nome é obrigatório."
            );
        }

        if (funcionario.getEmail() == null ||
            funcionario.getEmail().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "O e-mail é obrigatório."
            );
        }

        if (!funcionario.getEmail().contains("@")) {

            throw new IllegalArgumentException(
                    "O e-mail informado é inválido."
            );
        }

        if (funcionario.getTelefone() == null ||
            funcionario.getTelefone().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "O telefone é obrigatório."
            );
        }

        if (funcionario.getCargo() == null ||
            funcionario.getCargo().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "O cargo é obrigatório."
            );
        }

        if (funcionario.getDepartamento() == null ||
            funcionario.getDepartamento().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "O departamento é obrigatório."
            );
        }

        if (funcionario.getCidade() == null ||
            funcionario.getCidade().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "A cidade é obrigatória."
            );
        }

        // Salário
        if (funcionario.getSalario() == null) {

            throw new IllegalArgumentException(
                    "O salário é obrigatório."
            );
        }

        if (funcionario.getSalario() < 0) {

            throw new IllegalArgumentException(
                    "O salário não pode ser negativo."
            );
        }

        if (funcionario.getStatus() == null ||
            funcionario.getStatus().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "O status é obrigatório."
            );
        }
    }

    private void validarPatch(FuncionarioRequestDTO funcionario) {

        if (funcionario == null) {
            throw new IllegalArgumentException(
                    "Os dados para atualização não podem ser nulos."
            );
        }

        

        if (funcionario.getNome() != null &&
            funcionario.getNome().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "O nome não pode ser vazio."
            );
        }

        if (funcionario.getEmail() != null) {

            if (funcionario.getEmail().trim().isEmpty()) {
                throw new IllegalArgumentException(
                        "O e-mail não pode ser vazio."
                );
            }

            if (!funcionario.getEmail().contains("@")) {
                throw new IllegalArgumentException(
                        "O e-mail informado é inválido."
                );
            }
        }

        if (funcionario.getTelefone() != null &&
            funcionario.getTelefone().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "O telefone não pode ser vazio."
            );
        }

        if (funcionario.getCargo() != null &&
            funcionario.getCargo().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "O cargo não pode ser vazio."
            );
        }

        if (funcionario.getDepartamento() != null &&
            funcionario.getDepartamento().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "O departamento não pode ser vazio."
            );
        }

        if (funcionario.getCidade() != null &&
            funcionario.getCidade().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "A cidade não pode ser vazia."
            );
        }

        if (funcionario.getSalario() != null &&
            funcionario.getSalario() < 0) {

            throw new IllegalArgumentException(
                    "O salário não pode ser negativo."
            );
        }

        if (funcionario.getStatus() != null &&
            funcionario.getStatus().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "O status não pode ser vazio."
            );
        }
    }
}