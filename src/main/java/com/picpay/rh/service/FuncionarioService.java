package com.picpay.rh.service;

import org.springframework.stereotype.Service;

import com.picpay.rh.repository.FuncionarioRepository;
import com.picpay.rh.entity.Funcionario;

@Service
public class FuncionarioService {

    private final FuncionarioRepository repository;

    public FuncionarioService(FuncionarioRepository repository) {
        this.repository = repository;
    }


    public Funcionario atualizarFuncionario(int id, Funcionario funcionario) {
        
        Funcionario funcionarioExistente = repository.buscarPorId(id);
        
        if (funcionarioExistente == null){
            return null;
        }

        funcionarioExistente.setId(funcionarioExistente.getId());
        
        funcionarioExistente.setNome(funcionarioExistente.getNome());

        funcionarioExistente.setEmail(funcionarioExistente.getEmail());
        
        funcionarioExistente.setTelefone(funcionarioExistente.getTelefone());

        funcionarioExistente.setCargo(funcionarioExistente.getCargo());

        funcionarioExistente.setDepartamento(funcionarioExistente.getDepartamento());

        funcionarioExistente.setSalario(funcionarioExistente.getSalario());

        funcionarioExistente.setStatus(funcionarioExistente.getStatus());


        return funcionarioExistente;
    }


    public Funcionario atualizarFuncionarioParcial(long id, Funcionario funcionario){

        Funcionario funcionarioExistente = repository.buscarPorId(id);

        if (funcionarioExistente == null){
            return null;
        }

        if (funcionarioExistente.getNome() != null) {
            
            funcionarioExistente.setNome(funcionario.getNome());

        }
        
        if (funcionario.getEmail() != null) {
            funcionarioExistente.setEmail(funcionario.getEmail());
        }

        if (funcionario.getTelefone() != null) {
            funcionarioExistente.setTelefone(funcionario.getTelefone());
        }

        if (funcionario.getCargo() != null) {
            funcionarioExistente.setCargo(funcionario.getCargo());
        }

        if (funcionario.getDepartamento() != null) {
            funcionarioExistente.setDepartamento(funcionario.getDepartamento());
        }

        if (funcionario.getSalario() != 0) {
            funcionarioExistente.setSalario(funcionario.getSalario());
        }

        if (funcionario.getCidade() != null) {
            funcionarioExistente.setCidade(funcionario.getCidade());
        }

        if (funcionario.getStatus() != null) {
            funcionarioExistente.setStatus(funcionario.getStatus());
        }

        return funcionarioExistente;
    }

    public boolean deletarFuncionario(long id, Funcionario funcionario){

        Funcionario funcionarioExistente = repository.buscarPorId(id);

        if (funcionario == null){
            return false;
        }

        repository.remove(id);

        return true;

    }

    public List<Funcionario> pesquisar(String nome, String cargo, String status){
        return repository.pesquisar(nome,cargo,status);
    }
}