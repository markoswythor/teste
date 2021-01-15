let handler  = async (m, { conn, usedPrefix: _p }) => {
  let preview = {}
  try {
    if (!conn.menu) preview = await conn.generateLinkPreview('https://github.com/Akbarsans/Miray-chan')
  } catch (e) {
    try {
      if (!conn.menu) preview = await global.conn.generateLinkPreview('https://github.com/Nurutomo/wabot-aq')
    } catch (e) {}
  } finally {
    let exp = global.DATABASE.data.users[m.sender].exp
    let name = conn.getName(m.sender)
    let d = new Date
    let locale = 'id-Id'
    let weton = ['Pon','Wage','Kliwon','Legi','Pahing'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })

    let text =  conn.menu ? conn.menu
      .replace(/%p/g, _p)
      .replace(/%exp/g, exp)
      .replace(/%name/g, name)
      .replace(/%weton/g, weton)
      .replace(/%week/g, week)
      .replace(/%date/g, date)
      .replace(/%time/g, time): `
 [Miray-chan] 
Olá, ${name} 👋
Exp: ${exp}
📟 Hora: ${time}
📆 Data: ${week}, ${date}
${more.repeat(1000)}
Como adicionar XP:
+1 Exp/mensagem normal
+10 Exp/comando
═════✪〘 Menu 〙✪═══
═〘 Xp 〙 ═
➥ ${_p}leaderboard [jumlah user]
═〘 Comandos principais 〙 ═
➥ ${_p}menu
➥ ${_p}help
➥ ${_p}?
═〘 Tutor BoT 〙 ═
➥ ${_p}tutorial
═〘 Others 〙 ═
➥ ${_p}qr <teks>
➥ ${_p}stiker (caption)
➥ ${_p}stiker <url>
➥ ${_p}toimg (reply)
➥ ${_p}bucin
➥ ${_p}ssweb <url>
➥ ${_p}sswebf <url>
➥ ${_p}google <pencarian>
➥ ${_p}googlef <pencarian>
➥ ${_p}readmore <teks>|<sembunyi>
➥ ${_p}quran
➥ ${_p}modApk
═〘 Group 〙 ═
➥ ${_p} add [62xxxxxxxxx]
➥ ${_p} promote [@tagmember]
➥ ${_p} gtts
➥ ${_p} demote [@tagadmin]
➥ ${_p} linkgrup
➥ ${_p} pengumuman [text]
➥ ${_p} hidetag [text]
➥ ${_p} listonline
➥ ${_p} kick @Member
➥ ${_p} grouplist
═〘 EXPERIMENTAL 〙 ═
➥ ${_p}jadibot [kode login jika ada / kosongin]
➥ ${_p}berhenti
➥ ${_p}getcode
═〘 OWNER 〙 ═
➥ ${_p}bcgc <teks>
➥ ${_p}setmenu <teks>
➥ ${_p}deletechat (chat grup)
➥ ${_p}deletechat group
➥ ${_p}mutechat (chat grup)
➥ ${_p}mutechat group
═〘 IKLAN 〙 ═
➥ Instagram: intagram.com/akbarsan3
➥ Github: https://github.com/Akbarsans/miray-chan
═〘 Info Bot 〙 ═
➥ Name : Miray-chan
➥ Coded using *Nano* on Android \\w Termux
➥ 
Advanced:
  > return m
═〘 Miray-chan 〙═
`.trim()
    conn.reply(m.chat, {...preview, text}, m)
      }
      _text += footer + '\n'
    }
    _text += after
    text =  typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime: _uptime,
      exp, limit, name, weton, week, date, time,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).join`|`})`, 'g'), (_, name) => replace[name])
    conn.reply(m.chat, text.trim(), m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu','help','?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(date) {
  return ['getHours','getMinutes','getSeconds'].map(method => date[method]().toString().padStart(2, 0)).join`:`
}
