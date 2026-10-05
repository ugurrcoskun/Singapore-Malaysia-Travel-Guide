import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const seed=JSON.parse(fs.readFileSync('data/places-seed.json','utf8'));
const target='data/geocode-results.json';
const results=fs.existsSync(target)?JSON.parse(fs.readFileSync(target,'utf8')):{};
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
for(const [index,place] of seed.entries()){
  if(results[place.name])continue;
  const args=['-f','-sS','--get','-H','User-Agent: AsyaCepRehberi/1.0','--data-urlencode',`q=${place.name}, Singapore`,'--data-urlencode','format=jsonv2','--data-urlencode','limit=3','--data-urlencode','countrycodes=sg','https://nominatim.openstreetmap.org/search'];
  const r=spawnSync('curl',args,{encoding:'utf8'});
  if(r.status!==0){console.error('Failed:',place.name,r.stderr);continue}
  try{results[place.name]=JSON.parse(r.stdout).map(hit=>({lat:Number(hit.lat),lon:Number(hit.lon),name:hit.display_name,category:hit.category,type:hit.type}));}
  catch{console.error('Bad result:',place.name);continue}
  fs.writeFileSync(target,JSON.stringify(results,null,2));
  console.log(`${index+1}/${seed.length} ${place.name}: ${results[place.name].length}`);
  await sleep(1200);
}
