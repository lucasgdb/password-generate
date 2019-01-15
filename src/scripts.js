const firstCaracter = document.querySelectorAll('#firstCaracter label'),
  secndCaracter = document.querySelectorAll('#secndCaracter label'),
  size = document.querySelector('#length'),
  result = document.querySelector('#result'),
  btnCopy = document.querySelector('#copy'),
  otherChars = document.querySelector('#others'),
  strengthCheck = document.querySelector('#strength'),
  strength = document.querySelector('.strength'),
  equal = document.querySelector('#equal')

for (let i = 0; i < firstCaracter.length; i++) {
  firstCaracter[i].onclick = () => {
    for (let j = 0; j < firstCaracter.length; j++)
      if (firstCaracter[i] !== firstCaracter[j])
        firstCaracter[j].removeAttribute('class')
    else firstCaracter[j].className = 'selected'
  }

  secndCaracter[i].onclick = () => {
    if (secndCaracter[i].className === 'selected')
      secndCaracter[i].removeAttribute('class')
    else secndCaracter[i].className = 'selected'
  }
}

function checkStrength(password = String) {
  let length = 0

  length += Math.min(6, password.length) * 10
  length += Math.min(2, password.length - password.replace(/[A-Z]/g, '').length) * 5
  length += Math.min(2, password.length - password.replace(/[a-z]/g, '').length) * 5
  length += Math.min(2, password.length - password.replace(/[0-9]/g, '').length) * 5
  length += Math.min(2, password.replace(/[a-zA-Z0-9]/g, '').length) * 5

  for (let i = 1; i < password.length; i++)
    if (password[i - 1] === password[i]) {
      length -= 30
      break
    }

  if (length < 50) {
    strength.style.backgroundColor = 'red'
    strength.setAttribute('title', 'Senha INACEITÁVEL')
  } else if (length < 60) {
    strength.style.backgroundColor = 'darkorange'
    strength.setAttribute('title', 'Senha PÉSSIMA')
  } else if (length < 80) {
    strength.style.backgroundColor = 'yellow'
    strength.setAttribute('title', 'Senha RUIM')
  } else if (length < 100) {
    strength.style.backgroundColor = 'lime'
    strength.setAttribute('title', 'Senha BOA')
  } else {
    strength.style.backgroundColor = 'darkgreen'
    strength.setAttribute('title', 'Senha EXCELENTE')
  }
}

function generate() {
  let password = ''

  if (size.value !== '0') {
    const numbers = '0123456789',
      alpha = 'abcdeghijklmnopqrstuvwxyz',
      ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      others = '!@#$%&*()_+-=' + otherChars.value.replace(/[a-zA-Z0-9!@#$%&*()_+-=]/g, ''),
      length = size.value === '' ? 10 : size.value > 2048 ? 2048 : size.value,
      letters = []

    if (size.value > 2048)
      size.value = 2048

    if (firstCaracter[0].className === 'selected')
      password = numbers[parseInt(Math.random() * numbers.length)]
    else if (firstCaracter[1].className === 'selected')
      password = ALPHA[parseInt(Math.random() * ALPHA.length)]
    else if (firstCaracter[2].className === 'selected')
      password = alpha[parseInt(Math.random() * alpha.length)]
    else password = others[parseInt(Math.random() * others.length)]

    if (secndCaracter[0].className === 'selected')
      letters.push(numbers)
    if (secndCaracter[1].className === 'selected')
      letters.push(ALPHA)
    if (secndCaracter[2].className === 'selected')
      letters.push(alpha)
    if (secndCaracter[3].className === 'selected')
      letters.push(others)

    for (let i = 0; i < (letters.length === 0 ? 0 : length - 1); i++) {
      const randomized = letters[parseInt(Math.random() * letters.length)]
      let letter = randomized[parseInt(Math.random() * randomized.length)]

      if (equal.checked)
        while (password[i] === letter)
          letter = randomized[parseInt(Math.random() * randomized.length)]

      password += letter
    }
  }

  checkStrength(password)

  result.value = password
}

function copy() {
  result.select()
  document.execCommand('copy')
}

btnCopy.onclick = copy

otherChars.onkeyup = () => {
  firstCaracter[3].setAttribute('title', '!@#$%&*()_+-=' + otherChars.value.replace(/[a-zA-Z0-9!@#$%&*()_+-=]/g, ''))
  secndCaracter[3].setAttribute('title', '!@#$%&*()_+-=' + otherChars.value.replace(/[a-zA-Z0-9!@#$%&*()_+-=]/g, ''))
}

strengthCheck.onchange = () => {
  if (strengthCheck.checked)
    strength.style.display = 'block'
  else strength.style.display = 'none'
}

document.onkeydown = e => {
  if (e.which === 71) generate()
}

document.oncontextmenu = e => {
  e.preventDefault()
}