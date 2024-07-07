import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import dados from '../dados/anexos.json'

import Header from '../components/Header'
import TextoBase from '../components/TextoBase'
import Botao from '../components/Botao'
import Anexo from "../components/Anexo"

export default function Anexos() {
  const [estado, setEstado] = useState(dados)
  const {state} = useLocation();
  const navigate = useNavigate();

  const validaAnexos = () => {
    let todosPreenchidos = 0;

    estado.forEach(function(d) { 
      if(d.valor)
        {
          todosPreenchidos++;
        }
        else
        {
          document.querySelector('input[name="' + d.nome + '"]').parentNode.getElementsByClassName("btn")[0].style.border = '1px dashed red';
        }
    });

    if(todosPreenchidos >= estado.length)
    {
      navigate("/final", { state: { usuario: state.usuario, documentos: state.documentos, anexos: estado} });
    }
  }

  const readFile = (event, nome, nomeArquivo) => {
    let novoEstado = estado.map(e => {
      if(e.nome === nome)
      {
        e.valor = nomeArquivo;
        e.blob = event.target.result;
        return e;
      }
      else
      {
        return e;
      }
    });

    setEstado(novoEstado);
  }

  const mudaAnexo = (event, htmlID) => {
    if(event.target.files.length > 0)
    {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.addEventListener('load', (e => readFile(e, event.target.name, file.name)));
      reader.readAsText(file);

      document.getElementById(htmlID).parentNode.getElementsByClassName("spanNormal")[0].innerHTML = " para modificar o arquivo " + file.name;
    }
  }

  useEffect(() => {
    estado.map(e => {
      if(e.valor)
      {
        document.querySelector('input[name="' + e.nome + '"]').parentNode.getElementsByClassName("btn")[0].style.border = '1px dashed black';
      }

      return e;
    });
  });

  return (
    <div>
      <Header stage={3} user={state.usuario}/>

      <TextoBase texto={"Insira as informações conforme solicitadas:"} />

      <section className="anexos">
        {estado.map((a, index) => (
          <Anexo key={index} anexo={a} state={estado} funcao={mudaAnexo}/>
        ))}
      </section>

      <Botao funcao={validaAnexos}/>
    </div>
  )
}
