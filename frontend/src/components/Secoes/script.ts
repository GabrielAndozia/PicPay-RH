export const secoes = [
	{
		id: "cadastro",
		titulo: "Cadastrar colaborador",
		descricao: "Registre um novo colaborador no sistema.",
	},
	{
		id: "listagem",
		titulo: "Colaboradores",
		descricao: "Consulte os colaboradores cadastrados e gerencie cada registro.",
	},
] as const

export type SecaoId = (typeof secoes)[number]["id"]

export function obterSecao(secaoId: SecaoId) {
	return secoes.find(({ id }) => id === secaoId)!
}
