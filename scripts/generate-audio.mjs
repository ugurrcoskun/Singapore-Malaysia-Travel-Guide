import fs from 'node:fs';
import vm from 'node:vm';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const context={window:{}};
vm.runInNewContext(fs.readFileSync('dist/phrases.js','utf8'),context);
const phrases=context.window.TRAVEL_PHRASES;
const out='dist/assets/audio';fs.mkdirSync(out,{recursive:true});
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'asya-audio-'));
let count=0;
for(const item of phrases){
  for(const [lang,voice] of [['zh','Tingting'],['ms','Amira']]){
    const destination=path.join(out,`${item.id}-${lang}.m4a`);
    if(fs.existsSync(destination))continue;
    const aiff=path.join(tmp,'voice.aiff');
    const say=spawnSync('say',['-v',voice,'-o',aiff,item[lang]],{encoding:'utf8'});
    if(say.status!==0)throw Error(`say ${item.id}-${lang}: ${say.stderr}`);
    const ff=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',aiff,'-c:a','aac','-b:a','48k',destination],{encoding:'utf8'});
    if(ff.status!==0)throw Error(`ffmpeg ${item.id}-${lang}: ${ff.stderr}`);
    count++;
  }
  if(count%10===0)process.stdout.write(`${count} ses dosyası hazır\n`);
}
fs.rmSync(tmp,{recursive:true,force:true});
console.log(`Tamamlandı: ${count} yeni ses dosyası`);
