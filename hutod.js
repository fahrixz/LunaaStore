
require('./config')
const { baileys, proto, generateWAMessageFromContent, getContentType } = require("@adiwajshing/baileys")
const { getGroupAdmins, runtime, fetchJson } = require("./functions.js")
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom, reSize } = require('./lib/myfunc')
const { exec } = require("child_process")
const cheerio = require("cheerio")
const chalk = require("chalk")
const util = require("util")
const jsobfus = require('javascript-obfuscator')
const axios = require("axios")
const fs = require("fs")
const moment = require('moment-timezone')
const owner = JSON.parse(fs.readFileSync("./owner.json"))

//Read Database
global.db.data = JSON.parse(fs.readFileSync('./src/database.json'))
if (global.db.data) global.db.data = {
    users: {},
    group: {},
    chats: {},
    database: {},
    settings: {},
    donate: {},
    others: {},
    sticker: {},
    ...(global.db.data || {})
}

moment.tz.setDefault("Asia/Jakarta").locale("id")

module.exports = async (client, mek, store, msg) => {
try {
const type = getContentType(msg.message)
const content = JSON.stringify(msg.message)
const from = msg.key.remoteJid
const fatkuns = (msg.quoted || msg)
const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : msg.quoted ? msg.quoted : msg
const body = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && msg.message.buttonsResponseMessage.selectedButtonId) ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : ''
var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const botNumber = client.user.id.split(':')[0]
const sender = msg.key.fromMe ? (client.user.id.split(':')[0]+'@s.whatsapp.net' || client.user.id) : (msg.key.participant || msg.key.remoteJid)
const isGroup = from.endsWith('@g.us')
const groupMetadata = isGroup ? await client.groupMetadata(from).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false
const senderNumber = sender.split('@')[0]
const pushname = msg.pushName || `${senderNumber}`
const nomorOwner = [`6285769727113`]
const isBot = botNumber.includes(senderNumber)
const isOwner = nomorOwner.includes(senderNumber) || isBot
const mentionUser = [...new Set([...(msg.mentionedJid || []), ...(msg.quoted ? [msg.quoted.sender] : [])])]
const mentionByTag = type == 'extendedTextMessage' && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == 'extendedTextMessage' && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || '' : ''
const text = q = args.join(" ")
var budy = (typeof text == 'string' ? text : '')
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const numberQuery = q.replace(new RegExp('[()+-/ +/]', 'gi'), '') + '@s.whatsapp.net'
const usernya = mentionByReply ? mentionByReply : mentionByTag[0]
const Input = mentionByTag[0] ? mentionByTag[0] : mentionByReply ? mentionByReply : q ? numberQuery : false


// Days
const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
const wib = moment.tz('Asia/Jakarta').format('HH : mm : ss')
const wit = moment.tz('Asia/Jayapura').format('HH : mm : ss')
const wita = moment.tz('Asia/Makassar').format('HH : mm : ss')

const time2 = moment().tz('Asia/Jakarta').format('HH:mm:ss')
if(time2 < "23:59:00"){
var ucapanWaktu = 'Selamat Malam 🏙️'
}
if(time2 < "19:00:00"){
var ucapanWaktu = 'Selamat Petang 🌆'
}
if(time2 < "18:00:00"){
var ucapanWaktu = 'Selamat Sore 🌇'
}
if(time2 < "15:00:00"){
var ucapanWaktu = 'Selamat Siang 🌤️'
}
if(time2 < "10:00:00"){
var ucapanWaktu = 'Selamat Pagi 🌄'
}
if(time2 < "05:00:00"){
var ucapanWaktu = 'Selamat Subuh 🌆'
}
if(time2 < "03:00:00"){
var ucapanWaktu = 'Selamat Tengah Malam 🌃'
}

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
'DNT': 1,
'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

const parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

const isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}

async function obfus(query) {
return new Promise((resolve, reject) => {
try {
const obfuscationResult = jsobfus.obfuscate(query,
{
compact: false,
controlFlowFlattening: true,
controlFlowFlatteningThreshold: 1,
numbersToExpressions: true,
simplify: true, 
stringArrayShuffle: true,
splitStrings: true,
stringArrayThreshold: 1
}
);
const result = {
status: 200,
author: `Koneko-MD`,
result: obfuscationResult.getObfuscatedCode()
}
resolve(result)
} catch (e) {
reject(e)
}
})
}

//━━━━━━━━━━━━━━━[ FAKE ]━━━━━━━━━━━━━━━━━//
	    const ftroli = {
    key: {
fromMe: false,
"participant": "0@s.whatsapp.net",
"remoteJid": "status@broadcast"
    },
    "message": {
orderMessage: {
  itemCount: 2022,
  status: 200,
  thumbnail: thumb,
  surface: 200,
  message: `${ttname}`,
  orderTitle: 'LunaStore',
  sellerJid: '0@s.whatsapp.net'
}
    },
    contextInfo: {
"forwardingScore": 999,
"isForwarded": true
    },
    sendEphemeral: true
}

const fdoc = {
    key: {
participant: '0@s.whatsapp.net',
...(from ? {
  remoteJid: `status@broadcast`
} : {})
    },
    message: {
documentMessage: {
  title: `${ttname}`,
  jpegThumbnail: thumb,
}
    }
}
const fvn = {
    key: {
participant: `0@s.whatsapp.net`,
...(from ? {
  remoteJid: "status@broadcast"
} : {})
    },
    message: {
"audioMessage": {
  "mimetype": "audio/ogg; codecs=opus",
  "seconds": 359996400,
  "ptt": "true"
}
    }
}

const ftextt = {
    key: {
fromMe: false,
participant: `0@s.whatsapp.net`,
...(from ? {
  remoteJid: "status@broadcast"
} : {})
    },
    message: {
"extendedTextMessage": {
  "text": `${ttname}`,
  "title": `${botname}`,
  'jpegThumbnail': thumb,
}
    }
}

const ftoko = {
    key: {
fromMe: false,
participant: `0@s.whatsapp.net`,
...(from ? {
  remoteJid: "status@broadcast"
} : {})
    },
    message: {
"productMessage": {
  "product": {
"productImage": {
    "mimetype": "image/jpeg",
    "jpegThumbnail": thumb,
},
"title": `${ttname}`,
"description": `${botname}`,
"currencyCode": "IDR",
"priceAmount1000": "1000000000000000000",
"retailerId": `${ttname}`,
"productImageCount": 1
  },
  "businessOwnerJid": `0@s.whatsapp.net`
}
    }
}

const fgif = {
    key: {
participant: `0@s.whatsapp.net`,
...(from ? {
  remoteJid: "status@broadcast"
} : {})
    },
    message: {
"videoMessage": {
  "title": `${ttname}`,
  "h": `Hmm`,
  'seconds': '359996400',
  'gifPlayback': 'true',
  'caption': `${ttname}`,
  'jpegThumbnail': thumb,
}
    }
}

const fgclink = {
    key: {
participant: "0@s.whatsapp.net",
"remoteJid": "0@s.whatsapp.net"
    },
    "message": {
"groupInviteMessage": {
  "groupJid": "6288210828960-1616169743@g.us",
  "inviteCode": "m",
  "groupName": `${ttname}`,
  "caption": `${ttname}`,
  'jpegThumbnail': thumb,
}
    }
}

const fvideo = {
    key: {
fromMe: false,
participant: `0@s.whatsapp.net`,
...(from ? {
  remoteJid: "status@broadcast"
} : {})
    },
    message: {
"videoMessage": {
  "title": `${ttname}`,
  "h": `Hmm`,
  'seconds': '359996400',
  'caption': `${ttname}`,
  'jpegThumbnail': thumb,
}
    }
}

const floc = {
    key: {
participant: '0@s.whatsapp.net',
...(from ? {
  remoteJid: `status@broadcast`
} : {})
    },
    message: {
locationMessage: {
  name: `${ttname}`,
  jpegThumbnail: thumb,
}
    }
}

const floc2 = {
    key: {
fromMe: false,
participant: `0@s.whatsapp.net`,
...(from ? {
  remoteJid: "status@broadcast"
} : {})
    },
    message: {
"liveLocationMessage": {
  "title": `${ttname}`,
  "h": `Hmm`,
  'jpegThumbnail': thumb,
}
    }
}

const fkontak = {
    key: {
participant: `0@s.whatsapp.net`,
...(from ? {
  remoteJid: `status@broadcast`
} : {})
    },
    message: {
'contactMessage': {
  'displayName': `${ttname}`,
  'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=6288210828960:6288210828960\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
  'jpegThumbnail': thumb,
  thumbnail: thumb,
  sendEphemeral: true
}
    }
}

const fakestatus = {
    key: {
fromMe: false,
participant: `0@s.whatsapp.net`,
...(from ? {
  remoteJid: "status@broadcast"
} : {})
    },
    message: {
"imageMessage": {
  "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
  "mimetype": "image/jpeg",
  "caption": `${ttname}`,
  "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
  "fileLength": "28777",
  "height": 1080,
  "width": 1079,
  "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
  "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
  "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
  "mediaKeyTimestamp": "1610993486",
  "jpegThumbnail": thumb,
  "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
}
    }
}

const newReply = (teks) => {
client.sendMessage(from, { text: teks, contextInfo:{"externalAdReply": {"title": `ADITYA-TAMVAN`,"body": `👋🏻 Hai kak ${pushname}`, "previewType": "PHOTO","thumbnail": thumb,"sourceUrl": `https://youtube.com/@Adityastore22`}}}, { quoted: msg})}

try {
let isNumber = x => typeof x === 'number' && !isNaN(x)
let user = global.db.data.users[sender]
  if (typeof user !== 'object') global.db.data.users[sender] = {}
  if (user) {
if (!isNumber(user.afkTime)) user.afkTime = -1
if (!('afkReason' in user)) user.afkReason = ''
  } else global.db.data.users[sender] = {
afkTime: -1,
afkReason: '',
  }
  let chats = global.db.data.chats[from]
  if (typeof chats !== 'object') global.db.data.chats[from] = {}
  if (chats) {
if (!('mute' in chats)) chats.mute = false
if (!('antilink' in chats)) chats.antilink = false
if (!('antilinkv2' in chats)) chats.antilinkv2 = false
  } else global.db.data.chats[from] = {
mute: false,
antilink: false,
antilinkv2: false
  }
  let setting = global.db.data.settings[isBot]
if (typeof setting !== 'object') global.db.data.settings[isBot] = {}
if (setting) {
if (!isNumber(setting.status)) setting.status = 0
if (!('autoread' in setting)) setting.autoread = false
} else global.db.data.settings[isBot] = {
status: 0,
autoread: false
}
} catch (err) {
console.error(err)
}

try {
ppuser = await client.profilePictureUrl(sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}

// Public & Self
if (!client.public) {
    if (!msg.key.fromMe && !isOwner) return
}

if (msg.message) {
if (global.db.data.settings[isBot].autoread) {
client.readMessages([msg.key])
}
}

  for (let jid of mentionUser) {
let user = global.db.data.users[jid]
if (!user) continue
let afkTime = user.afkTime
if (!afkTime || afkTime < 0) continue
let reason = user.afkReason || ''
newReply(`❗ Don't Tag Him!
💤 He's AFK ${reason ? 'With Reason: ' + reason : 'No Reason'}
⏳ During ${clockString(new Date - afkTime)}
`.trim())
}

if (db.data.users[sender].afkTime > -1) {
let user = global.db.data.users[sender]
newReply(`
🌤️ You Quit AFK${user.afkReason ? ' After: ' + user.afkReason : ''}
⏳ During ${clockString(new Date - user.afkTime)}
`.trim())
user.afkTime = -1
user.afkReason = ''
}

function khususOwner() {
let izi = "Ngapain Bang?"
newReply(izi)
}

function khususGroup() {
newReply("Apa Coba 🗿")
}

const meki = await getBuffer(ppuser)

if (msg.message) {
            console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(command)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(isGroup ? pushname : 'Private Chat', from))
        }

//Anti Link WA
if (db.data.chats[from].antilink) {
  if (budy.match(`chat.whatsapp.com`)) {
newReply(`「 ANTI LINK WHATSAPP 」\n\nKamu Terdeteksi Mengirim Link Group, Maaf Kamu Akan Di Kick !`)
let gclink = (`https://chat.whatsapp.com/` + await client.groupInviteCode(from))
let isLinkThisGc = new RegExp(gclink, 'i')
let isgclink = isLinkThisGc.test(text)
if (isgclink) return newReply(`Ehh Maaf Gak Jadi, Link Group Ini Ternyata 😆`)
if (isAdmins) return newReply(`Ehh Maaf Ternyata Kamu Admin 😁`)
if (isOwner) return newReply(`Ehh Maaf Kamu Ownerku Ternyata 😅`)
client.groupParticipantsUpdate(from, [sender], 'remove')
  }
}
if (db.data.chats[from].antilinkv2) {
  if (budy.match(`chat.whatsapp.com`)) {
newReply(`「 ANTI LINK WHATSAPP 」\n\n*JANGAN SHARE GC LAIN!!!*`)
let gclink = (`https://chat.whatsapp.com/` + await client.groupInviteCode(from))
let isLinkThisGc = new RegExp(gclink, 'i')
let isgclink = isLinkThisGc.test(text)
if (isgclink) return newReply(`Ehh Maaf Gak Jadi, Link Group Ini Ternyata 😆`)
if (isAdmins) return newReply(`Ehh Maaf Ternyata Kamu Admin 😁`)
if (isOwner) return newReply(`Ehh Maaf Kamu Ownerku Ternyata 😅`)
client.sendMessage(from, { delete: from })
  }
}

// Mute Chat
if (db.data.chats[from].mute && !isAdmins && !isOwner) {
  return
}
switch (command) {
case "menustore": {
owned = `${nomorOwner}@s.whatsapp.net`
let anu = `👋🏻 Haloo @${sender.split("@")[0]}

☍ Mode : *${client.public ? `Public Mode` : `Self Mode`}*
☍ Status : *${isOwner ? `Owner Bot` : `User Bot`}*
☍ Runtime: *${runtime(process.uptime())}*

▧ 「 *G R O U P* 」
│ ‣ ${prefix}grup *close/open*
│ ‣ ${prefix}hidetag *<text>*
│ ‣ ${prefix}antilink *on/off*
│ ‣ ${prefix}antilink2 *on/off*
│ ‣ ${prefix}mutegc *on/off*
└──···

▧ 「 *O T H E R* 」
│ ‣ ${prefix}afk
│ ‣ ${prefix}owner
│ ‣ ${prefix}listpanel
│ ‣ ${prefix}listsewa
└──···

▧ 「 *G E N S H I N* 」
│ ‣ ${prefix}enka
│ ‣ ${prefix}profilgi
└──···

▧ 「 *O W N E R* 」
│ ‣ ${prefix}enc
│ ‣ ${prefix}public
│ ‣ ${prefix}self
│ ‣ ${prefix}listgc
│ ‣ ${prefix}autoread *on/off*
│ ‣ ${prefix}join *<linkgc>*
│ ‣ ${prefix}pushkontak *<text>*
└──···

*© YT FahriXz*
*⚡ JANGAN SPAM/CALL*

*Bot Ini Masih Dalam Tahap Pengembangan, Jadi Mohon Maaf Jika Terdapat Error Di Setiap Fitur 😅🗿*`
client.sendMessage(from, {
    text: anu,
    contextInfo: {
      externalAdReply: {
showAdAttribution: true, 
title: `${ucapanWaktu} ${pushname}`,
body: "LunaStore",
thumbnail: thumb,
sourceUrl: "https://chat.whatsapp.com/Bug7b2wjHmbL525At41QLO",
mediaType: 1,
renderLargerThumbnail: true
      }
    }
   })
   client.sendMessage(from, { audio: fs.readFileSync('./mp3/menu.mp3'), mimetype: 'audio/mp4', ptt: true, fileLength: 88738})
}
break
case "public": {
if (!isOwner) return khususOwner()
client.public = true
newReply(`*🌟 SUKSES GANTI KE MODE PUBLIC*`)
}
break
case "self": {
if (!isOwner) return khususOwner()
client.public = false
newReply(`*🍁 SUKSES GANTI KE MODE SELF*`)
}
break
case 'autoread':
if (!isOwner) return newReply(mess.owner)
if (args.length < 1) return newReply(`Contoh ${prefix + command} on/off`)
if (q === 'on'){
global.db.data.settings[botNumber].autoread = true
newReply(`Berhasil mengubah autoread ke ${q}`)
} else if (q === 'off'){
global.db.data.settings[botNumber].autoread = false
newReply(`Berhasil mengubah autoread ke ${q}`)
}
break
case "listpanel": {
newReply("乂 *𝗟𝗜𝗦𝗧 𝗛𝗔𝗥𝗚𝗔 𝗣𝗔𝗡𝗘𝗟 PROMO* 乂\n⚡ RAM 1 GB CPU 30% = 5K\n⚡ RAM 3 GB CPU 100% = 10K \n⚡ RAM 8GB COU 190% = 20K\n ⚡ ADMIN PANEL = 25K\n⚡ RAM UNLIMITED & CPU = 25K\n\n*〽️「 𝙱𝚄𝚈 𝙿𝙰𝙽𝙴𝙻 𝙲𝙷𝙰𝚃 」\nhttps://wa.me/6285769727113")
}
break
case "listsewa": {
newReply("乂 *SEWA BOT* 乂\n🛑 *1 BULAN = 20K*\n\n🔰「 𝙲𝙷𝙰𝚃 」\nhttps://wa.me/6285769727113")
}
break
case 'owner': 
case 'creator': {
const vcard =
'BEGIN:VCARD\n' + // metadata of the contact card
'VERSION:3.0\n' +
`FN:${namaowner}\n` + // full name
`ORG:${namabot};\n` + // the organization of the contact
`TEL;type=MSG;type=CELL;type=VOICE;waid=${owner}:+${owner}\n` + // WhatsApp ID + phone number
'END:VCARD'
			client.sendMessage(from, {
contacts: {
	displayName: namaowner,
	contacts: [{ vcard }],
},
			}, { quoted: fkontak})
     }
break
case 'mutegc': {
if (!isGroup) return newReply(mess.group)
if (!isAdmins && !isOwner) return newReply(mess.admin)
if (args[0] === "on") {
    if (db.data.chats[from].mute) return newReply(`Sudah Aktif Sebelumnya 🕊`)
    db.data.chats[from].mute = true
    newReply(`Bot telah di mute di group ini 🕊️`)
} else if (args[0] === "off") {
    if (!db.data.chats[from].mute) return newReply(`Sudah Tidak Aktif Sebelumnya 🕊`)
    db.data.chats[from].mute = false
    newReply(`Bot telah di unmute di group ini 🕊️`)
}
}
  break
case 'antilink': {
if (!isGroup) return newReply(mess.group)
if (!isAdmins && !isOwner) return newReply(mess.admin)
if (args[0] === "on") {
    if (db.data.chats[from].antilink) return newReply(`Sudah Aktif Sebelumnya 🕊️`)
    db.data.chats[from].antilink = true
    newReply(`Antilink Group WhatsApp Aktif 🕊️`)
} else if (args[0] === "off") {
    if (!db.data.chats[from].antilink) return newReply(`Sudah Nonaktif Sebelumnya 🕊`)
    db.data.chats[from].antilink = false
    newReply(`Antilink Group WhatsApp Nonaktif 🕊️`)
}
}
  break
  case 'antilink2':
if (!isGroup) return newReply(mess.group)
if (!isAdmins && !isOwner) return newReply(mess.admin)
if (args.length < 1) return newReply(`Example ${prefix + command} on/off`)
if (q == 'on'){
    global.db.data.chats[from].antilinkv2 = true
    newReply(`Berhasil Mengaktifkan antilinkv2`)
} else if (q == 'off'){
    global.db.data.chats[from].antilinkv2 = false
    newReply(`Berhasil Mematikan antilinkv2`)
}
  break
case 'kick': {
if (!isGroup) return newReply(mess.group)
if (!isAdmins && !isOwner) return newReply(mess.admin)
let users = msg.mentionedJid ? msg.mentionedJid : msg.quoted ? msg.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
await client.groupParticipantsUpdate(from, [users], 'remove').then((res) => newReply(jsonformat(res))).catch((err) => newReply(jsonformat(err)))
}
break
case 'group':
case 'grup': {
if (!isGroup) return newReply(mess.group)
if (!isAdmins && !isOwner) return newReply(mess.admin)
if (args[0] === 'close') {
    await client.groupSettingUpdate(from, 'announcement').then((res) => newReply(`Sukses Menutup Group 🕊️`)).catch((err) => newReply(jsonformat(err)))
} else if (args[0] === 'open') {
    await client.groupSettingUpdate(from, 'not_announcement').then((res) => newReply(`Sukses Membuka Group 🕊️`)).catch((err) => newReply(jsonformat(err)))
} else {
  newReply(`Mode ${command}\n\n\nKetik ${prefix + command}open/close`)
}
}
break
case 'afk': {
let user = global.db.data.users[sender]
user.afkTime = +new Date
user.afkReason = text
newReply(`💤 *${pushname}* Telah Afk${text ? ': ' + text : ''}`)
  }
  break
case 'hidetag': {
if (!isGroup) return newReply(mess.group)
if (!isAdmins && !isOwner) return newReply(mess.admin)
client.sendMessage(from, {
    text: q ? q : '',
    mentions: participants.map(a => a.id)
}, {
    quoted: msg
})
  }
  break
case 'enka':
  case 'profilgi':
			var _0x447886 = _0x3a0d;
function _0x1fe5() {
    var _0x28efc2 = [
'length',
'1198267XjPSYs',
'Example:\x20',
'220292mOdYxd',
'6165152PDzfZD',
'2352180ezGWLB',
'\x20809005073',
'2762106rayCRA',
'1373859xeuJHq',
'7419576qaEKIi',
'33GJsXaP'
    ];
    _0x1fe5 = function () {
return _0x28efc2;
    };
    return _0x1fe5();
}
function _0x3a0d(_0x57f731, _0x5279aa) {
    var _0x3e9d65 = _0x1fe5();
    return _0x3a0d = function (_0xc5e519, _0x16c04f) {
_0xc5e519 = _0xc5e519 - (0x37d + 0x11ef * 0x1 + -0x137b * 0x1);
var _0x3688b6 = _0x3e9d65[_0xc5e519];
return _0x3688b6;
    }, _0x3a0d(_0x57f731, _0x5279aa);
}
(function (_0x2e6454, _0x1e64bc) {
    var _0x59d198 = _0x3a0d, _0x2ee9f5 = _0x2e6454();
    while (!![]) {
try {
var _0x413469 = -parseInt(_0x59d198(0x1fb)) / (-0x1999 + -0x20c9 + 0x3a63) + parseInt(_0x59d198(0x1fa)) / (0x100d + 0x2662 + -0x366d) + -parseInt(_0x59d198(0x1f2)) / (0xf06 * 0x2 + -0x2557 + -0x11 * -0x6e) * (parseInt(_0x59d198(0x1f6)) / (0xb39 + -0xee0 + 0x3ab * 0x1)) + -parseInt(_0x59d198(0x1f8)) / (-0x6fa + 0x9dd + -0x2 * 0x16f) + parseInt(_0x59d198(0x1f1)) / (0x1e8f + -0x68f + 0x3ff * -0x6) + -parseInt(_0x59d198(0x1f4)) / (0x14e5 * 0x1 + -0x254a + 0x2 * 0x836) + parseInt(_0x59d198(0x1f7)) / (0x50f + 0x17 * 0x1a3 + -0x2aac);
if (_0x413469 === _0x1e64bc)
break;
else
_0x2ee9f5['push'](_0x2ee9f5['shift']());
} catch (_0x5609e0) {
_0x2ee9f5['push'](_0x2ee9f5['shift']());
}
    }
}(_0x1fe5, -0x49f * -0x6b + -0xf2ca * 0x18 + -0x1 * -0x2088a1));
if (args[_0x447886(0x1f3)] == 0x1cf * -0x10 + -0x146f + 0x315f)
    return newReply(_0x447886(0x1f5) + (prefix + command) + _0x447886(0x1f9));
axios.get(`https://enka.network/api/uid/${args[0]}?info`).then(({ data }) => {
var _0x563288 = _0x2321;
function _0x2321(_0x433c47, _0x2b409f) {
    var _0x149a35 = _0x466e();
    return _0x2321 = function (_0x9fdc60, _0x49141f) {
_0x9fdc60 = _0x9fdc60 - (-0x2 * -0x50e + -0x197f + 0x1 * 0xfd9);
var _0x219eda = _0x149a35[_0x9fdc60];
return _0x219eda;
    }, _0x2321(_0x433c47, _0x2b409f);
}
function _0x466e() {
    var _0x5d3c6 = [
'7295WCdXjs',
'1017519rWzDaQ',
'E\x20N\x20S\x20H\x20I\x20',
'evementNum',
'Nickname*\x20',
'towerFloor',
'worldLevel',
'towerLevel',
'?\x20Cek\x20Disi',
'Index',
'1229370ghqiHX',
'ure\x20Rank*\x20',
'finishAchi',
'3898910xgOdYU',
'35hzZvxi',
'\x20‣\x20*Signat',
'ure*\x20:\x20*',
'F\x20I\x20L\x20E\x20G\x20',
'ement*\x20:\x20*',
'▧「\x20*P\x20R\x20O\x20',
'ni\x20:*\x0ahttp',
'signature',
'1868950iKOcNr',
'\x20:\x20*Floor\x20',
'\x20Chamber\x20',
'ih\x20Lengkap',
'\x20‣\x20*Achiev',
'N*\x20」\x0a\x0a\x20‣\x20*',
'\x20‣\x20*World\x20',
's://enka.n',
'163992LgCaIv',
'▧\x20*Mau\x20Leb',
'etwork/u/',
'\x20‣\x20*Advent',
'\x20‣\x20*Abyss*',
':\x20*',
'playerInfo',
'nickname',
'*\x0a\x0a',
'268CtLxio',
'45nGkdvv',
'level',
'Level*\x20:\x20*',
'321466ZqaoSK'
    ];
    _0x466e = function () {
return _0x5d3c6;
    };
    return _0x466e();
}
(function (_0x22cc06, _0x19334f) {
    var _0x4f2047 = _0x2321, _0x139f01 = _0x22cc06();
    while (!![]) {
try {
var _0x258429 = parseInt(_0x4f2047(0x96)) / (0x1a6d + 0x1 * -0x11b6 + -0x8b6) + -parseInt(_0x4f2047(0x81)) / (-0x2700 + 0x2131 + 0x5d1) + -parseInt(_0x4f2047(0x98)) / (-0x536 * 0x2 + 0x2356 + -0x33 * 0x7d) + parseInt(_0x4f2047(0x92)) / (-0x559 * 0x7 + 0x14d * -0x3 + 0x295a) * (-parseInt(_0x4f2047(0x97)) / (-0x207c + -0x1daf + 0x3e30)) + -parseInt(_0x4f2047(0xa1)) / (-0x301 + -0x2 * 0x917 + -0x59 * -0x3d) + parseInt(_0x4f2047(0x79)) / (0x23a5 + 0x13db + -0xb * 0x50b) * (parseInt(_0x4f2047(0x89)) / (0x1454 + 0x1681 + 0x1 * -0x2acd)) + -parseInt(_0x4f2047(0x93)) / (-0x2182 + -0xc8b + 0x2e16) * (-parseInt(_0x4f2047(0x78)) / (-0x2505 + 0x5 * -0x70f + 0x80a * 0x9));
if (_0x258429 === _0x19334f)
break;
else
_0x139f01['push'](_0x139f01['shift']());
} catch (_0x138277) {
_0x139f01['push'](_0x139f01['shift']());
}
    }
}(_0x466e, -0xa5205 + 0x65 * -0x10c1 + -0x1d17ea * -0x1));
var caption = _0x563288(0x7e) + _0x563288(0x7c) + _0x563288(0x99) + _0x563288(0x86) + _0x563288(0x9b) + _0x563288(0x8e) + data[_0x563288(0x8f)][_0x563288(0x90)] + '*\x0a';
caption += _0x563288(0x8c) + _0x563288(0x76) + _0x563288(0x8e) + data[_0x563288(0x8f)][_0x563288(0x94)] + '*\x0a', caption += _0x563288(0x7a) + _0x563288(0x7b) + data[_0x563288(0x8f)][_0x563288(0x80)] + '*\x0a', caption += _0x563288(0x87) + _0x563288(0x95) + data[_0x563288(0x8f)][_0x563288(0x9d)] + _0x563288(0x91), caption += _0x563288(0x85) + _0x563288(0x7d) + data[_0x563288(0x8f)][_0x563288(0x77) + _0x563288(0x9a)] + '*\x0a', caption += _0x563288(0x8d) + _0x563288(0x82) + data[_0x563288(0x8f)][_0x563288(0x9c) + _0x563288(0xa0)] + _0x563288(0x83) + data[_0x563288(0x8f)][_0x563288(0x9e) + _0x563288(0xa0)] + _0x563288(0x91), caption += _0x563288(0x8a) + _0x563288(0x84) + _0x563288(0x9f) + _0x563288(0x7f) + _0x563288(0x88) + _0x563288(0x8b) + args[-0x1ee3 + 0x14cd + -0xa16 * -0x1] + '\x0a', newReply(caption);
			})
			.catch(console.error)
			break
case "tes":{
newReply("Iya Kak?")
}
break
case 'listgc': {
if (!isOwner) return khususOwner()
let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
let tekslistgc = `👥 *LIST GROUP CHAT*\n\n`
tekslistgc += `📱 Total Group : ${anu.length} Group\n\n`
for (let e of anu) {
    let metadata = await client.groupMetadata(e)
    tekslistgc += `📛 *Nama :* ${metadata.subject}\n`
    tekslistgc += `👤 *Owner Grup :* ${metadata.owner !== undefined ? '@' + metadata.owner.split`@`[0] : 'Tidak diketahui'}\n`
    tekslistgc += `🌱 *ID :* ${metadata.id}\n`
    tekslistgc += `⏳ *Dibuat :* ${moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n`
    tekslistgc += `👥 *Member :* ${metadata.participants.length}\n\n`
    tekslistgc += `──────────────────────\n\n`
}
newReply(tekslistgc)
  }
break
case "pk":
case 'pushkontak': {
if (!text) return newReply(`Example ${prefix}${command} Hi Semuanya`)
if (!isOwner) return newReply(mess.owner)
let get = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id);
let count = get.length;
let sentCount = 0;
newReply('*_Sedang Push Kontak..._*');
for (let i = 0; i < get.length; i++) {
  setTimeout(function() {
    client.sendMessage(get[i], { text: text });
    count--;
    sentCount++;
    if (count === 0) {
      newReply(`*Sukses Mengirim Pesan!*:\n*_Jumlah pesan terkirim:_* *_${sentCount}_*`);
    }
  }, i * 1000); // delay setiap pengiriman selama 1 detik
}
}
break
case 'enc': {
if (!isOwner) return newReply(mess.owner)
if (!q) return newReply(`Contoh ${prefix+command} const hutod = require('hutod-tepod')`)
let meg = await obfus(q)
newReply(`${meg.result}`)
}
break
case "join": {
if (!isOwner) return khususOwner()
if (!text) return newReply(`Contoh: ${prefix+command} linkgc`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return newReply('Link Invalid!')
let result = args[0].split('https://chat.whatsapp.com/')[1]
await client.groupAcceptInvite(result).then((res) => newReply(util.format(res))).catch((err) => newReply(util.format(err)))
}
break
default:
}
if (budy.startsWith('>')) {
if (!isOwner) return khususOwner()
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await newReply(evaled)
} catch (err) {
newReply(String(err))
}
}
if (isCmd && budy.toLowerCase() != undefined) {
if (from.endsWith('broadcast')) return
if (msg.isBaileys) return
let msgs = global.db.data.database
if (!(budy.toLowerCase() in msgs)) return
client.copyNForward(from, msgs[budy.toLowerCase()], true)
                }
    } catch (err) {
console.log(util.format(err))
let e = String(err)
client.sendMessage(owner + "@s.whatsapp.net", { text: "👋🏻 Hello developer, ada yang error nih! di bagian " + util.format(e), 
contextInfo:{
forwardingScore: 9999999, 
isForwarded: true
}})
}
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})