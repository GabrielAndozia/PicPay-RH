package com.picpay.rh.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class FuncionarioResponseDTO implements Serializable{

    public FuncionarioResponseDTO() {}


    private long id;

    private String nome;

    private String email;

    private String telefone;

    private String cargo;

    private String departamento;

    private double salario;

    private String cidade;

    private String status;

}
