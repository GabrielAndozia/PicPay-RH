import type { Colaborador } from "../ListaColaboradores/script"

export interface ItemColaboradorProps {
	colaborador: Colaborador
	onEditar?: (colaborador: Colaborador) => void
	onExcluir: (colaborador: Colaborador) => void
}