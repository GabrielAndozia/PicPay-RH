import type { Colaborador } from "../ListaColaboradores/script"
import "./style.css"

type ConfirmacaoExclusaoProps = {
	colaborador: Colaborador | null
	onConfirmar: () => void
	onCancelar: () => void
}

function ConfirmacaoExclusao({
	colaborador,
	onConfirmar,
	onCancelar,
}: ConfirmacaoExclusaoProps) {
	if (!colaborador) {
		return null
	}

	return (
		<div
			className="confirmacao-exclusao"
			role="dialog"
			aria-modal="true"
			aria-labelledby="titulo-confirmacao-exclusao"
		>
			<div className="confirmacao-exclusao-card">
				<h3 id="titulo-confirmacao-exclusao">Excluir colaborador</h3>
				<p>
					Deseja realmente excluir o colaborador <strong>{colaborador.nome}</strong>?
				</p>
				<div className="confirmacao-exclusao-acoes">
					<button
						type="button"
						className="confirmacao-exclusao-cancelar"
						onClick={onCancelar}
					>
						Cancelar
					</button>
					<button
						type="button"
						className="confirmacao-exclusao-confirmar"
						onClick={onConfirmar}
					>
						Excluir
					</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmacaoExclusao
