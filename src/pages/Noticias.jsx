import React from "react";
import {useState} from "react";



function Contador(){
    const [numero,setNumero] = useState(0);

    return(
        <div>
            <p>Voce clicou {numero} vezes</p>
            <button onClick={()=>setNumero(numero+1)}>
                clique aqui
            </button>
        </div>
    )
}

function MeuNome(){
    const [nome,setNome] = useState('');

    return(
        <div>
            <p>escreva seu nome</p>
            <input 
            type="text"
            value={nome}
            onChange={(e)=> setNome(e.target.value)}
            placeholder="escreva aqui seu nome"
            />
            <h1>seu nome é {nome}</h1>
        </div>
    )
}


function AddLista(){
    const [entry,setEntry] = useState('')
    const [lista,setLista] = useState([])
    
    function adicionarTarefa(){
        setLista([...lista,entry])
        setEntry('')
    }

    return(
        <div>
            <input 
            type="text"
            value={entry}
            onChange={(e)=> setEntry(e.target.value)}/>
            <button onClick={adicionarTarefa}>Adicionar</button>
            <ul>
                {
                    lista.map((item, index)=>{
                        return <li key={index}>{item}</li>
                    })
                }
            </ul>
        </div>

    )

}

function ContaAqui(){
    const [contador, setContador] = useState(0)
    function Soma(){
        setContador(contador+1)
    }
    function Subta(){
        setContador(contador-1)
    }
    
    return(
        <div>
            <p>
                {contador}
            </p>
            <div>
                <button onClick={Soma}>mais</button>
                <button onClick={Subta}>menos</button>
            </div>

        </div>
    )
}




function Noticias() {
 
  return (
    <>
      <h1>Noticias</h1>
      <Contador />
    </>
  );
}

export default Noticias;