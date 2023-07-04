/*
    * Created By ADITYA STORE JB
    * Subscribe Biar Work :3
    * Minimal Credit Nya Lah
    * Buy Panel? 083839990008
    * SC INI GRATIS! LU JUAL? DEPET TIKET NERAKA
*/

require('./config')
const { default: connConnect, useMultiFileAuthState, makeWASocket, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require("@adiwajshing/baileys")
const fs = require('fs')
const pino = require('pino')
const yargs = require('yargs/yargs')
const lolcatjs = require('lolcatjs')
const { Boom } = require('@hapi/boom')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const _ = require('lodash')
const axios = require('axios')
const PhoneNumber = require('awesome-phonenumber')
const owo = JSON.parse(fs.readFileSync('./lib/lowdb/adapters/koi.json'))
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep, reSize } = require('./lib/myfunc')

var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./lib/lowdb')
}

const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`./src/database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read()
  global.db.READ = false
  global.db.data = {
    users: {},
    group: {},
    chats: {},
    database: {},
    game: {},
    settings: {},
    donate: {},
    others: {},
    sticker: {},
    anonymous: {},
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}
loadDatabase()

// save database every 30seconds
if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
  }, 30 * 1000)

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState(`./session`)

const client = connConnect({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: ['HuTod','Safari','1.0.0'],
        patchMessageBeforeSending: (message) => {

                const requiresPatch = !!(
                  message.buttonsMessage
              	  || message.templateMessage
              		|| message.listMessage
                );
                if (requiresPatch) {
                    message = {
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: {
                                    deviceListMetadataVersion: 2,
                                    deviceListMetadata: {},
                                },
                                ...message,
                            },
                        },
                    };
                }
                return message;
    },
        auth: state
    })

client.ev.on('messages.upsert', async mek => {
try {
if (!mek.messages) return
msg = mek.messages[0]
require("./hutod")(client, mek, store, msg)
} catch (err) {
            console.log(err)
        }
    })

// anticall auto block
    client.ws.on('CB:call', async (json) => {
    const callerId = json.content[0].attrs['call-creator']
    if (json.content[0].tag == 'offer') {
    let pa7rick = await client.sendContact(callerId, global.owner)
    client.sendMessage(callerId, { text: `‣ *Sistem otomatis block!*\n‣ *Jangan menelpon bot*!\n*‣ Silahkan Hubungi Owner Untuk Dibuka !*`}, { quoted : pa7rick })
    await sleep(8000)
    await client.updateBlockStatus(callerId, "block")
    }
    })

client.ev.on('group-participants.update', async (anu) => {
        console.log(anu)
        try {
            let metadata = await client.groupMetadata(anu.id)
            let participants = anu.participants
            for (let num of participants) {
                // Get Profile Picture User
                try {
                    ppuser = await client.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://tinyurl.com/yx93l6da'
                }

                // Get Profile Picture Group
                try {
                    ppgroup = await client.profilePictureUrl(anu.id, 'image')
                } catch {
                    ppgroup = 'https://tinyurl.com/yx93l6da'
                }
               if (anu.action == 'add') {
                 let a = `*Hello @${num.split("@")[0]}, 👋 Welcome To ${metadata.subject}*\n*Kami Harap Kamu Merasa Nyaman Di Grup Ini Dan Jangan Lupa Membaca Deskripsi Grup 😋*\n\n┌───⊷ *INTRO*\n▢ *Nama* :\n▢ *Gender* :\n▢ *Kelas* :\n▢ *Domisili* :\n▢ *Waifu/Husbu* :\n└──────────────`
                 client.sendMessage(anu.id, { audio: fs.readFileSync('./mp3/welcome.mp3'), mimetype: 'audio/mp4', ptt: true, fileLength: 88738})
                    client.sendMessage(anu.id, {
     text: a, 
      contextInfo: {
         externalAdReply: {
         title: `${namabot}`,
         body: `${namaowner}`,
         thumbnailUrl: ppuser,
         sourceUrl: "https://instagram.com/adityaakusuma22_",
         mediaType: 1,
         renderLargerThumbnail: true
    }}})
                } else if (anu.action == 'remove') {
                    let a = `*Kami harap orang yang mencintai @${num.split("@")[0]} akan merasa nyaman saat mengunjungi profilnya untuk mengenang dan merayakan momen hidupnya* 🤠🥀.`
                    client.sendMessage(anu.id, { audio: fs.readFileSync('./mp3/leave.mp3'), mimetype: 'audio/mp4', ptt: true, fileLength: 88738})
      client.sendMessage(anu.id, {
     text: a, 
      contextInfo: {
         externalAdReply: {
         title: `${namabot}`,
         body: `${namaowner}`,
         thumbnailUrl: ppuser,
         sourceUrl: "https://instagram.com/@adityaakusuma22_",
         mediaType: 1,
         renderLargerThumbnail: true
    }}})
                } else if (anu.action == 'promote') {
                    let a = `Congratulations @${num.split("@")[0]}, on being promoted to admin of this group ${metadata.subject} 🎉`
                    client.sendMessage(anu.id, {
     text: a, 
      contextInfo: {
         externalAdReply: {
         title: `${namabot}`,
         body: `${namaowner}`,
         thumbnailUrl: ppuser,
         sourceUrl: "https://instagram/@adityaakusuma22_",
         mediaType: 1,
         renderLargerThumbnail: true
    }}})
                } else if (anu.action == 'demote') {
                    let a = `nice try for the demotion to become an ordinary member`
                    client.sendMessage(anu.id, {
     text: a, 
      contextInfo: {
         externalAdReply: {
         title: `${namabot}`,
         body: `${namaowner}`,
         thumbnailUrl: ppuser,
         sourceUrl: "https://instagram/@adityaakusuma22_",
         mediaType: 1,
         renderLargerThumbnail: true
    }}})
              }
            }
        } catch (err) {
            console.log("Eror Di Bagian Welcome Group "+err)
        }
    })
    
    	client.ev.on('creds.update', saveCreds)
    	
    	client.public = true

client.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') { lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? connectToWhatsApp() : ''
} else if (connection === "open") { client.sendMessage(owo + "@s.whatsapp.net", { text: `*Bot Started!*\n\n\n*_Minimal Subscribe Cuy :3_*\n\n*YouTube:*\nhttps://youtube.com/@Adityastore22` }); }
console.log(update)}
)}

connectToWhatsApp()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})