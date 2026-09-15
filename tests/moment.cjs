const {chromium}=require('playwright');const assert=require('node:assert/strict');const path=require('node:path');
(async()=>{const browser=await chromium.launch({headless:true});const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('file://'+path.resolve('what-happens-to-a-moment.html'));
for(let first=0;first<4;first++)for(let assurance=0;assurance<(first===0?4:1);assurance++)for(let funding=0;funding<6;funding++){
 await page.evaluate(()=>{resetGame();startGame()});
 for(let turn=0;turn<12;turn++){
 const txt=await page.locator('#app').innerText();assert(!/[↑↓]/.test(txt));
 if(turn===1)assert(txt.includes(first===1||first===2?'Day 5':'The Fires Spread'));
 if(turn===7)assert(txt.includes(['appointed national spokesperson','Bihar chapter','180,000','elected state convenor'][(funding+2)%4]));
 await page.evaluate(({turn,first,funding})=>{let i=turn===0?first:(funding+turn)%4;if(currentTurn().choices[i].locked?.(state.vars,state.flags))i=0;selectChoice(i)},{turn,first,funding});
 if(turn===11){await page.evaluate(()=>showEnding());break;}
 await page.evaluate(()=>nextTurn());
 if(await page.evaluate(()=>state.screen==='mini')){await page.evaluate(i=>chooseMini(i),turn===0?assurance:funding);await page.evaluate(()=>nextTurn());}
 }
 assert.equal(await page.evaluate(()=>state.history.filter(h=>!h.mini).length),12);
 assert.equal(await page.evaluate(()=>state.screen),'ending');assert((await page.locator('#app').innerText()).includes('Where did your moment go?'));
}
// Prior capability is evaluated before granting tracker infrastructure.
await page.evaluate(()=>{resetGame();state.turn=5;state.screen='turn';selectChoice(1)});assert((await page.locator('#app').innerText()).includes('patchy and slow'));
await page.evaluate(()=>{resetGame();startGame();selectChoice(1);nextTurn()});await page.screenshot({path:'output/moment/held.png',fullPage:true,animations:'disabled'});
await page.evaluate(()=>{resetGame();startGame();selectChoice(0);nextTurn()});await page.screenshot({path:'output/moment/assurance.png',fullPage:true,animations:'disabled'});
await page.evaluate(()=>{state.turn=4;state.mini='funding';state.screen='mini';render()});await page.setViewportSize({width:390,height:844});await page.screenshot({path:'output/moment/funding-mobile.png',fullPage:true,animations:'disabled'});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await page.evaluate(()=>{resetGame();startGame();for(let t=0;t<12;t++){selectChoice(t===2?3:0);if(t<11){nextTurn();if(state.screen==='mini'){chooseMini(0);nextTurn();}}}showEnding()});await page.screenshot({path:'output/moment/ending-mobile.png',fullPage:true,animations:'disabled'});
assert.deepEqual(errors,[]);console.log('42 complete paths passed; assurance × funding, branches, governance callbacks, prior-capability regression, mobile overflow and console checked.');await browser.close();})();
