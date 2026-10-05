import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
const [,, url, outDir] = process.argv;
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9555;
const chrome = spawn(CH, ["--headless=new", `--remote-debugging-port=${port}`, "--window-size=1400,1000", "--user-data-dir=/tmp/cdp-lk-" + process.pid, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let t; for (let i = 0; i < 40 && !t; i++) { await sleep(250); try { t = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((x) => x.type === "page"); } catch {} }
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
let id = 0; const pend = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result ?? d.error); pend.delete(d.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send("Page.enable");
await send("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } });
await send("Page.navigate", { url }); await sleep(3500);
await send("Runtime.evaluate", { expression: "document.fonts.ready", awaitPromise: true });
const names = { "h-light": "tellme-horizontal-light", "h-dark": "tellme-horizontal-dark", "stack": "tellme-stacked-light", "w-light": "tellme-wordmark-light", "w-dark": "tellme-wordmark-dark" };
for (const [el, file] of Object.entries(names)) {
  const { result } = await send("Runtime.evaluate", { expression: `JSON.stringify(document.getElementById("${el}").getBoundingClientRect())`, returnByValue: true });
  const r = JSON.parse(result.value);
  const { data } = await send("Page.captureScreenshot", { format: "png", clip: { x: r.x, y: r.y, width: r.width, height: r.height, scale: 2 } });
  writeFileSync(`${outDir}/${file}.png`, Buffer.from(data, "base64"));
}
console.log("lockups done"); ws.close(); chrome.kill();
