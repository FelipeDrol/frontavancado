import { useState } from "react"
import { useNavigate } from "react-router-dom";
import dados from '../dados/login.json'
import Header from '../components/Header'
import TextoBase from '../components/TextoBase'
import TextoAlerta from '../components/textoAlerta'
import Botao from '../components/Botao'
import InputText from '../components/inputText'

export default function Login() {
  const [estado] = useState(dados)
  const navigate = useNavigate();

  const validaLogin = () => {
    document.getElementById("login").style.border = '1px solid black';

    let re = /\S+@\S+\.\S+/;
    let mail = estado.value;
    if(re.test(mail))
    {
      navigate("/dados", { state: { usuario: mail } });
    }
    else{
      document.getElementById("login").style.border = '1px solid red';
    }
  }

  const mudaLogin = (value) => {
    estado.value = value;
  }

  return (
    <div>
      <Header stage={1}/>
      <TextoBase texto={"Esse é o nosso portal MVP. Aqui você irá inserir as informações e documentos necessários para o andamento e a conclusão do seu processo"} />
      <section>
        <InputText id={"login"} placeholder={"email@dominio.com"} funcao={e => mudaLogin(e.target.value)} classe={""} nome={""} />
        <Botao funcao={validaLogin}/>
        <TextoAlerta texto={"Seguimos a regulamentação da LGPD, portanto seus dados estão protegidos, seguros e só serão utilizados para a finalidade destinada."} />
      </section>
    </div>
  )
}

