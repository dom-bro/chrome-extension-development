import { Random } from 'mockjs'

let contextmenuTarget: EventTarget | null = null
function setTargetValue(tar: HTMLInputElement, newVal: string | number, isInsert?: boolean) {
  const isFocused = document.activeElement === tar
  console.log('setTargetValueeeee', tar.type, newVal, isFocused)
  tar.focus()
  const lastValue = tar.value

  if (isInsert) {
    const before = tar.value.substring(0, tar.selectionStart || 0)
    const after = tar.value.substring(tar.selectionEnd || 0)
    tar.value = before + newVal + after
    const cursorPosition = (before + newVal).length
    tar.setSelectionRange(cursorPosition, cursorPosition)
  } else {
    tar.value = newVal.toString()
  }

  const evt = new Event('input', { bubbles: true })
  // @ts-expect-error React 15
  evt.simulated = true
  // @ts-expect-error React 16
  tar._valueTracker?.setValue(lastValue)
  tar.dispatchEvent(evt)
  // if (!isFocused) tar.blur()
}

function generateRandomChinesePhoneNumber() {
  let phoneNumber = ''
  const prefixList = [
    '130',
    '131',
    '132',
    '133',
    '134',
    '135',
    '136',
    '137',
    '138',
    '139',
    '150',
    '151',
    '152',
    '153',
    '155',
    '156',
    '157',
    '158',
    '159',
    '166',
    '170',
    '171',
    '172',
    '173',
    '174',
    '175',
    '176',
    '177',
    '178',
    '180',
    '181',
    '182',
    '183',
    '184',
    '185',
    '186',
    '187',
    '188',
    '189',
    '198',
    '199',
  ]
  const prefix = prefixList[Math.floor(Math.random() * prefixList.length)]
  let suffix = ''
  for (var i = 0; i < 8; i++) {
    suffix += Math.floor(Math.random() * 10)
  }
  phoneNumber = prefix + suffix
  return phoneNumber
}
function generateRandomPassword(length = 8) {
  const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charSet.length)
    password += charSet[randomIndex]
  }
  return password
}

window.addEventListener('keypress', (ev: KeyboardEvent) => {
  const target = ev.target as HTMLInputElement
  if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) {
    let insert
    let num
    if (ev.code.startsWith('Digit')) {
      num = parseInt(ev.code.replace('Digit', ''))
    }
    if (ev.ctrlKey) {
      if (num != null) {
        insert = Random.ctitle(num)
        if (num === 0) {
          let titles = `
          `.split('\n')
          titles = titles.map((item) => item.trim()).filter((item) => item)
          insert = titles[Math.floor(Math.random() * titles.length)]
        }
      }
    } else if (ev.altKey) {
      if (num && num > 0) {
        insert = Random.natural(Math.pow(10, num - 1), Math.pow(10, num) - 1)
      }
      if (num === 0) {
        ev.preventDefault()
      }
    }

    if (insert) {
      ev.preventDefault()
      setTargetValue(target, insert, true)
    }
  }
})
window.addEventListener('contextmenu', (ev: MouseEvent) => {
  console.log('contextmenuuuu', ev)
  contextmenuTarget = ev.target
})
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('onMessageeeeee', request, sender, sendResponse, contextmenuTarget)

  const inputs: HTMLInputElement[] = Array.from(document.querySelectorAll('input, textarea'))
  inputs.forEach((v: HTMLInputElement) => {
    if (v.value) return
    switch (v.type) {
      case 'text':
      case 'textarea': {
        setTargetValue(v, Random.ctitle(3))
        break
      }
      case 'email': {
        setTargetValue(v, Random.email())
        break
      }
      case 'password': {
        setTargetValue(v, generateRandomPassword())
        break
      }
      case 'tel': {
        setTargetValue(v, generateRandomChinesePhoneNumber())
        break
      }
    }
  })
})

