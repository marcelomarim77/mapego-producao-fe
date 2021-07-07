import { UnidadeMedida } from './unidade-medida';
import { TipoProduto } from './tipo-produto';
export interface Produto {
    idEmpresa: number;
    idProduto: number;
    codigo: string;
    descricao: string;
	estoqueMinimo: number;
	controlaEstoque: boolean;
	custoProduto: number;
	precoVenda: number;
	margem: number;
    tipoProduto: TipoProduto;
    unidadeMedida: UnidadeMedida;
}
