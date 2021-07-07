import { NavItem } from './nav-item';

export let menu: NavItem[] = [
    {
        displayName: 'Cadastros',
        iconName: 'import_contacts',
        route: 'cadastros',
        children: [
            {
                displayName: 'Clientes',
                iconName: 'account_box',
                route: 'cadastros/clientes'
            },
            {
                displayName: 'Fornecedores',
                iconName: 'groups',
                route: 'cadastros/fornecedores'
            },
            {
                displayName: 'Unidades de Medida',
                iconName: 'local_drink',
                route: 'cadastros/unidades'
            },
            {
                displayName: 'Produtos',
                iconName: 'category',
                route: 'cadastros/produtos'
            },
            {
                displayName: 'Transportadoras',
                iconName: 'local_shipping',
                route: 'cadastros/transportadoras'
            },
        ]
    },
    {
        displayName: 'Compras',
        iconName: 'shopping_cart',
        route: 'compras'
    },
    {
        displayName: 'Vendas',
        iconName: 'paid',
        route: 'vendas'
    },
    {
        displayName: 'Estoque',
        iconName: 'format_list_numbered',
        route: 'estoque'
    },
    {
        displayName: 'Financeiro',
        iconName: 'account_balance',
        route: 'financeiro'
    },
    {
        displayName: 'Configurações',
        iconName: 'settings',
        route: 'configuracoes'
    },
];
