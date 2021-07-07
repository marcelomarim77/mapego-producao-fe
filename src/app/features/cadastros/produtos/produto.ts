export interface Produto {
    idEmpresa: number;
    idProduto: number;
    codigo: string;
    descricao: string;
	idTipoProduto: number;
    descricaoTipoProduto: string;
	idUnidadeMedida: number;
    descricaoUnidadeMedida: string;
	estoqueMinimo: number;
	controlaEstoque: boolean;
	custoProduto: number;
	precoVenda: number;
	margem: number;
}
