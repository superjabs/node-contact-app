const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

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

const loadContact = () => {
  const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(fileBuffer);
  return contacts;
}

const simpanContact = (nama, email, noHp) => {
  const contact = {nama, email, noHp};
  const contacts = loadContact();

  // cek duplikasi
  const duplikasi = contacts.find((contact) => contact.nama === nama);
  if(duplikasi){
    console.log(chalk.bgRed.bold('data sudah ada, silahkan ganti yang lain!'));
    return false;
  }

  // validasi email
  if(email){
    if(!validator.isEmail(email)){
      console.log(
        chalk.bgRed('email tidak valid!')
        );
        return false;
    };
  };

  // validasi nomor hp
  if(noHp){
    if(!validator.isMobilePhone(noHp, 'id-ID')){
      console.log(
        chalk.bgRed('nomor hape tidak valid!')
        );
        return false;
    };
  };

  contacts.push (contact)
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null,2));

  console.log(chalk.bgGreen.white(`terima kasih ${nama}, sudah memasukkan data!`));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.bgBlue.white('Daftar Kontak : '));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. nama = ${contact.nama}, no hp = ${contact.noHp}`);
  });
}

const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

  if(!contact){
    console.log(chalk.bgRed.white.bold(`kontak${nama} tidak di temukan!`));
    return false;
  }

  console.log(chalk.bgWhite.black(contact.nama));
  console.log(chalk.bgWhite.black(contact.email));
  console.log(chalk.bgWhite.black(contact.noHp));
}

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if(contacts.length === newContacts.length){
    console.log(chalk.bgRed(`kontak ${nama} tidak di temukan!`));
    return false;
  }

  fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts, null,2));

  console.log(chalk.bgGreen.white(`data ${nama}, berhasil di hapus!`));
}

module.exports = { simpanContact, listContact, detailContact, deleteContact }