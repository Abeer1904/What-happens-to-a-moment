const {chromium}=require('playwright');const assert=require('node:assert/strict');const path=require('node:path');
(async()=>{const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1100,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('file://'+path.resolve('what-happens-to-a-moment.html'));
const result=await page.evaluate(()=>{
 const savedRender=render;render=()=>{};const seen={};let strongAbsorbed=false;let seed=9817;const rand=n=>{seed=(seed*1664525+1013904223)>>>0;return Math.floor(seed/4294967296*n)};
 for(let run=0;run<20006;run++){
 resetGame();startGame();for(let t=0;t<12;t++){let i=run>=20000?[0,3,2,3,0,0,3,3,0,0,0,2][t]:rand(4);if(currentTurn().choices[i].locked?.(state.vars,state.flags))i=0;selectChoice(i);if(t<11){nextTurn();if(state.screen==='mini'){chooseMini(run>=20000?(state.mini==='funding'?run-20000:3):rand(state.mini==='funding'?6:4));nextTurn();}}}
 const e=calculateEnding(),d=movementDiagnosis(e),causes=endingCauses(e);
 if(causes.length!==4||new Set(causes).size!==4||causes.some(h=>!state.history.includes(h)))throw Error('Invalid causal selection');
 seen[d.state]??={vars:{...state.vars},flags:[...state.flags],history:JSON.parse(JSON.stringify(state.history)),cash:state.cash};
 if(d.state==='ABSORBED'&&e.endState==='THRIVE'){strongAbsorbed=true;seen.strong={vars:{...state.vars},flags:[...state.flags],history:JSON.parse(JSON.stringify(state.history)),cash:state.cash};}
 }
 seen.SURVIVED={...seen.RELEVANT,vars:{rel:30,org:10,agn:20,ind:70,acc:10,mob:15},flags:[],history:state.history};
 render=savedRender;return {seen,strongAbsorbed};
});
assert.deepEqual(Object.keys(result.seen).filter(k=>k!=='strong').sort(),['ABSORBED','RELEVANT','SURVIVED','THRIVED']);
assert(result.strongAbsorbed,'A strong absorbed route must remain reachable');
for(const name of ['THRIVED','RELEVANT','SURVIVED','ABSORBED','strong']){
 await page.evaluate(snapshot=>{Object.assign(state,snapshot);state.flags=new Set(snapshot.flags);showEnding()},result.seen[name]);
 assert.equal(await page.locator('.ending-state-value').innerText(),name==='strong'?'ABSORBED':name);assert.equal(await page.locator('.ending-causes li').count(),4);assert(!/capacity|score:|\d+%/i.test(await page.locator('.ending-causes').innerText()));
 if(name==='strong')assert((await page.locator('.ending-diagnosis').first().innerText()).includes('position of strength'));
 await page.screenshot({path:'output/moment/ending-'+name+'.png',fullPage:true,animations:'disabled'});
}
await page.setViewportSize({width:390,height:844});await page.screenshot({path:'output/moment/ending-new-mobile.png',fullPage:true,animations:'disabled'});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await page.getByText('Review all your decisions',{exact:true}).click();assert(await page.locator('.trace-item').first().isVisible());await page.getByRole('button',{name:'Play Again'}).click();assert(await page.getByRole('button',{name:'Begin the year',exact:false}).isVisible());assert.deepEqual(errors,[]);console.log('20,006 routes plus low-capacity survival fixture: all four diagnoses, strong absorption, four causal decisions, mobile layout, trace expansion and replay passed.');await browser.close();})();
