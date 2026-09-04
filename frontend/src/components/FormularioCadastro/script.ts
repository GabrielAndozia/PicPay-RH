import type { FuncionarioRequestDTO } from "../../models/funcionario"

export type DadosCadastroColaborador = FuncionarioRequestDTO

export const dadosCadastroIniciais: DadosCadastroColaborador = {
	nome: "",
	email: "",
	telefone: "",
	cargo: "",
	departamento: "",
	salario: 0,
	cidade: "",
	status: "Ativo",
}