import Modal from './modal.js';

const modal = Modal();

const modalTitle = document.querySelector('.modal h2');
const modalDescription = document.querySelector('.modal p');
const modalButton = document.querySelector('.modal button');


//pegar todos os botões que tem a classe check
const checkButtons = document.querySelectorAll(".actions a.check");

checkButtons.forEach(button => {
    button.addEventListener("click", handleClick);
});

//quando o botão delete for clicado ele abre a modal 
const deleteButtons = document.querySelectorAll(".actions a.delete");

deleteButtons.forEach(button => {
     button.addEventListener("click", (event) => handleClick(event, false));
});

function handleClick(event, check = true) {
    // para falar que os links não vão se comportar como links
    event.preventDefault();
    const slug = check ? "check" : "delete";
    const roomId = document.querySelector("#room-id").dataset.id;
    const questionId = event.target.dataset.id;


    const form = document.querySelector(".modal form");
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`);

    // mudar o titulo da modal quando clicar em algum botão
    modalTitle.innerHTML = check ? "Marcar como lida está pergunta" : "Excluir esta pergunta"
    modalDescription.innerHTML = check ? "Tem certeza que deseja marcar como lida esta pergunta?" : "Tem certeza que deseja excluir esta pergunta?"
    modalButton.innerHTML = check ? "Marcar como lida" : "Sim, Excluir"
    check ? modalButton.classList.remove("red") : modalButton.classList.add("red"); 
    // abrir modal
    modal.open();
}