import { Pencil, Trash2 } from "lucide-react"
import "./style.css"
import type { ItemColaboradorProps } from "./ItemColaboradorProps"

function ItemColaborador({ colaborador, onEditar, onExcluir }: ItemColaboradorProps) {
	return (
		<li className="item-colaborador">
			<div className="item-colaborador-dados">
				<p className="item-colaborador-id">ID #{colaborador.id}</p>
				<p className="item-colaborador-nome">{colaborador.nome}</p>
				<p className="item-colaborador-detalhes">
					{colaborador.cargo} <span aria-hidden="true">|</span> {colaborador.email}
				</p>
				<p className="item-colaborador-detalhes">
					{colaborador.departamento} <span aria-hidden="true">|</span> {colaborador.cidade}
				</p>
				<p className="item-colaborador-detalhes">
					{colaborador.telefone} <span aria-hidden="true">|</span> {colaborador.status}
				</p>
			</div>

			<div className="item-colaborador-acoes">
				<button
					className="item-colaborador-editar"
					type="button"
					onClick={() => onEditar?.(colaborador)}
				>
					<Pencil aria-hidden="true" size={16} strokeWidth={2.2} />
					Editar
				</button>
				<button
					className="item-colaborador-excluir"
					type="button"
					onClick={() => onExcluir(colaborador)}
					aria-label={`Excluir ${colaborador.nome}`}
					title={`Excluir ${colaborador.nome}`}
				>
					<Trash2 aria-hidden="true" size={18} strokeWidth={2.2} />
					Excluir
				</button>
			</div>
		</li>
	)
}

export default ItemColaborador