import type { Colaborador } from "./script"

export interface ListaColaboradoresProps {
	colaboradores?: Colaborador[]
	onEditar?: (colaborador: Colaborador) => void
	onExcluir?: (colaborador: Colaborador) => void
}