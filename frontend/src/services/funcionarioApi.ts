import type { FuncionarioRequestDTO, FuncionarioResponseDTO } from "../models/funcionario"

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080"
const FUNCIONARIOS_ENDPOINT = `${API_BASE_URL}/funcionarios`

async function tratarResposta<T>(response: Response): Promise<T> {
	if (response.ok) {
		if (response.status === 204) {
			return undefined as T
		}

		return (await response.json()) as T
	}

	let mensagemErro = "Erro ao comunicar com o servidor."

	try {
		const corpo = await response.json()
		if (typeof corpo?.message === "string" && corpo.message.trim().length > 0) {
			mensagemErro = corpo.message
		}
	} catch {
		// Resposta sem JSON valido.
	}

	throw new Error(mensagemErro)
}

export async function listarFuncionarios(): Promise<FuncionarioResponseDTO[]> {
	const response = await fetch(FUNCIONARIOS_ENDPOINT, {
		method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
	return tratarResposta<FuncionarioResponseDTO[]>(response)
}

export async function buscarFuncionarioPorId(id: number): Promise<FuncionarioResponseDTO> {
	const response = await fetch(`${FUNCIONARIOS_ENDPOINT}/${id}`, {
		method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
	return tratarResposta<FuncionarioResponseDTO>(response)
}

export async function criarFuncionario(
	payload: FuncionarioRequestDTO,
): Promise<FuncionarioResponseDTO> {
	const response = await fetch(FUNCIONARIOS_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	})

	return tratarResposta<FuncionarioResponseDTO>(response)
}

export async function atualizarFuncionario(
	id: number,
	payload: FuncionarioRequestDTO,
): Promise<FuncionarioResponseDTO> {
	const response = await fetch(`${FUNCIONARIOS_ENDPOINT}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	})

	return tratarResposta<FuncionarioResponseDTO>(response)
}

export async function atualizarFuncionarioParcialmente(
	id: number,
	payload: FuncionarioRequestDTO,
): Promise<FuncionarioResponseDTO> {
	const response = await fetch(`${FUNCIONARIOS_ENDPOINT}/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	})

	return tratarResposta<FuncionarioResponseDTO>(response)
}

export async function excluirFuncionario(id: number): Promise<void> {
	const response = await fetch(`${FUNCIONARIOS_ENDPOINT}/${id}`, {
		method: "DELETE",
	})

	await tratarResposta<void>(response)
}
