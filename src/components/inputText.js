export default function InputText(dados) {

  return (
    <input id={dados.id} placeholder={dados.placeholder} onChange={dados.funcao} className={dados.classe} name={dados.nome} type="text" />
  )
}

