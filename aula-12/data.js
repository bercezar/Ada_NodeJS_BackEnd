const { DateTime } = require("luxon");

const agora = DateTime.now();
console.log(agora);
console.log(agora.millisecond);
console.log(agora.month);
console.log(agora.toLocaleString());

const aniversario = DateTime.fromFormat("18/12/2000", "dd/MM/yyyy");
console.log(aniversario);
console.log(aniversario.day);
console.log(aniversario.month);
