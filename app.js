// mengambil argumen dari command line
const yargs = require('yargs');
const { simpanContact } = require('./contacts');

yargs.command({
  command: 'add',
  describe: 'Menambahkan contact baru',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'Email Aktif',
      demandOption: false,
      type: 'string'
    },
    noHP: {
      describe: 'No HP Aktif',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    simpanContact(argv.nama, argv.email, argv.noHP);
  }
});
yargs.parse();













// const { simpanContact, tulisPertanyaan } = require("./contacts");

// const main = async () => {
//   const nama = await tulisPertanyaan('Masukkan nama anda : ');
//   const email = await tulisPertanyaan('Masukkan email anda : ');
//   const noHp = await tulisPertanyaan('Masukkan nomor hp anda : ');

//   simpanContact(nama, email, noHp);
// };

// main();