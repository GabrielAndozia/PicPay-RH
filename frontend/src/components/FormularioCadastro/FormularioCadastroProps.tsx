import type { DadosCadastroColaborador } from "./script"

export interface FormularioCadastroProps {
	onCadastrar?: (dados: DadosCadastroColaborador) => Promise<void> | void
	enviando?: boolean
}