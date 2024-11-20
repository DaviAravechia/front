import React, { useState } from 'react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode integrar com a API de autenticação
        console.log('Email:', email);
        console.log('Senha:', password);
    };

    return (
        <div>
            <form className="formLogin" onSubmit={handleSubmit}>
                <h1>Login</h1>

                <div className="formLoginInputs">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="formLoginButton">
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
