import type { DadosCadastroColaborador } from "./script"
import type { Colaborador } from "../ListaColaboradores/script"

export type ModoFormulario = "cadastro" | "edicao"

export interface FormularioCadastroProps {
	modo?: ModoFormulario
	onCadastrar?: (dados: DadosCadastroColaborador) => Promise<void> | void
	onAtualizar?: (id: number, dados: DadosCadastroColaborador) => Promise<void> | void
	onBuscarPorId?: (id: number) => Promise<void> | void
	onCancelarEdicao?: () => void
	colaboradorEmEdicao?: Colaborador | null
	enviando?: boolean
}