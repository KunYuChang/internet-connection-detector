const image = document.getElementById('image')
const statusDisplay = document.getElementById('status')
const bgColor = document.getElementById('main')

async function connectionStatus() {
  try {
    // 測試有沒有連線的方式:fetch抓取當前時間的圖片
    const fetchResult = await fetch(
      'https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Lenna_%28test_image%29.png/440px-Lenna_%28test_image%29.png?time=' +
        new Date().getTime()
    )
    image.src = './images/online.png'
    bgColor.classList.add('online')
    return fetchResult.status >= 200 && fetchResult.status < 300
  } catch (error) {
    console.error(error)
    statusDisplay.textContent = 'OOPS!!! Your Internet Connection is Down.'
    image.src = './images/offline.png'
    bgColor.classList.remove('online')
  }
}

// Monitor the connection
setInterval(async () => {
  const result = await connectionStatus()
  if (result) {
    statusDisplay.textContent = "You're ONLINE!!! Connection looks good."
    bgColor.classList.add('online')
  }
}, 1000)

//   Check Connection When Page Loads
window.addEventListener('load', async (event) => {
  const isOnline = connectionStatus() ? 'Online' : 'OFFline'
  statusDisplay.textContent = isOnline
})
