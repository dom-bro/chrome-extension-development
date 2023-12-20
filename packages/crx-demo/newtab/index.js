// async function loadPdf(path) {
//   return new Promise((resolve, reject) => {
//     const request = new XMLHttpRequest()
//     request.open("GET", path, true)
//     request.responseType = "blob"

//     request.onload = async () => {
//       console.log(await request.response.text())
//     }

//     request.send()
//   })
// }
// loadPdf('chrome://theme/colors.css?sets=ui,chrome')