const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
	console.log("I am ready!");
});

client.on("message", (message) => {
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === "pronoun") {
		let [pn] = args;
		let member = message.member;
		if (!pn){
			message.channel.send(`Please enter a pronoun.`);
		} else{
			let gpn = message.guild.roles.find('name', pn);
			if(!gpn){
				message.channel.send("Role doesn't exist. Use !pronounadd?");
			} else{
			member.addRole(gpn).catch(console.error);
			message.channel.send(`Adding ${pn} for ${message.author.username}.`);}}
	} else if (command === "unpronoun") {
		let [pn] = args;
		let member = message.member;
		if (!pn){
			message.channel.send(`Please enter a pronoun.`);
		} else{
		let gpn = message.guild.roles.find('name', pn);
		member.removeRole(gpn).catch(console.error);
		message.channel.send(`Removing ${pn} for ${message.author.username}.`);}
	} else if (command === "beepboop") {
		message.channel.send(`Hi ${message.author.username} <3`);
	} else if (command === "help") {
		message.channel.send(`Welcome to Pronoun Bot!`);
		message.channel.send(`Using !pronoun [pronoun] will add a pronoun for the user. Note that you must use this format: they/them.`);
		message.channel.send(`Using !unpronoun [pronoun] will remove a pronoun for the user.`);
		message.channel.send(`Using !pronounadd [pronoun] will add the pronoun (mods only).`);
	} else if (command === "pronounadd") {
		let [pn] = args;
		let perms = message.channel.permissionsFor(message.member).hasPermission("MANAGE_ROLES_OR_PERMISSIONS");
		if (!pn){
			message.channel.send(`Please enter a pronoun.`);
		}
		else{
			if(!perms){
				message.channel.send(`Contact a moderator to add your pronouns.`);
			} else{
			if(!pn.includes("/")){
				message.channel.send('Enter pronouns in subject/2nd form format: they/them, it/its, she/her')
			}
			else{
				
			message.guild.createRole({
				name: pn,
				permissions: []
			});
			message.channel.send(`Adding pronouns: ${pn}.`);}}}
		}
	}
);

client.login(config.token);