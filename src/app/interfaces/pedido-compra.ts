import { Fornecedor } from './fornecedor';
import { Usuario } from './usuario';

export interface PedidoCompra {
    idEmpresa: number;
    idPedidoCompra: number;
    idUsuario: number;
    idFornecedor: number;
    idAprovador: number;
    idCancelamento: number;
    dataPedido: string;
    dataPrevisaoEntrega: string;
    dataAprovacao: string;
    dataCancelamento: string;
    dataRecebimento: string;
    statusPedido: string;
    observacao: string;
    fornecedor: Fornecedor;
    usuario: Usuario;
    aprovador: Usuario,
    cancelamento: Usuario;
}
