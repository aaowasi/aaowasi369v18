import {chromium} from 'playwright';
import {spawnSync} from 'node:child_process';
const run=spawnSync('npx',['--yes','lighthouse@12.8.2',process.env.TEST_URL||'http://127.0.0.1:4173','--chrome-flags=--headless --no-sandbox','--output=json','--output-path=docs/verification/lighthouse.json','--only-categories=performance,accessibility,best-practices,seo','--quiet'],{stdio:'inherit',env:{...process.env,CHROME_PATH:chromium.executablePath()}});
process.exit(run.status??1);
