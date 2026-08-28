import type { DadosCadastroColaborador } from "./script"

export interface FormularioCadastroProps {
	onCadastrar?: (dados: DadosCadastroColaborador) => void
}