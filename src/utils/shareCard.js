const WIDTH = 640;
const HEIGHT = 800;

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let current = '';

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Draws today's verse + reflection onto a canvas and resolves with a
 * PNG data URL. Waits for the app's webfonts so text doesn't fall back
 * to a system serif/sans on the first render.
 */
export async function generateShareCard({ dateLabel, verse, reference, reflectionText }) {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d');

  const bgGradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  bgGradient.addColorStop(0, '#141e38');
  bgGradient.addColorStop(1, '#0b111f');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const glow = ctx.createRadialGradient(WIDTH / 2, 90, 10, WIDTH / 2, 90, 320);
  glow.addColorStop(0, 'rgba(201, 154, 83, 0.28)');
  glow.addColorStop(1, 'rgba(201, 154, 83, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const marginX = 56;
  const maxWidth = WIDTH - marginX * 2;
  let y = 80;

  ctx.fillStyle = '#8b96a8';
  ctx.font = '600 15px "IBM Plex Sans", sans-serif';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('DAILY LIGHT JOURNAL', marginX, y);
  ctx.font = '400 15px "IBM Plex Sans", sans-serif';
  const dateWidth = ctx.measureText(dateLabel).width;
  ctx.fillText(dateLabel, WIDTH - marginX - dateWidth, y);

  y += 56;

  ctx.fillStyle = '#efe6d3';
  ctx.font = 'italic 500 28px "Spectral", serif';
  const verseLines = wrapText(ctx, `"${verse}"`, maxWidth);
  for (const line of verseLines) {
    y += 38;
    ctx.fillText(line, marginX, y);
  }

  y += 34;
  ctx.fillStyle = '#c99a53';
  ctx.font = '500 16px "IBM Plex Sans", sans-serif';
  ctx.fillText(reference, marginX, y);

  y += 44;
  ctx.strokeStyle = '#24304f';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(marginX, y);
  ctx.lineTo(WIDTH - marginX, y);
  ctx.stroke();

  y += 44;

  if (reflectionText) {
    ctx.fillStyle = '#c9c2ac';
    ctx.font = '400 19px "Spectral", serif';
    const truncated =
      reflectionText.length > 320 ? `${reflectionText.slice(0, 320)}…` : reflectionText;
    const reflectionLines = wrapText(ctx, truncated, maxWidth);
    const maxLines = 12;
    for (const line of reflectionLines.slice(0, maxLines)) {
      y += 30;
      ctx.fillText(line, marginX, y);
    }
  }

  ctx.fillStyle = '#5b6579';
  ctx.font = '400 13px "IBM Plex Sans", sans-serif';
  ctx.fillText('dailylightjournal', marginX, HEIGHT - 40);

  return canvas.toDataURL('image/png');
}