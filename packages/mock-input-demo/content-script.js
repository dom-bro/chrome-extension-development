const { Random } = Mock

window.addEventListener('keypress', e => {
  const { target } = e
  if (['INPUT', 'TEXTAREA'].includes(target.tagName)) {
    let insert
    let num
    if (e.code.startsWith('Digit')) {
      num = parseInt(e.code.replace('Digit', ''))
    }
    if (e.ctrlKey) {
      if (num != null) {
        insert = Random.ctitle(num)
      }
    } else if (e.altKey) {
      if (num > 0) {
        insert = Random.natural(Math.pow(10, num - 1), Math.pow(10, num) - 1)
      }
    }

    if (insert) {
      e.preventDefault()

      const before = target.value.substr(0, target.selectionStart)
      const after = target.value.substr(target.selectionEnd)
      target.value = before + insert + after
      const cursorPosition = (before + insert).length
      target.setSelectionRange(cursorPosition, cursorPosition)

      target.dispatchEvent(new InputEvent('input'))
    }
  }
})
