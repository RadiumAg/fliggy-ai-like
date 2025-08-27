import { execSync } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';
import * as process from 'node:process';
import puppeteer from 'puppeteer-core';

// 获取系统平台对应的Chrome可执行路径
function getChromeExecutablePath(): string {
  const platform = process.platform;

  // 常见的Chrome安装路径
  const chromePaths = {
    darwin: [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    ],
    win32: [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      join(homedir(), 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'),
      'C:\\Program Files\\Chromium\\Application\\chrome.exe',
    ],
    linux: [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
      '/snap/bin/chromium',
    ],
  };

  const paths = chromePaths[platform as keyof typeof chromePaths] || [];

  // 检查每个路径是否存在
  for (const path of paths) {
    if (existsSync(path)) {
      return path;
    }
  }

  // 如果没有找到，尝试使用which命令（Linux/macOS）或where命令（Windows）
  try {
    if (platform === 'win32') {
      const result = execSync('where chrome', { encoding: 'utf8' }).trim();
      if (result && existsSync(result)) {
        return result;
      }
    }
    else {
      const commands = ['google-chrome', 'google-chrome-stable', 'chromium-browser', 'chromium'];
      for (const cmd of commands) {
        try {
          const result = execSync(`which ${cmd}`, { encoding: 'utf8' }).trim();
          if (result && existsSync(result)) {
            return result;
          }
        }
        catch {
          // 继续尝试下一个命令
        }
      }
    }
  }
  catch (error) {
    console.warn('无法通过命令行找到Chrome路径:', error);
  }

  throw new Error(
    `在当前系统 (${platform}) 上找不到Chrome浏览器。请确保已安装Chrome或Chromium，或手动指定executablePath。`,
  );
}

// 获取临时用户数据目录路径
function getTempUserDataDir(): string {
  // 创建临时目录，避免与现有Chrome实例冲突
  return mkdtempSync(join(tmpdir(), 'chrome-proxy-'));
}

async function runProxy() {
  try {
    const executablePath = getChromeExecutablePath();
    const userDataDir = getTempUserDataDir();

    console.warn(`使用Chrome路径: ${executablePath}`);
    console.warn(`临时用户数据目录: ${userDataDir}`);

    const browser = await puppeteer.launch({
      executablePath,
      headless: true,
      defaultViewport: null,
      args: [
        `--user-data-dir=${userDataDir}`,
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--remote-debugging-port=0',
      ],
    });

    const page = await browser.newPage();
    await page.goto(
      'https://market.m.taobao.com/app/trip/rx-trip-ai/pages/home?spm=defwork.home.0.0.45fd5c4bI5cl0F&_projVer=1.7.2',
    );
    return page;
  }
  catch (error) {
    console.error('启动Chrome失败:', error);
    throw error;
  }
}

export { runProxy };
