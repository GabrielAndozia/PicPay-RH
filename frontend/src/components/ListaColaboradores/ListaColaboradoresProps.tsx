import type { Colaborador } from "./script"

export interface ListaColaboradoresProps {
	colaboradores?: Colaborador[]
	carregando?: boolean
	erro?: string | null
	onEditar?: (colaborador: Colaborador) => void
	onExcluir?: (colaborador: Colaborador) => Promise<void> | void
}