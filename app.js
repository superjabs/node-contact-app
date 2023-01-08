// mengambil argumen dari command line
const yargs = require('yargs');
const { simpanContact, listContact, detailContact, deleteContact } = require('./contacts');

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
}).demandCommand();

yargs.command({
  command: 'list',
  describe: 'Menampilkan semua nama & no hp contact',
  handler() {
    listContact();
  }
});

yargs.command({
  command: 'detail',
  describe: 'Menampilkan detail kontak berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    detailContact(argv.nama);
  }
})

yargs.command({
  command: 'delete',
  describe: 'Menghapus kontak',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    deleteContact(argv.nama);
  }
});

yargs.parse();
