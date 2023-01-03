const fs = require('fs');
const readLine = require('readline');

// membuat folder jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath);
}

// membuat  file contact.json di dalam folder data jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});


const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, rejects) => {
    rl.question(pertanyaan, (nama) => {
      resolve(nama);
    });
  });
};

const simpanContact = (nama, email, noHp) => {
  const contact = {nama, email, noHp};
  const file = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(file);
  contacts.push (contact)
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null,2));

  console.log(`terima kasih ${nama}, sudah memasukkan data!`)
  rl.close();
};

module.exports = {
  tulisPertanyaan,
  simpanContact
}