# teste-tivit-react
Teste em React para Tivit

Teste Tivit App
Este projeto é uma aplicação React simples que implementa autenticação de usuários e administradores com base em um token JWT. A aplicação verifica o status de saúde de um serviço, permite o login e o acesso a páginas protegidas com base no papel do usuário.

Tecnologias Utilizadas
Frontend: React, React Router, Axios
Estilização: Tailwind CSS
Autenticação: JWT (JSON Web Token)
Funcionalidades
Login de Usuário: A aplicação permite que um usuário se autentique usando um nome de usuário e senha.

- Usuer: user | senha: L0XuwPOdS5U
- Admin: admin | senha: JKSipm0YH

Páginas Protegidas: Existem rotas protegidas que requerem um token JWT válido para acesso. As rotas incluem páginas específicas para usuários e administradores.
Verificação de Saúde do Serviço: A aplicação verifica o status de saúde de um serviço e exibe uma mensagem sobre sua disponibilidade.
Redirecionamento: O acesso a rotas protegidas é controlado com base no papel (usuário ou administrador), e usuários não autorizados são redirecionados para uma página de erro.

Como Configurar e Executar
1. Clonando o Repositório
Clone o repositório para sua máquina local:

git clone https://github.com/seu-usuario/react-authentication-app.git
cd teste-tivit-app

2. Instalando Dependências
Na pasta do projeto, instale as dependências do projeto:

npm install

3. Iniciando o Projeto
Após a instalação das dependências, inicie o servidor de desenvolvimento com o comando:

npm start
A aplicação estará disponível em http://localhost:3000.

Estrutura do Código
1. Login
A funcionalidade de login é implementada no componente Login. O usuário insere o nome de usuário e a senha, que são enviados para uma API que retorna um token JWT.

Requisição de Login: O método handleLogin envia uma requisição POST para obter um token, e o armazena no estado do componente com a função setToken.
2. Rotas Protegidas
O componente ProtectedRoute é utilizado para proteger rotas como /user e /admin. Somente usuários com um token válido e um papel específico (usuário ou administrador) podem acessar essas páginas.

Verificação de Token: Se o usuário não estiver autenticado ou não tiver o papel correto, será redirecionado para a página de login ou de erro.
3. Páginas
HomePage: A página inicial verifica a saúde do serviço e exibe o status.
UserPage: Exibe dados do usuário autenticado.
AdminPage: Exibe dados do administrador autenticado.
UnauthorizedPage: Exibe uma mensagem de erro para usuários que tentam acessar uma página sem permissão.

4. Funcionalidades de Requisição
fetchHealth: Verifica a saúde do serviço (usado na página inicial).
fetchUserData: Obtém dados do usuário autenticado.
fetchAdminData: Obtém dados do administrador autenticado.

5. Navegação
O componente Router é usado para configurar as rotas da aplicação.
O Link permite navegação entre as páginas, e o Navigate é utilizado para redirecionar o usuário com base na autenticação.

6. Decodificação de Token
O token JWT é decodificado para determinar o papel do usuário. O papel é armazenado no estado e utilizado para gerenciar o acesso às rotas protegidas.

7. Logout
O usuário pode fazer logout, o que limpa o token e o papel do estado, redirecionando para a página de login.

Serviços fakes utilizados conforme solicitado: 

https://api-onecloud.multicloud.tivit.com/fake/health
https://api-onecloud.multicloud.tivit.com/fake/admin
https://api-onecloud.multicloud.tivit.com/fake/user
https://api-onecloud.multicloud.tivit.com/fake/token


