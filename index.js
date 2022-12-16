const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {

  console.log(`Logged in as ${client.user.tag}!`);

});

client.on('message', message => {

  // Ignore messages from other bots

  if (message.author.bot) return;

  // Ignore messages that don't start with the prefix

  if (!message.content.startsWith('!protect')) return;

  // Get the role to protect

  const role = message.guild.roles.cache.find(role => role.name === 'Protected');

  if (!role) return message.reply("I couldn't find the 'Protected' role.");

  // Check if the user has the role

  if (!message.member.roles.cache.has(role.id)) {

    return message.reply("You don't have the 'Protected' role.");

  }

  // Ignore messages from other channels

  if (message.channel.id !== 'channel-id-goes-here') {

    return message.reply("This command can only be used in the designated channel.");

  }

  // Get the user to protect

  const user = message.mentions.users.first();

  if (!user) {

    return message.reply("You didn't mention a user to protect.");

  }

  // Get the member object for the user to protect

  const member = message.guild.member(user);

  if (!member) {

    return message.reply("That user is not a member of this server.");

  }

  // Add the role to the user

  member.roles.add(role);

  message.reply(`${user.tag} has been protected.`);

});

client.login('your-discord-bot-token-goes-here');

