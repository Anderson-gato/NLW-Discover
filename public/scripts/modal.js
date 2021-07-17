export default function Modal() {

    const modalWrapper = document.querySelector('.modal-wrapper');
    const cancelButton = document.querySelector('.button.cancel');

    cancelButton.addEventListener("click", close);

    function open() {
        // funcionalidade de colocar a activer dentro da modal
        modalWrapper.classList.add("active");
    };
    function close() {
        // funcionalidade de tirar a activer dentro da modal
        modalWrapper.classList.remove("active");
    };

    return{
        open,
        close,
    };

};