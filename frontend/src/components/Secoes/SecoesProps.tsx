import type { ReactNode } from "react"
import type { SecaoId } from "./script"

type ConteudosSecoes = Partial<Record<SecaoId, ReactNode>>

export interface SecoesProps {
	conteudos?: ConteudosSecoes
}