import 'reset.css'
import '../sass/style.sass'
import '../sass/includes/header.sass'
import '../sass/includes/aisde.sass'
import '../sass/pages/task.sass'
import './includes/aside'

let
    D = document,
    answers = D.querySelectorAll('.task__answer'),
    decisions = D.querySelectorAll('.task__decision')

window.onload = () => {
    let
        tasks = D.querySelectorAll('.task'),
        quantity: number = D.querySelectorAll('.task').length - 1

    for (let i: number = 0; i <= quantity; i++) {
        let bool: string = String(localStorage.getItem(`task_${i + 1}`));
        (bool == 'true') ? tasks[i].style.color = '#329A36': false;
        (bool == 'false') ? tasks[i].style.color = '#CD5035': false;
        (bool == 'null') ? tasks[i].style.color = '#333': false
    }
}

let answersObject = {
    '1': 10,
    '2': 5
}

answers.forEach(answer => {
    answer.addEventListener('click', () => {
        let
            ans: string = prompt('Введите ответ - одно число'),
            id: string = answer.parentElement.parentElement.id.split('_')[1],
            bool: boolean = false

        if (ans == answersObject[id]) {
            answer.parentElement.previousElementSibling.style.color = '#329A36'
            bool = true
        }
        else answer.parentElement.previousElementSibling.style.color = '#CD5035'

        localStorage.setItem(`task_${id}`, String(bool))
    })
})

decisions.forEach(decision => {
    decision.addEventListener('click', () => {
        let id: string = decision.parentElement.parentElement.id.split('_')[1]
        alert(answersObject[id])
    })
})