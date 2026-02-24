const fs = require('fs');
const https = require('https');
const path = require('path');

const fontsDir = path.join(__dirname, 'public', 'fonts');

// ensure dir
if (!fs.existsSync(fontsDir)) {
    fs.mkdirSync(fontsDir, { recursive: true });
}

const urls = [
    {
        url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap',
        name: 'inter.css'
    },
    {
        url: 'https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap',
        name: 'clash-display.css'
    }
];

function fetchFile(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                // user-agent is needed to get woff2 from google fonts
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
            }
        }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                return fetchFile(res.headers.location).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to fetch ${url}, status: ${res.statusCode}`));
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function fetchBinary(url, filename) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                return fetchBinary(res.headers.location, filename).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to fetch ${url}, status: ${res.statusCode}`));
            }
            const file = fs.createWriteStream(filename);
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', reject);
    });
}

async function run() {
    let combinedCss = '';

    for (const item of urls) {
        console.log(`Fetching CSS from ${item.url}...`);
        let cssText = await fetchFile(item.url);

        // Find all url(...)
        const regex = /url\((['"]?)(https?:\/\/[^\)]+)\1\)/g;
        let match;
        const fontUrls = [];

        while ((match = regex.exec(cssText)) !== null) {
            fontUrls.push(match[2]);
        }

        console.log(`Found ${fontUrls.length} font files for ${item.name}`);

        for (const fontUrl of fontUrls) {
            const parts = fontUrl.split('/');
            let filename = parts[parts.length - 1];
            filename = filename.split('?')[0];

            // To prevent overwriting files with the same name from different fonts
            filename = item.name.replace('.css', '') + '-' + filename;

            const localFile = path.join(fontsDir, filename);
            const relativePath = `./${filename}`;

            console.log(`Downloading ${fontUrl} to ${localFile}...`);
            await fetchBinary(fontUrl, localFile);

            const safeFontUrl = fontUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            cssText = cssText.replace(new RegExp(safeFontUrl, 'g'), relativePath);
        }

        const cssPath = path.join(fontsDir, item.name);
        fs.writeFileSync(cssPath, cssText);
        console.log(`Saved CSS to ${cssPath}`);

        combinedCss += `/* Imported from ${item.name} */\n@import url("./${item.name}");\n\n`;
    }

    fs.writeFileSync(path.join(fontsDir, 'fonts.css'), combinedCss);
    console.log('Done!');
}

run().catch(console.error);
