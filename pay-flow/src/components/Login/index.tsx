import Input from "../Input";
import { Page } from "./style";

function Login() {
  return (
    <Page theme="dark">
      <div className="login-card">
        <img src="/logo.png" alt="Logo do sistema" className="login-logo" />
        <h1>Entrar</h1>
        <Input label="teste" type="email" />
        <Input label="teste" type="password" />
        <button>Entrar</button>
      </div>
    </Page>
  );
}

export default Login;
