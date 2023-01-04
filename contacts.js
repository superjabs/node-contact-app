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



const simpanContact = (nama, email, noHp) => {
  const contact = {nama, email, noHp};
  const file = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(file);

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

module.exports = { simpanContact }