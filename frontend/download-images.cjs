const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const images = [
  { url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800", name: "product-1.jpg" },
  { url: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=800", name: "product-2.jpg" },
  { url: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800", name: "product-3.jpg" },
  { url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800", name: "product-4.jpg" },
  { url: "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&q=80&w=800", name: "product-5.jpg" },
  { url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800", name: "product-6.jpg" },
  { url: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800", name: "product-7.jpg" },
  { url: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=800", name: "product-8.jpg" }
];

images.forEach(img => {
  const filepath = path.join(dir, img.name);
  const file = fs.createWriteStream(filepath);
  https.get(img.url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${img.name}`);
    });
  }).on('error', err => {
    fs.unlink(filepath);
    console.error(`Error downloading ${img.name}: ${err.message}`);
  });
});
