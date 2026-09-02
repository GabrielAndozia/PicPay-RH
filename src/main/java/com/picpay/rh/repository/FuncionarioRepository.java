package com.picpay.rh.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.picpay.rh.dto.FuncionarioResponseDTO;
import com.picpay.rh.dto.FuncionarioRequestDTO;
import com.picpay.rh.entity.Funcionario;
 
@Repository
public class FuncionarioRepository {
    private List<Funcionario> listaFuncionarios = new ArrayList<>();
    private long idAutomatico = 1L;

    public FuncionarioResponseDTO save(FuncionarioRequestDTO funcionarioRequestDTO) {
        Funcionario funcionario = new Funcionario(
            idAutomatico,
            funcionarioRequestDTO.getNome(),
            funcionarioRequestDTO.getEmail(),
            funcionarioRequestDTO.getTelefone(),
            funcionarioRequestDTO.getCargo(),
            funcionarioRequestDTO.getDepartamento(),
            funcionarioRequestDTO.getSalario(),
            funcionarioRequestDTO.getCidade(),
            funcionarioRequestDTO.getStatus()
        );

        listaFuncionarios.add(funcionario);
        idAutomatico ++;

        return new FuncionarioResponseDTO(
            funcionario.getId(),
            funcionario.getNome(),
            funcionario.getEmail(),
            funcionario.getTelefone(),
            funcionario.getCargo(),
            funcionario.getDepartamento(),
            funcionario.getSalario(),
            funcionario.getCidade(),
            funcionario.getStatus()
        );
    }

    public List<FuncionarioResponseDTO> findAll() {
        List<FuncionarioResponseDTO> listaFuncionariosResponse = new ArrayList<>();
        for (Funcionario f : listaFuncionarios) {
            listaFuncionariosResponse.add(
                new FuncionarioResponseDTO(
                    f.getId(),
                    f.getNome(),
                    f.getEmail(),
                    f.getTelefone(),
                    f.getCargo(),
                    f.getDepartamento(),
                    f.getSalario(),
                    f.getCidade(),
                    f.getStatus()
                )
            );
        }
        return listaFuncionariosResponse;
    }

    public FuncionarioResponseDTO findById(long id) {
        for (Funcionario f : listaFuncionarios) {
            if (f.getId() == id) {
                return new FuncionarioResponseDTO(
                    f.getId(),
                    f.getNome(),
                    f.getEmail(),
                    f.getTelefone(),
                    f.getCargo(),
                    f.getDepartamento(),
                    f.getSalario(),
                    f.getCidade(),
                    f.getStatus()
                );
            }
        }

        return new FuncionarioResponseDTO();
    }

    public FuncionarioResponseDTO fullAlter(long id, FuncionarioRequestDTO funcionarioRequestDTO) {
        for (Funcionario f : listaFuncionarios) {
            if (f.getId() == id) {
                f.setNome(funcionarioRequestDTO.getNome());
                f.setEmail(funcionarioRequestDTO.getEmail());
                f.setTelefone(funcionarioRequestDTO.getTelefone());
                f.setCargo(funcionarioRequestDTO.getCargo());
                f.setDepartamento(funcionarioRequestDTO.getDepartamento());
                f.setSalario(funcionarioRequestDTO.getSalario());
                f.setCidade(funcionarioRequestDTO.getCidade());
                f.setStatus(funcionarioRequestDTO.getStatus());

                return new FuncionarioResponseDTO(
                    f.getId(),
                    f.getNome(),
                    f.getEmail(),
                    f.getTelefone(),
                    f.getCargo(),
                    f.getDepartamento(),
                    f.getSalario(),
                    f.getCidade(),
                    f.getStatus()
                );
            }
        }

        return new FuncionarioResponseDTO();
    }

    public FuncionarioResponseDTO partialAlter(long id, FuncionarioRequestDTO funcionarioRequestDTO) {
        for (Funcionario f : listaFuncionarios) {
            if (f.getId() == id) {
                if (funcionarioRequestDTO.getNome() != null) {
                    f.setNome(funcionarioRequestDTO.getNome());
                }
                if (funcionarioRequestDTO.getEmail() != null) {
                    f.setEmail(funcionarioRequestDTO.getEmail());
                }
                if (funcionarioRequestDTO.getTelefone() != null) {
                    f.setTelefone(funcionarioRequestDTO.getTelefone());
                }
                if (funcionarioRequestDTO.getCargo() != null) {
                    f.setCargo(funcionarioRequestDTO.getCargo());
                }
                if (funcionarioRequestDTO.getDepartamento() != null) {
                    f.setDepartamento(funcionarioRequestDTO.getDepartamento());
                }
                if (funcionarioRequestDTO.getSalario() != null) {
                    f.setSalario(funcionarioRequestDTO.getSalario());
                }
                if (funcionarioRequestDTO.getCidade() != null) {
                    f.setCidade(funcionarioRequestDTO.getCidade());
                }
                if (funcionarioRequestDTO.getStatus() != null) {
                    f.setStatus(funcionarioRequestDTO.getStatus());
                }

                return new FuncionarioResponseDTO(
                    f.getId(),
                    f.getNome(),
                    f.getEmail(),
                    f.getTelefone(),
                    f.getCargo(),
                    f.getDepartamento(),
                    f.getSalario(),
                    f.getCidade(),
                    f.getStatus()
                );
            }
        }

        return new FuncionarioResponseDTO();
    }

    public boolean remove(long id) {
        return listaFuncionarios.removeIf(funcionario -> funcionario.getId() == id);
    }
}
