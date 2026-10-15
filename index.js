function abrirModal(){
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}
function fecharModal()
    {
        overlay.classList.remove("active");
        criarTarefa.classList.remove("active");
    }
function buscarTarefas(){
    fetch("http://localhost:3000/tarefas")
    .then(res => res.json())
    .then(res =>{
        inserirTarefas(res);
    })
}
buscarTarefas();

function inserirTarefas(listaDetarefas){

    if(listaDetarefas.length> 0){
       document.querySelector(".mensagem").style.display = "none";
        listaDetarefas.map(tarefa =>{
            lista.innerHTML += `
              <li>
                    <h5>${tarefa.titulo}</h5>
                    <p>${tarefa.descricao}</p>
                    <div class="actions"> 
                    <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"  
                        fill="currentColor" onclick="deletarTarefa(${tarefa.id}, this)" viewBox="2 2 20 20" >
                        <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                    </svg>
                    </div>
                </li>
              `  ;
        });
    }
    else{
       document.querySelector(".mensagem").style.display = "block";
    }
}
function novaTarefa(){
    event.preventDefault();
    let tarefa = {
        titulo:titulo.value,
        descricao: descricao.value
    }
  // 1. Esconde a modal imediatamente
    fecharModal();
    let form = document.querySelector("#criarTarefa form");
    form.reset();

    inserirTarefas([tarefa]);

    fetch("http://localhost:3000/tarefas", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(tarefa)
    });
    
}
function deletarTarefa(id, elemento){
  
    let li = elemento.closest("li");
    li.remove();

    let lisRestantes = document.querySelectorAll("#lista li");
    if(lisRestantes.length === 0){
        document.querySelector(".mensagem").style.display = "block"; 
        
    fetch(`http://localhost:3000/tarefas/${id}`,{
        method: "DELETE",
    })
    .then(res => res.json())
    .then(res => {
        buscarTarefas();
    })
    }
}

function pesquisarTarefa()
{
    let lis = document.querySelectorAll("ul li");
    if(busca.value.length> 0){
        lis.forEach(li => {
            if(!li.children[0].innerText.includes(busca.value)){
                li.classList.add('oculto');
            }
            else{
                li.classList.remove('oculto');
            }
        })
    }
        else
        {
            lis.forEach(li => {
                li.classList.remove('oculto');
            })
        }
}
