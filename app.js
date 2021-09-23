'use strict';

const getBanco = () => JSON.parse (localStorage.getItem ('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem ('todoList', JSON.stringify(banco));


//Cria a tarefa
const criarTask = (tarefa, status, indice) => {
    const task = document.createElement('label');
    task.classList.add('todo__item');
    task.innerHTML = ` 
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="x" data-indice=${indice}>  
    `;
    document.getElementById('todoList').appendChild(task);
}


// Limpa tarefa 
const limparTasks = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}


//Atualiza a tela
const atualizarTela = () => {
    limparTasks();
    const banco = getBanco();
    banco.forEach((task, indice) => criarTask(task.tarefa, task.status, indice));
}


//Adiciona uma nova tarefa
const addTask = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla === 'Enter'){
        const banco = getBanco();
        banco.push({'tarefa':texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}


//Remove a tarefa 
const removerTask = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}


//Atualiza o status da tarefa 
const atualizarTask = (indice) =>{
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : ''; 
    setBanco(banco);
    atualizarTela();
}


//Analisar se o click é para marcar como feito, ou apagar a tarefa 
const clickTask = (evento) => {
    const elemento = evento.target;
    console.log (elemento.type);
    if (elemento.type === 'button'){
        const indice = elemento.dataset.indice;
        removerTask(indice);
    }else if (elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarTask (indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', addTask);
document.getElementById('todoList').addEventListener('click', clickTask)

atualizarTela();

