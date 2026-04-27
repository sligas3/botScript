// Helper para anuncios centralizados
export async function sendAnnouncement(guild, content) {
  try {
    const channelId = process.env.ANNOUNCEMENTS_CHANNEL_ID;
    if (!channelId) return null;
    const ch = await guild.channels.fetch(channelId);
    if (ch?.isTextBased()) {
      return ch.send(content);
    }
  } catch (e) {
    console.error('Error enviando anuncio:', e);
  }
  return null;
}