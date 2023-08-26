import * as jwt from 'jsonwebtoken';

// Simulação de um banco de dados de usuários
const usersDB: { [key: string]: string } = {
    'usuario1': 'senha123',
    'usuario2': 'senha456',
    'usuario3': 'senha457'
};

// Simulação de um banco de dados de tokens
const tokensDB: { [key: string]: string } = {};

// Chave secreta para assinar e verificar o token
const secretKey = 'alessandro';

// Função para validar o usuário e senha
function validarCredenciais(usuario: string, senha: string): boolean {
    const storedPassword = usersDB[usuario];
    return storedPassword === senha;
}

// Função para gerar um token JWT
function gerarToken(usuario: string): string {
    const payload = { userId: usuario };
    const options = { expiresIn: '1h' }; // Token expira em 1 hora
    return jwt.sign(payload, secretKey, options);
}

// Função para validar o token
function validarToken(token: string): boolean {
    try {
        jwt.verify(token, secretKey);
        return true;
    } catch (error) {
        return false;
    }
}

// Simulação de usuário e senha
const usuarioInformado = 'usuario1';
const senhaInformada = 'senha123';

// Verificação das credenciais
if (validarCredenciais(usuarioInformado, senhaInformada)) {
    const token = gerarToken(usuarioInformado);
    tokensDB[usuarioInformado] = token; // Armazenando o token na simulação do banco de dados
    console.log('Login bem-sucedido! Token gerado:', token);

    // Simulando uma nova requisição usando o token gerado
    const tokenDaRequisicao = tokensDB[usuarioInformado];
    if (validarToken(tokenDaRequisicao)) {
        console.log('Token válido! Acesso permitido.');
    } else {
        console.log('Token inválido! Acesso negado.');
    }
} else {
    console.log('Credenciais inválidas. Acesso negado.');
}
