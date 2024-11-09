function LoginForm() {
    return (
        <div>
            <form className="formCadastro">
                <h1>Cadastro</h1>

                <div className="formCadastroInputs">
                    <input
                        type="text"
                        placeholder="Nome completo"
                        />
                        <input
                        type="email"
                        placeholder="Email"
                        />
                        <input
                        type="tel"
                        placeholder="Telefone"
                        />
                        <input
                        type="password"
                        placeholder="Senha"
                        />
                </div>
                    
            </form> 
        </div>
    )
}

export default LoginForm