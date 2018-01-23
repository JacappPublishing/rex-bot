const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

var stdin = process.openStdin();


stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    console.log("you entered: [" + 
        d.toString().trim() + "]");
        client.channels.get('338686385030430720').send(d.toString())
  });

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`on ${client.guilds.size} servers`);
});


client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`on ${client.guilds.size} servers`);
});


  client.on("message", async message => {
  let sender = message.author;  
  if(message.author.bot) return;
      
      let userData = JSON.parse(fs.readFileSync('Data/botBans.json', 'utf8'));
      let maintenance = JSON.parse(fs.readFileSync('Data/Maintenance.json', 'utf8'));
   
      
      

  //Events
  if(!userData[sender.tag + message.guild.id]) userData[sender.tag + message.guild.id] = {}
  if(!userData[sender.tag + message.guild.id].banned) userData[sender.tag + message.guild.id].banned = 0;
  if(!userData[sender.tag + message.guild.id].banned) userData[sender.tag + message.guild.id].banned = 0;
  if(!userData[sender.tag + message.guild.id]) userData[sender.tag + message.guild.id] = {}
      
      // Maintenance
  if(!maintenance["Maintenance"]) maintenance["Maintenance"] = {}
  if(!maintenance["Maintenance"].mainten) maintenance["Maintenance"].mainten = 0;
  
      
  fs.writeFile('Data/botBans.json', JSON.stringify(userData), (err) => {
      if (err) console.error(err)
  })
      
   fs.writeFile('Data/Maintenance.json', JSON.stringify(maintenance), (err) => {
      if (err) console.error(err)
  })
       
         
  
    
  if(message.content.indexOf("!") !== 0) return;

  const args = message.content.slice("!".length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const checkBanned = userData[sender.tag + message.guild.id].banned;
  const checkMaintenance = maintenance["Maintenance"].mainten;
        // Banned from bot
    
        
        if(checkBanned == 1) {
        const embed = new Discord.RichEmbed()
			.setTitle("ERROR")
            .setColor(3447003)
            .setDescription(message.author.username + ", your account is prohibited from using any features. This decision is usually made due to abuse of the bot and it's features. Please contact ``Pick#7564`` if you have an issue with this decision.")
			return message.channel.send({embed});
		}
      
      // Maintenance on bot
      if(checkMaintenance == 1) {
          if(sender.tag != "Pick#7564") {
           const embed = new Discord.RichEmbed()
			.setTitle("ERROR")
            .setColor(3447003)
            .setDescription("```css\nOops! Rex is currently under maintenance.\n```")
			return message.channel.send({embed});
        };
      }
      
      
   String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}
 
      
// Bot stats command
if(command === "stats") {
    var time = process.uptime();
    var uptime = (time + "").toHHMMSS();
	const embed = new Discord.RichEmbed()
	.setTitle(":computer: Bot Stats")
    .setColor(3447003)
    .setDescription("Status: ``Online``\nBuild version: ``0.0.1.0``\nBot Owner: ``Pick#7564``\nServer: ``s3.amazon.rex``\nUptime: ``(uptime)``")
    return message.channel.send({embed});
}
      
// Help command
if(command === "help") {
	const embed = new Discord.RichEmbed()
	.setTitle(":page_facing_up: Help")
    .setColor(3447003)
    .setDescription("**!help**: ``Brings up this help menu.``\n!stats**: ``Shows the current stats of the Rex bot.``\n**!command**: ``Command``\n**!command**: ``Command``\n**!command**: ``Command``\n**!command**: ``Command``\n**!command**: ``Command``\n**!command**: ``Command``")
    return message.channel.send({embed});
}  
      
// Ping command
if(command === "ping") {
	const embed = new Discord.RichEmbed()
    message.channel.send(":signal_strength: Calculating your ping...") .then(function(ping) {
    ping.edit(`:satellite: Pong! Your ping is: **${ping.createdTimestamp - message.createdTimestamp}ms.**`)
    });
}  
      
// Maintenance on command
if(command === "maintenance-on") {
    if(sender.tag == "Pick#7564") {
	const embed = new Discord.RichEmbed()
	.setTitle(":computer: Dev popup")
    .setColor(3447003)
    .setDescription("Rex has been put into maintenance due to: ``botDeveloper:forceoverride_maintenance``")
    maintenance["Maintenance"].mainten = 1;
     fs.writeFile('Data/Maintenance.json', JSON.stringify(maintenance), (err) => {
      if (err) console.error(err)
  })
    return message.channel.send({embed});
}
}
      
// Maintenance off command
if(command === "maintenance-off") {
    if(sender.tag == "Pick#7564") {
	const embed = new Discord.RichEmbed()
	.setTitle(":computer: Dev popup")
    .setColor(3447003)
    .setDescription("Rex has been put into default mode due to: ``botDeveloper:forceoverride_maintenance_off``")
    maintenance["Maintenance"].mainten = 0;
     fs.writeFile('Data/Maintenance.json', JSON.stringify(maintenance), (err) => {
      if (err) console.error(err)
  })
    return message.channel.send({embed});
}
}
      
      

  
  
  
  
  
  
  
      
    
      
      
      
      
      
      
      
      
  });
client.login(process.env.BOT_TOKEN);
