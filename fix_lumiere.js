const fs = require('fs');
let html = fs.readFileSync('portfolio_final.html', 'utf8');
let lines = html.split('\n');
let newLines = [];
let skip = false;

for(let i = 0; i < lines.length; i++) {
    let l = lines[i];
    
    // Remove JS logic for Lumiere
    if(i >= 820 && i <= 837) {
        continue;
    }
    
    if(l.includes('<div class="relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-surface lumiere-gallery">')) {
        newLines.push('                        <div class="relative w-full overflow-hidden rounded-xl bg-surface">');
        continue;
    }
    
    if(l.includes('<!-- Image 1 (Base) -->')) {
        skip = true;
        continue;
    }
    
    if(skip && l.includes('<img alt="Lumière Studio Cover"')) {
        skip = false;
        continue;
    }
    
    if(l.includes('<!-- Image 2 (Hover Reveal) -->')) {
        continue;
    }
    
    if(l.includes('<img alt="Lumière Studio Detail" class="lumiere-img-2"')) {
        let match = l.match(/src="(.*?)"/);
        if(match) {
            newLines.push('                            <img alt="Lumière Studio" class="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.02]" src="' + match[1] + '" />');
        }
        continue;
    }
    
    newLines.push(l);
}

fs.writeFileSync('portfolio_final.html', newLines.join('\n'), 'utf8');
console.log('Script completed.');
