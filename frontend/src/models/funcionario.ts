export interface FuncionarioRequestDTO {
	nome: string
	email: string
	telefone: string
	cargo: string
	departamento: string
	salario: number
	cidade: string
	status: string
}

export interface FuncionarioResponseDTO extends FuncionarioRequestDTO {
	id: number
}
