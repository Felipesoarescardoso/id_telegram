const TelegramBot = require('node-telegram-bot-api');

// 🔐 Seu token do BotFather
const token = '7409480843:AAFm6dL_-fgc2kQkDKuPg4cdEu8YgiSR7cI';

// Inicializa o bot
const bot = new TelegramBot(token, { polling: true });

// Quando o usuário enviar start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Olá! Por favor, compartilhe seu número de telefone:', {
    reply_markup: {
      keyboard: [
        [
          {
            text: '📱 Compartilhar telefone',
            request_contact: true,
          },
        ],
      ],
      one_time_keyboard: true,
      resize_keyboard: true,
    },
  });
});

// Quando o bot receber o número de telefone
bot.on('contact', (msg) => {
  const phone = msg.contact.phone_number;
  const userId = msg.from.id;
  const name = msg.from.first_name;

  console.log('📞 Número recebido:', phone);
  console.log('👤 ID do usuário:', userId);

  bot.sendMessage(
    msg.chat.id,
    `Obrigado, ${name}!\nSeu número foi recebido com sucesso.\nSeu user ID é: ${userId}`
  );
});
