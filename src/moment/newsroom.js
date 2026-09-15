// A fictional calendar: both opening routes converge at the May edition.
const EDITIONS=[
 ['8 January','January',8,'Resignation draws fresh crowds as police tighten cordon','Talks offered on condition that the tents come down.'],
 ['12 January','January',12,'Protest enters fifth day as ministers question demands','Supplies tighten and coalition partners debate how long to stay.'],
 ['15 January','January',15,'Protest groups face a test of who can speak for them','Organisers must settle the movement’s decision-making authority.'],
 ['20 January','January',20,'Government invites delegation as camp waits for settlement','The guest list puts working relationships under strain.'],
 ['1 May','May',121,'School complaints pour in from families beyond the protests','Photographs travel quickly. Verification and follow-up take longer.'],
 ['3 June','June',154,'Hostile label spreads as parents question movement’s direction','Campaigners debate how to respond to a widening political attack.'],
 ['7 July','July',188,'Youth demands widen beyond the education campaign','Housing, recruitment and discrimination test the movement’s mandate.'],
 ['4 August','August',216,'Disputed statement exposes question of internal authority','The rules established earlier now face a public test.'],
 ['8 September','September',251,'Government opens talks as parties court youth organisers','Access brings an opportunity to act—and questions about independence.'],
 ['6 October','October',279,'Established parties adopt issues raised by student movement','Organisers are asked what they can offer that others cannot.'],
 ['10 November','November',314,'Student detention puts movement’s promises to the test','The family needs an intervention, not another statement.'],
 ['15 December','December',349,'Election offers force a decision on movement’s future','Parties seek candidates, endorsements and the organisers behind the campaigns.']
];
const LEAVE_EDITIONS={1:['19 February','February',50,'Protests spread after original protest camp closes','Local organisers ask for publicity, legal help and practical support.'],2:['1 March','March',60,'Student cases remain open despite promises of action','Seven weeks after the resignation, families ask who is following up.'],3:['6 April','April',96,'Opposition MP and campus networks secure release without CJP','New organisations are taking the lead in the space the protests opened.']};
function edition(){return state.screen==='ending'?['8 January · One year later','January',373,'The year in review','Where does the political power live now?']:state.branch==='leave'&&LEAVE_EDITIONS[state.turn]||EDITIONS[state.turn];}
const turnBeforeNews=currentTurn;
currentTurn=function(){const sc=turnBeforeNews();if(!sc)return sc;const ed=edition();let report=typeof sc.report==='function'?sc.report():sc.report;
 if(state.turn===2&&state.branch==='leave')report=report.replace(/Six weeks have passed/gi,'Seven weeks have passed');
 if(state.turn===1&&state.branch==='leave')report=report.replace(/last month’s|last month's/g,'January’s');
 return {...sc,event:state.turn===2&&state.branch==='leave'&&state.assurance==='resignation'?'Student cases remain open after the protest camp closes':ed[3],report,tag:ed[0]+' · FIELD REPORT',standfirst:ed[4]};};
function newsParagraphs(text){return String(text).replace(/(^|\n)\s*[“"]/g,'$1').replace(/[”"]\s*$/,'').split(/\n\s*\n|(?<=[.!?])\s+(?=[A-Z“])/).reduce((a,s,i)=>{if(i%2===0)a.push(s);else a[a.length-1]+=' '+s;return a;},[]).map(p=>'<p>'+p+'</p>').join('');}
renderTurn=function(){const sc=currentTurn(),ed=edition();app.innerHTML=`<div class="screen"><div class="turn-header"><div class="phase-label">${ed[0]} · Dispatch ${state.turn+1}</div><h2 class="turn-event display">${sc.event}</h2><p class="news-standfirst">${sc.standfirst}</p><div class="news-byline">Political desk <span>Reporting from the movement’s first year</span></div></div><div class="turn-situation">${newsParagraphs(sc.report)}</div>${pressurePanel()}<div class="decision-heading">At the organising meeting</div><div class="turn-question display">${sc.question}</div><div class="choices">${optionsHTML(sc,false)}</div></div>`;};
const artBeforeNews=render;
render=function(){artBeforeNews();if(state.screen==='title')return;const ed=edition();const header=app.querySelector('.masthead');if(header){header.querySelector('.masthead-note').textContent='The Moment · A political chronicle';const label=header.querySelector('.edition');if(label)label.textContent=ed[0];}
 const strip=app.querySelector('.year-strip');if(strip)strip.innerHTML=`<span class="year-label">The political year</span><div class="month-track">${['January','February','March','April','May','June','July','August','September','October','November','December'].map(m=>`<span class="${m===ed[1]?'current-month':''}">${m.slice(0,3)}</span>`).join('')}</div><span class="year-end">${ed[1]} edition</span>`;
 const rail=app.querySelector('.rail-label');if(rail)rail.innerHTML=`<span>From the archive</span><span>${ed[0]}</span>`;
 if(state.screen==='outcome'){
  const chosen=app.querySelector('.outcome-chose');if(chosen)chosen.textContent=ed[0]+' · The decision';
  const report=app.querySelector('.external-report .phase-label');if(report)report.textContent='Follow-up coverage · Before the next edition';
 }
 if(state.screen==='mini'){const label=app.querySelector('.reading-column > .phase-label');if(label)label.textContent=ed[0]+' · '+label.textContent;}
 if(state.screen==='bulletin'){const label=app.querySelector('.reading-column .phase-label');if(label)label.textContent=ed[0]+' · '+label.textContent;}
};
const textBeforeNews=window.render_game_to_text;
window.render_game_to_text=()=>{const text=JSON.parse(textBeforeNews());text.date=edition()[0];text.pressure=state.screen==='turn'?pressurePublicState():undefined;return JSON.stringify(text);};
const documentBeforeNews=documentData;
documentData=function(){const d=documentBeforeNews();if(state.screen==='turn'){const last=state.history.findLast(h=>!h.mini);if(last){d.title=last.event;d.body='Previously: '+last.consequence.split(/(?<=[.!?])\s/)[0];d.stamp='Archive · Previous edition';}else{d.title='The resignation';d.body='Fresh crowds arrive as restrictions tighten around the protest site.';d.stamp='Special edition';}}return d;};
