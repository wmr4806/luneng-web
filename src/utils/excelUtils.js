function dataURLtoBlob(dataUrl) {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const str = atob(arr[1])
  let n = str.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = str.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

function downloadFile(url, name) {
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', name)
  a.setAttribute('target', '_blank')
  const clickEvent = document.createEvent('MouseEvents')
  clickEvent.initEvent('click', true, true)
  a.dispatchEvent(clickEvent)
}

function excelUtil(path, fileName) {
  const myBlob = dataURLtoBlob('data:application/vnd.ms-excel;base64,' + path)
  const myUrl = URL.createObjectURL(myBlob)
  downloadFile(myUrl, fileName)
}

export default excelUtil
