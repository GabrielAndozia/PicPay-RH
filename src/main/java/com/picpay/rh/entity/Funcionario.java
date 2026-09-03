package com.picpay.rh.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Funcionario implements Serializable {

    private Long id;

    private String nome;

    private String email;

    private String telefone;

    private String cargo;

    private String departamento;

    private double salario;

    private String cidade;

    private String status;
    
}