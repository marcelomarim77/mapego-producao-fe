export interface Cnpj {
    atividade_principal: [
        text: string,
        code: string
    ],
    data_situacao: string,
    complemento: string,
    tipo: string,
    nome: string,
    uf: string,
    telefone: string,
    email: string,
    qsa:[
        qual: string,
        nome: string
    ],
    situacao: string,
    bairro: string,
    logradouro: string,
    numero: string,
    cep: string,
    municipio: string,
    porte: string,
    abertura: string,
    natureza_juridica: string,
    cnpj: string,
    ultima_atualizacao: string,
    status: string,
    fantasia: string,
    efr: string,
    motivo_situacao: string,
    situacao_especial: string,
    data_situacao_especial: string,
    atividades_secundarias:[
        code: string,
        text: string
    ],
    capital_social: string,
    extra: [],
    billing: [
        free: boolean,
        database: boolean
    ]
}