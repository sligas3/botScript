// index.js
import "dotenv/config";
import { Client, GatewayIntentBits, ChannelType, PermissionsBitField, EmbedBuilder } from "discord.js";
import { sendAnnouncement } from "./sendAnnouncement.js";
import http from "http";
import os from "os";

http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", bot: client.user?.tag ?? "connecting" }));
  } else {
    res.writeHead(404);
    res.end();
  }
}).listen(process.env.PORT ?? 3000);

const {
  DISCORD_TOKEN,
  GUILD_ID,
  ALLOWED_CHANNEL_ID,
  WELCOME_CHANNEL_ID,
  GENERAL_CHANNEL_ID, // 👈 nuevo
} = process.env;

if (!DISCORD_TOKEN || !GUILD_ID || !ALLOWED_CHANNEL_ID) {
  console.error("❌ Faltan variables en .env (DISCORD_TOKEN, GUILD_ID, ALLOWED_CHANNEL_ID)");
  process.exit(1);
}

// ====== Plantilla ======
const TEMPLATE = {
  name: "Equipo de Trabajo",
  description: "Servidor de Discord para organización y colaboración del equipo de trabajo.",
  channels: [
    { category: "📢 Información", channels: ["anuncios", "reglas", "bienvenida"] },
    { category: "💬 Comunicación General", channels: [{ name: "general", hidden: true }, "random", "feedback"] },
    { category: "👨‍💻 Trabajo & Proyectos", channels: ["daily", "proyectos", "tareas", "bugs"] },
    { category: "📚 Recursos", channels: ["documentación", "herramientas", "faq"] },
    { category: "🎙 Reuniones", channels: ["💻 Reunión General", "🔧 Sala Técnica", "☕ Break Room"], type: "voice" },
  ],
  roles: [
    { name: "Administrador", permissions: "all" },
    { name: "Líder de Proyecto", permissions: "manage_projects" },
    { name: "Equipo", permissions: "default" },
    { name: "Nuevo", permissions: "limited" },
  ],
};

// Mapa simple de permisos de ejemplo
const ROLE_PERMISSION_PRESETS = {
  all: new PermissionsBitField([PermissionsBitField.Flags.Administrator]),
  manage_projects: new PermissionsBitField([
    PermissionsBitField.Flags.ManageChannels,
    PermissionsBitField.Flags.ManageMessages,
    PermissionsBitField.Flags.MentionEveryone,
    PermissionsBitField.Flags.ViewAuditLog,
  ]),
  default: new PermissionsBitField([
    PermissionsBitField.Flags.ViewChannel,
    PermissionsBitField.Flags.SendMessages,
    PermissionsBitField.Flags.ReadMessageHistory,
  ]),
  limited: new PermissionsBitField([
    PermissionsBitField.Flags.ViewChannel,
    PermissionsBitField.Flags.ReadMessageHistory,
  ]),
};

// ====== Cliente ======
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // comandos de texto
    GatewayIntentBits.GuildMembers, // 👈 necesario para detectar nuevos miembros
  ],
});

const WELCOME_DEDUP_TTL_MS = 45 * 1000;
const welcomeDedup = new Map();
const MESSAGE_DEDUP_TTL_MS = 15 * 1000;
const processedMessages = new Map();
const BOT_INSTANCE_TAG = process.env.BOT_INSTANCE_TAG ?? `${os.hostname()}#${process.pid}`;

function logResponseOrigin(context) {
  const {
    command,
    message,
    action,
    requested,
    deleted,
    skipped,
    failed,
    dryRun,
  } = context;

  console.log(
    [
      "[BOT RESPONSE]",
      `instance=${BOT_INSTANCE_TAG}`,
      `command=${command}`,
      `action=${action}`,
      `dryRun=${dryRun}`,
      `requested=${requested}`,
      `deleted=${deleted}`,
      `skipped=${skipped}`,
      `failed=${failed}`,
      `guild=${message.guild?.id}`,
      `channel=${message.channel?.id}`,
      `message=${message.id}`,
      `author=${message.author?.id}`,
    ].join(" ")
  );
}

client.once("clientReady", async () => {
  console.log(`✅ Bot conectado como ${client.user.tag} | instance=${BOT_INSTANCE_TAG}`);
});

// ============ Saludo de bienvenida (EMBED) ============
client.on("guildMemberAdd", async (member) => {
  console.log(`[MEMBER JOIN] ${member.user.tag} en ${member.guild.name}`);
  try {
    if (!WELCOME_CHANNEL_ID) return;

    const dedupKey = `${member.guild.id}:${member.id}`;
    if (welcomeDedup.has(dedupKey)) {
      console.log(`[WELCOME] duplicate suppressed for ${member.user.tag}`);
      return;
    }
    welcomeDedup.set(dedupKey, Date.now());
    setTimeout(() => welcomeDedup.delete(dedupKey), WELCOME_DEDUP_TTL_MS);

    const channel = await member.guild.channels.fetch(WELCOME_CHANNEL_ID);
    if (!channel || !channel.isTextBased()) return;

    const embed = new EmbedBuilder()
      .setTitle(`👋 ¡Bienvenido/a, ${member.user.username}!`)
      .setDescription(
        [
          `Nos alegra tenerte en **${member.guild.name}**.`,
          `• Pasa por **#reglas** y **#anuncios**`,
          `• Preséntate si quieres en **#general**`,
          `¡Que la pases genial! 🚀`,
        ].join("\n")
      )
      .setThumbnail(member.user.displayAvatarURL({ size: 256 }))
      .setColor(0x00b5ff) // azul
      .setTimestamp();

    await channel.send({ embeds: [embed] });
  } catch (err) {
    console.error("❌ Error enviando mensaje de bienvenida:", err);
  }
});

// ============ Setup con !setup-plantilla (igual que antes) ============
client.on("messageCreate", async (message) => {
  console.log("[MSG]", message.channel?.name, ":", message.content);
  try {
    if (message.author.bot) return;

    const seenAt = processedMessages.get(message.id);
    if (seenAt && Date.now() - seenAt < MESSAGE_DEDUP_TTL_MS) {
      return;
    }
    processedMessages.set(message.id, Date.now());
    setTimeout(() => processedMessages.delete(message.id), MESSAGE_DEDUP_TTL_MS);

    const unrestrictedCommands = ["!coffee", "!mate"];
    const isUnrestricted = unrestrictedCommands.some((c) => message.content.startsWith(c));

    if (message.guild?.id !== GUILD_ID) return;
    if (!isUnrestricted && message.channel.id !== ALLOWED_CHANNEL_ID) return;

    // ======= Comandos divertidos/productivos =======
    const content = (message.content || "").trim();
    const points = new Map(); // memoria en runtime

    // Parse helper para tiempo tipo "10m", "2h"
    function parseTime(str) {
      const match = str.match(/^(\d+)([smhd])$/);
      if (!match) return null;
      const num = parseInt(match[1], 10);
      const unit = match[2];
      switch (unit) {
        case "s":
          return num * 1000;
        case "m":
          return num * 60 * 1000;
        case "h":
          return num * 60 * 60 * 1000;
        case "d":
          return num * 24 * 60 * 60 * 1000;
        default:
          return null;
      }
    }

    if (message.content.startsWith("!purge")) {
      const args = message.content.split(" ").slice(1);
      const amount = parseInt(args[0]);
      if (isNaN(amount) || amount < 1 || amount > 100)
        return message.reply("🗑️ Uso: `!purge <1-100> [#canal | canal_id]`");
      const channelId = args[1]?.replace(/[<#>]/g, "");
      const target = channelId
        ? await message.guild.channels.fetch(channelId).catch(() => null) ?? message.channel
        : message.mentions.channels.first() ?? message.channel;
      await target.bulkDelete(amount, true);
      const confirm = await message.channel.send(`🗑️ ${amount} mensajes eliminados en ${target}.`);
      setTimeout(() => confirm.delete(), 3000);
      return;
    }

    if (message.content.startsWith("!delete-channel")) {
      const args = message.content.split(/\s+/).slice(1).filter(Boolean);
      const dryRun = args.includes("--dry-run");
      const doConfirm = args.includes("--confirm");

      if (!dryRun && !doConfirm) {
        return message.reply("🧹 Uso: `!delete-channel --dry-run <#canal|canal_id>...` o `!delete-channel --confirm <#canal|canal_id>...`");
      }

      if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
        return message.reply("❌ Necesitas el permiso **ManageChannels** para usar este comando.");
      }

      const botMember = message.guild.members.me;
      if (!botMember?.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
        return message.reply("❌ No tengo permiso **ManageChannels** para eliminar canales.");
      }

      const rawTargets = args.filter((a) => a !== "--dry-run" && a !== "--confirm");
      if (rawTargets.length === 0) {
        return message.reply("⚠️ Debes indicar al menos un canal por mención o ID.");
      }

      const protectedIds = new Set(
        [
          ALLOWED_CHANNEL_ID,
          WELCOME_CHANNEL_ID,
          GENERAL_CHANNEL_ID,
          process.env.ANNOUNCEMENTS_CHANNEL_ID,
          message.channel.id,
        ].filter(Boolean)
      );

      const idPattern = /^\d{17,20}$/;
      const targetIds = new Set();

      for (const ch of message.mentions.channels.values()) {
        if (ch.guildId === message.guild.id) {
          targetIds.add(ch.id);
        }
      }

      for (const token of rawTargets) {
        const cleaned = token.replace(/[<#>]/g, "");
        if (idPattern.test(cleaned)) {
          targetIds.add(cleaned);
        }
      }

      if (targetIds.size === 0) {
        return message.reply("⚠️ No detecté canales válidos. Usa mención (#canal) o ID.");
      }

      const results = {
        requested: targetIds.size,
        deleted: [],
        skipped: [],
        failed: [],
      };

      for (const channelId of targetIds) {
        if (protectedIds.has(channelId)) {
          results.skipped.push(`${channelId} (protegido)`);
          continue;
        }

        const channel = await message.guild.channels.fetch(channelId).catch(() => null);
        if (!channel) {
          results.skipped.push(`${channelId} (no encontrado)`);
          continue;
        }

        if (channel.guildId !== message.guild.id) {
          results.skipped.push(`${channelId} (otro servidor)`);
          continue;
        }

        const canDeleteType = channel.type === ChannelType.GuildText || channel.type === ChannelType.GuildVoice;
        if (!canDeleteType) {
          results.skipped.push(`${channel.name} (${channel.id}) (tipo no permitido)`);
          continue;
        }

        if (dryRun) {
          results.skipped.push(`${channel.name} (${channel.id}) (dry-run)`);
          continue;
        }

        try {
          await channel.delete(`Eliminado por comando !delete-channel de ${message.author.tag}`);
          results.deleted.push(`${channel.name} (${channelId})`);
        } catch (err) {
          results.failed.push(`${channel.name} (${channelId}): ${err.message ?? err}`);
        }
      }

      const lines = [
        `🧹 Resultado de !delete-channel (${dryRun ? "DRY RUN" : "EJECUCION"})`,
        `Solicitados: ${results.requested}`,
        `Eliminados: ${results.deleted.length}`,
        `Omitidos: ${results.skipped.length}`,
        `Fallidos: ${results.failed.length}`,
      ];

      if (results.deleted.length) {
        lines.push("", "✅ Eliminados:", ...results.deleted.map((x) => `- ${x}`));
      }
      if (results.skipped.length) {
        lines.push("", "⏭️ Omitidos:", ...results.skipped.map((x) => `- ${x}`));
      }
      if (results.failed.length) {
        lines.push("", "❌ Fallidos:", ...results.failed.map((x) => `- ${x}`));
      }

      await message.channel.send("```\n" + lines.join("\n") + "\n```");
      logResponseOrigin({
        command: "!delete-channel",
        message,
        action: doConfirm ? "delete" : "dry-run",
        requested: results.requested,
        deleted: results.deleted.length,
        skipped: results.skipped.length,
        failed: results.failed.length,
        dryRun,
      });
      return;
    }

    if (message.content.startsWith("!delete-category")) {
      const args = message.content.split(/\s+/).slice(1).filter(Boolean);
      const dryRun = args.includes("--dry-run");
      const doConfirm = args.includes("--confirm");

      if (!dryRun && !doConfirm) {
        return message.reply("🧹 Uso: `!delete-category --dry-run <#categoria|categoria_id>...` o `!delete-category --confirm <#categoria|categoria_id>...`");
      }

      if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
        return message.reply("❌ Necesitas el permiso **ManageChannels** para usar este comando.");
      }

      const botMember = message.guild.members.me;
      if (!botMember?.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
        return message.reply("❌ No tengo permiso **ManageChannels** para eliminar categorías.");
      }

      const rawTargets = args.filter((a) => a !== "--dry-run" && a !== "--confirm");
      if (rawTargets.length === 0) {
        return message.reply("⚠️ Debes indicar al menos una categoría por mención o ID.");
      }

      const protectedChannelIds = new Set(
        [
          ALLOWED_CHANNEL_ID,
          WELCOME_CHANNEL_ID,
          GENERAL_CHANNEL_ID,
          process.env.ANNOUNCEMENTS_CHANNEL_ID,
          message.channel.id,
        ].filter(Boolean)
      );

      const idPattern = /^\d{17,20}$/;
      const targetIds = new Set();

      for (const ch of message.mentions.channels.values()) {
        if (ch.guildId === message.guild.id) {
          targetIds.add(ch.id);
        }
      }

      for (const token of rawTargets) {
        const cleaned = token.replace(/[<#>]/g, "");
        if (idPattern.test(cleaned)) {
          targetIds.add(cleaned);
        }
      }

      if (targetIds.size === 0) {
        return message.reply("⚠️ No detecté categorías válidas. Usa mención o ID.");
      }

      const results = {
        requested: targetIds.size,
        deleted: [],
        skipped: [],
        failed: [],
      };

      for (const categoryId of targetIds) {
        const category = await message.guild.channels.fetch(categoryId).catch(() => null);
        if (!category) {
          results.skipped.push(`${categoryId} (no encontrada)`);
          continue;
        }

        if (category.guildId !== message.guild.id) {
          results.skipped.push(`${categoryId} (otro servidor)`);
          continue;
        }

        if (category.type !== ChannelType.GuildCategory) {
          results.skipped.push(`${category.name} (${category.id}) (no es categoría)`);
          continue;
        }

        const children = message.guild.channels.cache.filter((c) => c.parentId === category.id);
        const hasProtectedChild = children.some((c) => protectedChannelIds.has(c.id));
        if (hasProtectedChild) {
          results.skipped.push(`${category.name} (${category.id}) (contiene canal protegido)`);
          continue;
        }

        if (dryRun) {
          results.skipped.push(`${category.name} (${category.id}) (dry-run, hijos: ${children.size})`);
          continue;
        }

        try {
          await category.delete(`Eliminada por comando !delete-category de ${message.author.tag}`);
          results.deleted.push(`${category.name} (${category.id})`);
        } catch (err) {
          results.failed.push(`${category.name} (${category.id}): ${err.message ?? err}`);
        }
      }

      const lines = [
        `🧹 Resultado de !delete-category (${dryRun ? "DRY RUN" : "EJECUCION"})`,
        `Solicitadas: ${results.requested}`,
        `Eliminadas: ${results.deleted.length}`,
        `Omitidas: ${results.skipped.length}`,
        `Fallidas: ${results.failed.length}`,
      ];

      if (results.deleted.length) {
        lines.push("", "✅ Eliminadas:", ...results.deleted.map((x) => `- ${x}`));
      }
      if (results.skipped.length) {
        lines.push("", "⏭️ Omitidas:", ...results.skipped.map((x) => `- ${x}`));
      }
      if (results.failed.length) {
        lines.push("", "❌ Fallidas:", ...results.failed.map((x) => `- ${x}`));
      }

      await message.channel.send("```\n" + lines.join("\n") + "\n```");
      logResponseOrigin({
        command: "!delete-category",
        message,
        action: doConfirm ? "delete" : "dry-run",
        requested: results.requested,
        deleted: results.deleted.length,
        skipped: results.skipped.length,
        failed: results.failed.length,
        dryRun,
      });
      return;
    }

    if (message.content.startsWith("!reminder")) {
      const args = message.content.split(" ").slice(1);
      const timeStr = args.shift();
      const text = args.join(" ");
      const ms = parseTime(timeStr);
      if (!ms || !text) {
        return message.reply("⏰ Uso: `!reminder <10m|2h|1d> <mensaje>`");
      }
      message.reply(`✅ Recordatorio programado en ${timeStr}: *${text}*`);
      setTimeout(async () => {
        const payload = `🔔 **Recordatorio:** ${text}  • solicitado por ${message.author}`;
        // Intenta anunciar en #anuncios
        const announced = await sendAnnouncement(message.guild, payload);
        // Si no hay canal de anuncios o falló, usa el canal actual
        if (!announced) {
          await message.channel.send(payload);
        }
      }, ms);
    }

    if (message.content.startsWith("!poll")) {
      const regex = /"(.+)"\s(.+)/;
      const match = message.content.match(regex);
      if (!match) {
        return message.reply('📊 Uso: `!poll "Pregunta" opción1|opción2|...`');
      }
      const question = match[1];
      const options = match[2].split("|");
      if (options.length > 10) return message.reply("Máx 10 opciones");
      let pollText = `📊 **${question}**\n\n`;
      const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
      options.forEach((opt, i) => {
        pollText += `${emojis[i]} ${opt}\n`;
      });
      message.channel.send(pollText).then(async (pollMsg) => {
        for (let i = 0; i < options.length; i++) {
          await pollMsg.react(emojis[i]);
        }
      });
    }

    if (content.startsWith("!coffee") || content.startsWith("¡coffee")) {
      const gifs = [
        "https://media.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif", // Baby Groot bailando
        "https://media.giphy.com/media/3o6ZsWn1jX4kIhKqNa/giphy.gif", // Groot tomando café
        "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif", // Groot feliz
        "https://media.giphy.com/media/xUOwGkoxibHd7yU0Rq/giphy.gif", // Groot cute
      ];
      const gif = gifs[Math.floor(Math.random() * gifs.length)];

      try {
        const generalId = GENERAL_CHANNEL_ID;
        if (!generalId) {
          return message.reply("⚠️ Falta configurar GENERAL_CHANNEL_ID en .env");
        }

        // Detectar si hay una mención
        const target = message.mentions.users.first();
        const recipient = target ? `${target}` : `${message.author}`;

        const generalChannel = await message.guild.channels.fetch(generalId);
        if (generalChannel?.isTextBased()) {
          await generalChannel.send(`☕ ${message.author} le dio un café a ${recipient}! 🌱\n${gif}`);
        } else {
          await message.reply("⚠️ No encontré el canal #general");
        }
      } catch (err) {
        console.error("Error enviando café:", err);
        await message.reply("❌ No pude mandar tu café al canal general.");
      }
      return;
    }

    if (content.startsWith("!mate") || content.startsWith("¡mate")) {
      const gifs = [
        "https://media.giphy.com/media/3o7TKtnuHOHHUjR38Y/giphy.gif",
        "https://media.giphy.com/media/l0MYyDa8xO8G6Uuuk/giphy.gif",
        "https://media.giphy.com/media/26n6WywJyh39n1pBu/giphy.gif",
        "https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif",
      ];
      const gif = gifs[Math.floor(Math.random() * gifs.length)];

      try {
        const generalId = process.env.GENERAL_CHANNEL_ID;
        if (!generalId) {
          return message.reply("⚠️ Falta configurar GENERAL_CHANNEL_ID en .env");
        }

        // Detectar si hay una mención
        const target = message.mentions.users.first();
        const recipient = target ? `${target}` : `${message.author}`;

        const generalChannel = await message.guild.channels.fetch(generalId);
        if (generalChannel?.isTextBased()) {
          await generalChannel.send(`🧉 ${message.author} compartió un mate con ${recipient}! 💚\n${gif}`);
        } else {
          await message.reply("⚠️ No encontré el canal #general");
        }
      } catch (err) {
        console.error("Error enviando mate:", err);
        await message.reply("❌ No pude mandar tu mate al canal general.");
      }
      return;
    }

    if (message.content.startsWith("!done")) {
      const task = message.content.split(" ").slice(1).join(" ");
      if (!task) return message.reply("✅ Uso: `!done <tarea>`");
      const userId = message.author.id;
      const current = points.get(userId) || 0;
      points.set(userId, current + 1);
      message.channel.send(`🎉 ${message.author} completó: *${task}* (+1 punto). Total: ${points.get(userId)} puntos`);
    }

    if (message.content === "!leaderboard") {
      if (points.size === 0) return message.reply("🏆 Aún no hay puntos registrados.");
      const sorted = [...points.entries()].sort((a, b) => b[1] - a[1]);
      let text = "🏆 **Leaderboard** 🏆\n";
      sorted.forEach(([uid, pts], i) => {
        const user = message.guild.members.cache.get(uid)?.user.username || "Usuario";
        text += `${i + 1}. ${user}: ${pts} puntos\n`;
      });
      message.channel.send(text);
    }
    /////////PLANTILLA////////////

    if (!message.content.startsWith("!setup-plantilla")) return;

    const args = message.content.split(" ").slice(1);
    const dryRun = args.includes("--dry-run");

    const guild = await client.guilds.fetch(GUILD_ID);
    await guild.channels.fetch();
    await guild.roles.fetch();

    const report = [];

    const ensureCategory = async (name) => {
      const existing = guild.channels.cache.find((c) => c.type === ChannelType.GuildCategory && c.name === name);
      if (existing) {
        report.push(`= Categoría existe: ${name}`);
        return existing;
      }
      if (dryRun) {
        report.push(`+ Crear categoría: ${name}`);
        return null;
      }
      const created = await guild.channels.create({
        name,
        type: ChannelType.GuildCategory,
        reason: "Setup plantilla",
      });
      report.push(`+ Creada categoría: ${name}`);
      return created;
    };

    const ensureTextChannel = async (name, parent, hidden = false) => {
      const existing = guild.channels.cache.find(
        (c) => c.type === ChannelType.GuildText && c.name === name && c.parentId === parent?.id
      );
      if (existing) {
        report.push(`  - Canal texto existe: #${name}`);
        return existing;
      }
      if (dryRun) {
        report.push(`  + Crear canal texto: #${name}${hidden ? " (oculto)" : ""}`);
        return null;
      }
      const permissionOverwrites = hidden
        ? [
            { id: guild.roles.everyone.id, deny: [PermissionsBitField.Flags.ViewChannel] },
            { id: guild.members.me.id, allow: [PermissionsBitField.Flags.ViewChannel] },
          ]
        : [];
      const created = await guild.channels.create({
        name,
        type: ChannelType.GuildText,
        parent: parent?.id,
        permissionOverwrites,
        reason: "Setup plantilla",
      });
      report.push(`  + Creado canal texto: #${name}${hidden ? " (oculto)" : ""}`);
      return created;
    };

    const ensureVoiceChannel = async (name, parent) => {
      const existing = guild.channels.cache.find(
        (c) => c.type === ChannelType.GuildVoice && c.name === name && c.parentId === parent?.id
      );
      if (existing) {
        report.push(`  - Canal voz existe: 🔊 ${name}`);
        return existing;
      }
      if (dryRun) {
        report.push(`  + Crear canal voz: 🔊 ${name}`);
        return null;
      }
      const created = await guild.channels.create({
        name,
        type: ChannelType.GuildVoice,
        parent: parent?.id,
        reason: "Setup plantilla",
      });
      report.push(`  + Creado canal voz: 🔊 ${name}`);
      return created;
    };

    const ensureRole = async ({ name, permissions }) => {
      const existing = guild.roles.cache.find((r) => r.name === name);
      if (existing) {
        report.push(`= Rol existe: @${name}`);
        return existing;
      }
      const perms = ROLE_PERMISSION_PRESETS[permissions] ?? ROLE_PERMISSION_PRESETS.default;

      if (dryRun) {
        report.push(`+ Crear rol: @${name} (preset: ${permissions})`);
        return null;
      }
      const created = await guild.roles.create({
        name,
        permissions: perms,
        reason: "Setup plantilla",
      });
      report.push(`+ Creado rol: @${name}`);
      return created;
    };

    report.push(`Iniciando ${dryRun ? "[DRY RUN]" : "creación"} de estructura…`);

    // Roles
    report.push("> Roles:");
    for (const roleDef of TEMPLATE.roles) {
      await ensureRole(roleDef);
    }

    // Categorías y canales
    report.push("> Categorías y canales:");
    for (const group of TEMPLATE.channels) {
      const parent = await ensureCategory(group.category);

      const isVoice = group.type === "voice";
      for (const ch of group.channels) {
        if (isVoice) {
          await ensureVoiceChannel(ch, parent);
        } else {
          const name = typeof ch === "string" ? ch : ch.name;
          const hidden = typeof ch === "object" && ch.hidden === true;
          await ensureTextChannel(name, parent, hidden);
        }
      }
    }

    // Resumen
    await message.channel.send("```\n" + report.join("\n") + "\n```");

    if (!dryRun) {
      await message.channel.send("✅ Listo. Estructura creada/actualizada.");
    } else {
      await message.channel.send("🧪 DRY RUN finalizado. Nada fue creado, solo se mostró el plan.");
    }
  } catch (err) {
    console.error(err);
    try {
      await message.channel.send(`❌ Error: ${err.message ?? err}`);
    } catch {}
  }
});

client.login(DISCORD_TOKEN);
