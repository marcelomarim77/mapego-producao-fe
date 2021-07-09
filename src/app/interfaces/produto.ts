import { TipoProduto } from './tipo-produto';
import { UnidadeMedida } from './unidade-medida';
export interface Produto {
    idEmpresa: number;
    idProduto: number;
    codigo: string;
    descricao: string;
    idTipoProduto: number;
    idUnidadeMedida: number;
	estoqueMinimo: number;
	controlaEstoque: boolean;
	custoProduto: number;
	precoVenda: number;
	margem: number;
    tipoProduto: TipoProduto;
    unidadeMedida: UnidadeMedida;
}
