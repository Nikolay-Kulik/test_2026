let word = document.querySelector('.word')
let play = document.querySelector('button')
let mobileInput = document.querySelector('input')
let container = document.querySelector('.container')
let string =
	`Он видит: Терек своенравный
Крутые роет берега;
Пред ним парит орел державный,
Стоит олень, склонив рога;
Верблюд лежит в тени утеса,
В лугах несется конь черкеса,
И вкруг кочующих шатров
Пасутся овцы калмыков,
Вдали — кавказские громады:
К ним путь открыт. Пробилась брань
За их естественную грань,
Чрез их опасные преграды;
Брега Арагвы и Куры
Узрели русские шатры.
`
let string2 =
	`Когда Андрей увидел старое раскидистое дерево, он почувствовал, что ему нужно постоять рядом, побыть наедине с дубом. Князь распорядился, чтобы карету остановили. Выйдя из неё, он попросил кучера распрячь лошадь, чтобы она могла набраться сил для дальнейшей дороги. Необходимость в уединении нужна была не для того, чтобы полюбоваться на дерево: Андрей хотел разобраться в себе и своих мыслях, понять, чего ему хочется и как жить дальше.`

let text
let spans = ''
let div = document.createElement('div')
container.prepend(div)
let p = document.createElement('p')
container.append(p)
let letters = []

let soundCorrect = document.querySelector('#correct')
let soundWrong = document.querySelector('#wrong')
let soundWaiting = document.querySelector('#waiting')
let soundFanfary = document.querySelector('#fanfary')

play.addEventListener('click', function () {
	mobileInput.focus()
	soundFanfary.pause()
	soundFanfary.currentTime = 0
	soundWaiting.pause()
	soundWaiting.currentTime = 0
	soundWaiting.play()
	soundWaiting.style.opacity = 0.5
	text = choiceWord()
	word.textContent = ''
	for (const element of text) {
		let span = document.createElement('span')
		word.append(span)
		// word.textContent = text

	}
	spans = document.querySelectorAll('span')
	div.innerHTML = ''
	p.innerHTML = ''
	letters = []
	console.log(text);

})

document.addEventListener('keydown', showLetter)
mobileInput.addEventListener('input', function (e) {

	let letter = e.target.value.slice(-1)

	if (!letter) return

	showLetter({
		key: letter
	})

	e.target.value = ''
})

function createArray(str) {

	let arr = str.split(' ')
	const punctuation = ['.', ',', ':', ';', '—', '\n'];
	const cleaned = [];

	for (let item of arr) {

		item = item.split('\n').join(' ')
		for (const element of punctuation) {
			item = item.split(element).join('')
		}
		let words = item.split(' ')
		for (const word of words) {
			if (word.trim().length > 2) {
				cleaned.push(word);
			}
		}
	}

	return cleaned
}
function choiceWord() {
	let array = createArray(string)
	let random = Math.floor(Math.random() * array.length)
	return array[random].toLowerCase()
}


function showLetter(e) {
	let array = []



	// console.log(e.key.toLowerCase());



	for (let i = 0; i < text.length; i++) {

		if (text[i] == e.key.toLowerCase()) {

			array.push(i)
		}
	}


	// console.log(array);
	if (text.toLowerCase().includes(e.key.toLowerCase())) {
		soundCorrect.pause()
		soundCorrect.currentTime = 0
		soundCorrect.play()
		for (const i of array) {
			spans[i].innerHTML = e.key.toUpperCase()
			spans[i].classList.add('yes')
		}
		if ([...spans].every(span => span.textContent != '')) {

			soundFanfary.play();
			soundWaiting.pause();
			[...spans].forEach((span, index) => {
				setTimeout(() => {
					span.classList.add('win')
				}, 500 * index);
			})
			setTimeout(() => {
				// [...spans].forEach(span => span.remove())
				alert('Ты отгадал слово!')
			}, text.length * 500 + 500);
		}

	} else {

		if (text.length <= 5 && (text.length - letters.length + 3 < 1)) {
			div.innerHTML = ''
			p.innerHTML = ''
			letters = []
			return alert(`Ты проиграл! было загадано слово: ${text.toUpperCase()}`)
		}
		if (text.length > 5 && (text.length - letters.length + 1 < 1)) {
			div.innerHTML = ''
			p.innerHTML = ''
			letters = []
			return alert(`Ты проиграл! было загадано слово: ${text.toUpperCase()}`)
		}
		if (e.key.length == 1 && !letters.includes(e.key.toLowerCase())) {
			letters.push(e.key);
			div.innerHTML = letters.length == 1
				? "Буква отсутствует: " + letters.toString().toUpperCase()
				: "Буквы отсутствуют: " + letters.join(', ').toUpperCase();

			let remaining = text.length <= 5
				? text.length - letters.length + 3
				: text.length - letters.length + 1;

			p.innerHTML = "Осталось: " + remaining + " " + getErrorWord(remaining) + "!";
		}

	}

}
function getErrorWord(n) {
	soundWrong.pause()
	soundWrong.currentTime = 0
	soundWrong.play()
	n = Math.abs(n) % 100;
	let n1 = n % 10;
	if (n > 10 && n < 20) return 'ошибок';
	if (n1 > 1 && n1 < 5) return 'ошибки';
	if (n1 == 1) return 'ошибка';
	return 'ошибок';
}




