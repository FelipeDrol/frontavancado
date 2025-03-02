import Documento from "../components/Documento"
import imagem from '../assets/anexo.png'

export default function Anexo(props) {
    const anexo = props.anexo

    const clicaAnexo = (htmlID) => {
        document.getElementById(htmlID).click();
    }

    const showAnexo = (event) => {
        if(event.target.value)
        {
            document.getElementById(event.target.getAttribute("idref")).style.display = 'block';

            let estado = props.state;

            let indice = estado.findIndex(x => x.nome === event.target.name);
            let item = estado[indice];
            item.valorEscolha = event.target.value;
            estado[estado.findIndex(x => x.nome === event.target.name)] = item;
        }
        else
        {
            document.getElementById(event.target.getAttribute("idref")).style.display = 'none';
        }
    }

    let htmlID = anexo.nome.split(" ").join("") + anexo.id;
    let btnID = htmlID+"btn";
  
    return (
        <div className="anexo">
            {
                anexo.tipo === "Escolha" ?
                <Documento documento={anexo} state={props.state} funcao={showAnexo} idref={btnID} /> :
                <label>{anexo.nome}:</label>
            }
            <div className={anexo.tipo === "Escolha" ? "btn btnhide" : "btn"} id={btnID} onClick={() => clicaAnexo(htmlID)}>
                <img src={imagem} alt="Clique aqui para enviar o arquivo" />
                <p><span className="spanAzul">Clique aqui</span><span className="spanNormal"> para enviar o arquivo</span></p>
            </div>
            <input type="file" id={htmlID} className="inputAnexo anexoValor" name={anexo.nome} onChange={e => props.funcao(e, htmlID)}></input>
        </div>
    );
}