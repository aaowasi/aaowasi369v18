// Run with an installed Playwright package and its browsers: npm install --no-save playwright
// then npx playwright install chromium firefox webkit.
import {chromium,firefox,webkit} from 'playwright';
import fs from 'node:fs/promises';
const url=process.env.TEST_URL||'http://127.0.0.1:4173';
const widths=[320,375,390,768,1024,1280,1440,1920,2560];
const results=[];await fs.mkdir('docs/verification',{recursive:true});
for(const [name,engine]of Object.entries({chromium,firefox,webkit})){
 const browser=await engine.launch({headless:true});
 const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of widths){await page.setViewportSize({width,height:900});await page.goto(url);await page.locator('#dashboard').waitFor({state:'visible'});for(const theme of ['light','dark']){await page.getByLabel('Color theme').selectOption(theme);const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);if(overflow)throw Error(`${name} ${width} ${theme}: overflow`);results.push({browser:name,width,theme,overflow:false});} }
 await page.setViewportSize({width:1440,height:1000});await page.getByLabel('Category',{exact:true}).selectOption('AI Reliability & Data Loss');if(await page.locator('.risk-entry').count()!==5)throw Error('Category filtering failed');
 await page.getByRole('button',{name:'Clear filters',exact:true}).click();await page.getByLabel('Risk matrix view').selectOption('residual');if(!(await page.locator('#matrix-note').innerText()).includes('15 scenarios'))throw Error('Residual source handling failed');
 await page.locator('.risk-entry').first().locator('summary').first().click();await page.getByText('Explore residual likelihood & impact',{exact:true}).first().click();await page.getByLabel('R-001 residual likelihood',{exact:true}).selectOption('2');await page.getByLabel('R-001 residual impact',{exact:true}).selectOption('4');await page.getByRole('button',{name:'Apply scenario position',exact:true}).first().click();if(!(await page.locator('#matrix-note').innerText()).includes('14 scenarios'))throw Error('Scenario update failed');
 await page.getByRole('button',{name:'AI governance',exact:true}).click();if(!page.url().includes('domain=ai-governance'))throw Error('Domain deep link failed');
 for(const label of ['Supports a critical service','Processes personal data','Signed processor agreement available','Subprocessors authorized','Training use excluded for intended data'])await page.getByLabel(label,{exact:true}).selectOption('true');
 await page.getByLabel('Security evidence date',{exact:true}).fill(new Date().toISOString().slice(0,10));await page.getByRole('button',{name:'Evaluate vendor',exact:false}).click();if(!(await page.locator('#vendor-decision').innerText()).includes('Ready for review'))throw Error('Vendor ready path failed');
 const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Download JSON',exact:false}).click();const download=await downloadPromise;await download.saveAs(`docs/verification/${name}-vendor.json`);
 await page.getByLabel('Signed processor agreement available',{exact:true}).selectOption('false');await page.getByRole('button',{name:'Evaluate vendor',exact:false}).click();if(!(await page.locator('#vendor-decision').innerText()).includes('Hold'))throw Error('Vendor blocker failed');
 await page.getByRole('button',{name:'Reset',exact:true}).click();if(await page.getByRole('button',{name:'Download JSON',exact:false}).isEnabled())throw Error('Reset failed');
 await page.goto(url);await page.getByLabel('Color theme').selectOption('dark');await page.screenshot({path:`docs/verification/${name}-desktop.png`,fullPage:true});await page.setViewportSize({width:390,height:844});await page.screenshot({path:`docs/verification/${name}-mobile.png`,fullPage:true});
 if(errors.length)throw Error(errors.join('\n'));await browser.close();
}
await fs.writeFile('docs/verification/browser-results.json',JSON.stringify(results,null,2));console.log(`${results.length} viewport/theme checks passed plus interaction checks in three engines.`);
