import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import Documento from "../components/Documento"
import dados from '../dados/documentos.json'
import Header from '../components/Header'
import TextoBase from '../components/TextoBase'
import Botao from '../components/Botao'

export default function Dados() {
  const [estado, setEstado] = useState(dados)
  const {state} = useLocation();
  const { usuario } = state;
  const navigate = useNavigate();

  const validaDocumentos = () => {
    console.log(estado);
    let todosPreenchidos = 0;

    estado.forEach(function(d) { 
      if(d.valor)
      {
        todosPreenchidos++;
      }
      else
      {
        document.querySelector('[name="' + d.nome + '"]').style.border = '1px solid red';
      }
    });

    let mail = usuario;

    if(todosPreenchidos >= estado.length)
    {
      navigate("/anexos", { state: { usuario: mail, documentos: estado } });
    }
  }

  const mudaTexto = (obj) => {
    let novoEstado = estado.map(e => {
      if(e.nome === obj.target.name)
      {
        e.valor = obj.target.value;
        return e;
      }
      else
      {
        return e;
      }
    });

    setEstado(novoEstado);
}

  useEffect(() => {
    estado.map(e => {
      if(e.valor)
      {
        document.querySelector('[name="' + e.nome + '"]').style.border = '1px solid black';
      }
      return e;
    });
  });

  
  return (
    <div>
      <Header stage={2} user={usuario}/>
      <TextoBase texto={"Insira as informações conforme solicitadas:"} />

      <section className="documentos">
        {estado.map((d, index) => (
          <Documento key={index} documento={d} funcao={mudaTexto}/>
        ))}
      </section>

      <Botao funcao={validaDocumentos}/>
    </div>
  )
}
