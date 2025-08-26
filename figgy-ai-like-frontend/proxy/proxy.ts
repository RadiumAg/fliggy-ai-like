import puppeteer from 'puppeteer-core';

async function runProxy() {
  // 指定已安装的 Chrome/Chromium 的可执行文件路径
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // 例如: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' (macOS)
    headless: false, // 或 false 以有头模式运行
    defaultViewport: null,
    args: [`--user-data-dir=C:/Users/20438/AppData/Local/Google/Chrome/User Data`],
  });

  const page = await browser.newPage();
  await page.goto(
    'https://market.m.taobao.com/app/trip/rx-trip-ai/pages/home?spm=defwork.home.0.0.45fd5c4bI5cl0F&_projVer=1.7.2',
  );
  return page;
}

export { runProxy };
