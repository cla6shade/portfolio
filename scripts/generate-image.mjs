import sharp from 'sharp';
import { formatRgb } from 'culori';
import { join } from 'path';

const colors = {
  // 기존 팔레트
  sandyBrown: { mode: 'oklch', l: 0.756, c: 0.117, h: 57.5 },
  peach: { mode: 'oklch', l: 0.903, c: 0.079, h: 68.8 },
  cream: { mode: 'oklch', l: 0.978, c: 0.027, h: 88.5 },
  peachPuff: { mode: 'oklch', l: 0.909, c: 0.088, h: 65.2 },
  peru: { mode: 'oklch', l: 0.649, c: 0.113, h: 59.4 },
  lightPeru: { mode: 'oklch', l: 0.725, c: 0.188, h: 50.356 },

  // 밝은 계열 추가 색상
  ivory: { mode: 'oklch', l: 0.96, c: 0.035, h: 75 },
  lightApricot: { mode: 'oklch', l: 0.92, c: 0.095, h: 62 },
  palePeach: { mode: 'oklch', l: 0.94, c: 0.065, h: 70 },
  warmWhite: { mode: 'oklch', l: 0.985, c: 0.015, h: 80 },

  // 어두운 계열 추가 색상
  terracotta: { mode: 'oklch', l: 0.58, c: 0.14, h: 55 },
  deepBrown: { mode: 'oklch', l: 0.52, c: 0.095, h: 52 },
  warmSienna: { mode: 'oklch', l: 0.62, c: 0.125, h: 58 },
  darkAmber: { mode: 'oklch', l: 0.68, c: 0.135, h: 60 },
};

const gradientVariants = {
  // 밝은 계열 그래디언트 - 모두 L: 0.92-0.98 범위로 통일
  'soft-ivory': {
    colors: [colors.warmWhite, colors.ivory, colors.cream],
    stops: ['0%', '50%', '100%'],
    direction: { x1: '0%', y1: '0%', x2: '100%', y2: '100%' },
    textColor: colors.warmSienna,
  },
  'peachy-cream': {
    colors: [colors.lightApricot, colors.palePeach, colors.ivory],
    stops: ['0%', '50%', '100%'],
    direction: { x1: '0%', y1: '50%', x2: '100%', y2: '50%' },
    textColor: colors.deepBrown,
  },
  'light-blush': {
    colors: [colors.palePeach, colors.peachPuff, colors.lightApricot],
    stops: ['0%', '50%', '100%'],
    direction: { x1: '30%', y1: '0%', x2: '70%', y2: '100%' },
    textColor: colors.deepBrown,
  },
  'dreamy-peach': {
    colors: [colors.ivory, colors.cream, colors.warmWhite],
    stops: ['0%', '50%', '100%'],
    direction: { x1: '50%', y1: '0%', x2: '50%', y2: '100%' },
    textColor: colors.deepBrown,
  },

  // 어두운 계열 그래디언트 - 모두 L: 0.52-0.68 범위로 통일
  'deep-earth': {
    colors: [colors.deepBrown, colors.warmSienna, colors.terracotta],
    stops: ['0%', '50%', '100%'],
    direction: { x1: '0%', y1: '0%', x2: '100%', y2: '100%' },
    textColor: colors.cream,
  },
  'sunset-amber': {
    colors: [colors.terracotta, colors.warmSienna, colors.darkAmber],
    stops: ['0%', '50%', '100%'],
    direction: { x1: '0%', y1: '50%', x2: '100%', y2: '50%' },
    textColor: colors.warmWhite,
  },
  'warm-clay': {
    colors: [colors.peru, colors.warmSienna, colors.darkAmber],
    stops: ['0%', '50%', '100%'],
    direction: { x1: '100%', y1: '0%', x2: '0%', y2: '100%' },
    textColor: colors.warmWhite,
  },
};

function oklchToRgb(color) {
  return formatRgb(color);
}

function getRandomVariant() {
  const variantNames = Object.keys(gradientVariants);
  return variantNames[Math.floor(Math.random() * variantNames.length)];
}

function generateSVG(text, subtitle, gradientConfig) {
  const { colors: gradientColors, stops, direction, textColor: textColorObj } = gradientConfig;

  const textColor = oklchToRgb(textColorObj);
  const textColorLightness = textColorObj.l;
  const shadowColor = textColorLightness > 0.7 ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)';

  const gradientStops = gradientColors
    .map((color, index) => {
      const rgb = oklchToRgb(color);
      const stop = stops[index];
      return `<stop offset="${stop}" style="stop-color:${rgb};stop-opacity:1" />`;
    })
    .join('\n          ');

  const hasSubtitle = subtitle && subtitle.trim().length > 0;
  const titleY = hasSubtitle ? '45%' : '50%';
  const subtitleY = '58%';

  const width = 2400;
  const height = 1260;
  const titleFontSize = 144;
  const subtitleFontSize = 72;
  const titleShadow = '0 8px 24px';
  const subtitleShadow = '0 4px 16px';

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700&amp;display=swap');
        </style>
        <linearGradient id="grad" x1="${direction.x1}" y1="${direction.y1}" x2="${direction.x2}" y2="${direction.y2}">
          ${gradientStops}
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)" />
      <text
        x="50%"
        y="${titleY}"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="'Noto Serif KR', serif"
        font-size="${titleFontSize}"
        font-weight="700"
        fill="${textColor}"
        style="text-shadow: ${titleShadow} ${shadowColor};"
      >${text}</text>
      ${
        hasSubtitle
          ? `<text
        x="50%"
        y="${subtitleY}"
        dominant-baseline="middle"
        text-anchor="middle"
        font-family="'Noto Serif KR', serif"
        font-size="${subtitleFontSize}"
        font-weight="400"
        fill="${textColor}"
        style="text-shadow: ${subtitleShadow} ${shadowColor}; opacity: 0.85;"
      >${subtitle}</text>`
          : ''
      }
    </svg>
  `.trim();
}

async function generateImage(text, subtitle, outputPath, gradientConfig, variantName) {
  const svg = generateSVG(text, subtitle, gradientConfig);
  const buffer = Buffer.from(svg);

  await sharp(buffer)
    // .resize(1200, 630, {
    //   kernel: 'lanczos3',
    //   fit: 'contain',
    // })
    .webp({
      quality: 100,
      lossless: false,
      nearLossless: false,
      smartSubsample: true,
    })
    .toFile(outputPath);

  console.log(`Thumbnail created: ${outputPath}`);
  console.log(`Gradient variant: ${variantName}`);
}

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage: node scripts/generate-image.mjs "Title" [subtitle] [variant] [slug]');
  console.error('');
  console.error('Available variants:');
  Object.keys(gradientVariants).forEach((name) => {
    console.error(`  - ${name}`);
  });
  console.error('');
  console.error('Examples:');
  console.error('  node scripts/generate-image.mjs "Hello World"');
  console.error('  node scripts/generate-image.mjs "Hello World" "Subtitle here"');
  console.error('  node scripts/generate-image.mjs "Hello World" "Subtitle" warm-sunset');
  console.error(
    '  node scripts/generate-image.mjs "Hello World" "Subtitle" warm-sunset my-post-slug',
  );
  console.error('  node scripts/generate-image.mjs "Hello World" warm-sunset my-post-slug');
  process.exit(1);
}

const text = args[0];
let subtitle = '';
let variant = null;
let slug = null;

if (args.length === 1) {
  variant = getRandomVariant();
} else if (args.length === 2) {
  if (gradientVariants[args[1]]) {
    variant = args[1];
  } else {
    slug = args[1];
  }
} else if (args.length === 3) {
  if (gradientVariants[args[1]]) {
    variant = args[1];
    slug = args[2];
  } else if (gradientVariants[args[2]]) {
    subtitle = args[1];
    variant = args[2];
  } else {
    subtitle = args[1];
    slug = args[2];
  }
} else {
  subtitle = args[1];
  variant = args[2];
  slug = args[3];
}

if (!variant) {
  variant = getRandomVariant();
}

let outputPath;
if (slug) {
  outputPath = join(process.cwd(), 'src', 'contents', slug, 'thumbnail.webp');
} else {
  outputPath = join(process.cwd(), 'public', `thumbnail-${Date.now()}.webp`);
}

const gradientConfig = gradientVariants[variant];
await generateImage(text, subtitle, outputPath, gradientConfig, variant);
