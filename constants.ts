import { StyleOption, GenerationSettings } from './types';

export const DEFAULT_SETTINGS: GenerationSettings = {
  styleStrength: 75,
  preserveColor: true,
  dreamyBackground: false,
};

export const STYLES: StyleOption[] = [
  {
    id: 'pixar',
    name: '3D Animation',
    name_zh: '3D 动画',
    description: 'Cute, round 3D character style like a Pixar movie.',
    description_zh: '可爱圆润的3D角色风格，像皮克斯电影一样。',
    promptModifier: 'in the style of a high-quality 3D animated movie character, Pixar style, cute, big eyes, soft lighting, 3d render',
    previewColor: 'bg-blue-500',
    icon: '🎬'
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    name_zh: '水彩画',
    description: 'Soft, artistic watercolor painting with texture.',
    description_zh: '柔和、充满艺术感的水彩质感。',
    promptModifier: 'watercolor painting, soft artistic strokes, paper texture, wet-on-wet technique, dreamy, pastel colors',
    previewColor: 'bg-pink-400',
    icon: '🎨'
  },
  {
    id: 'anime',
    name: 'Anime',
    name_zh: '日系动漫',
    description: 'Japanese animation style with vibrant colors.',
    description_zh: '色彩鲜艳的日式动画风格。',
    promptModifier: 'anime style, Japanese animation, vibrant colors, clean lines, detailed eyes, studio ghibli vibe',
    previewColor: 'bg-red-500',
    icon: '🦊'
  },
  {
    id: 'oil_painting',
    name: 'Oil Painting',
    name_zh: '经典油画',
    description: 'Classic textured oil painting on canvas.',
    description_zh: '画布上经典的厚涂油画质感。',
    promptModifier: 'oil painting on canvas, textured brushstrokes, classical art, detailed, masterpiece, rich colors',
    previewColor: 'bg-yellow-600',
    icon: '🖼️'
  },
  {
    id: 'pixel_art',
    name: 'Pixel Art',
    name_zh: '像素艺术',
    description: 'Retro 8-bit or 16-bit game aesthetic.',
    description_zh: '复古的8位或16位游戏像素风格。',
    promptModifier: 'pixel art, 16-bit game sprite, retro aesthetic, blocky details, limited color palette',
    previewColor: 'bg-green-500',
    icon: '👾'
  },
  {
    id: 'plush_toy',
    name: 'Plush Toy',
    name_zh: '毛绒玩具',
    description: 'Transform your pet into a soft, fuzzy stuffed animal.',
    description_zh: '把你的宠物变成毛茸茸的填充玩偶。',
    promptModifier: 'soft felt plush toy, stuffed animal, fuzzy texture, stitching details, adorable, cute',
    previewColor: 'bg-orange-400',
    icon: '🧸'
  },
  {
    id: 'cyberpunk',
    name: 'Neon Cyberpunk',
    name_zh: '霓虹赛博',
    description: 'Futuristic glowing neon lights and dark vibes.',
    description_zh: '充满未来感的发光霓虹灯和暗黑氛围。',
    promptModifier: 'cyberpunk style, neon lights, futuristic city background, glowing outlines, synthwave, vibrant purple and blue',
    previewColor: 'bg-violet-600',
    icon: '🌃'
  },
  {
    id: 'sketch',
    name: 'Pencil Sketch',
    name_zh: '素描',
    description: 'Hand-drawn pencil sketch on paper.',
    description_zh: '纸上的手绘铅笔素描。',
    promptModifier: 'pencil sketch, hand-drawn, graphite on paper, hatching, rough lines, artistic monochrome',
    previewColor: 'bg-gray-400',
    icon: '✏️'
  },
  {
    id: 'sticker',
    name: 'Pop Art Sticker',
    name_zh: '波普贴纸',
    description: 'Bold outline sticker with flat colors.',
    description_zh: '大胆轮廓和扁平色彩的波普艺术贴纸。',
    promptModifier: 'die-cut sticker, thick white border, vector art, pop art, flat colors, bold lines, simple background',
    previewColor: 'bg-indigo-500',
    icon: '🏷️'
  }
];

export const TRANSLATIONS = {
  en: {
    title: "Pet Style Gen",
    startOver: "Start Over",
    heroTitle: "Turn your Pet into a",
    heroHighlight: "Masterpiece",
    heroDesc: "Upload a photo of your dog, cat, or hamster and let our AI transform them into Pixar characters, oil paintings, and more.",
    uploadTitle: "Upload your Pet's Photo",
    dragDrop: "Drag & drop or click to browse",
    gallery: "Gallery",
    camera: "Camera",
    formats: "Supported formats: PNG, JPG, WebP up to 5MB",
    originalImage: "Original Image",
    step1: "Choose a Style",
    step2: "Customize",
    styleIntensity: "Style Intensity",
    subtle: "Subtle",
    balanced: "Balanced",
    intense: "Intense",
    preserveColor: "Preserve Original Colors",
    preserveColorDesc: "Keep your pet's fur pattern colors",
    dreamyBg: "Dreamy Background",
    dreamyBgDesc: "Generate a matching fantasy background",
    generate: "Generate Masterpiece",
    selectStyleFirst: "Please select a style first",
    generating: "Creating Magic",
    resultTitle: "Here is your",
    resultPet: "Pet!",
    adjust: "Adjust Settings",
    share: "Share",
    download: "Download",
    compareOriginal: "Original",
    compareStylized: "Stylized",
    dragSlider: "Drag the slider to compare before and after",
    uploadAnother: "Upload Another Photo",
    errorImage: "Please upload an image file (JPEG, PNG, WebP).",
    errorSize: "Image size should be less than 5MB.",
    errorGen: "Failed to generate image. Please try again.",
    loadingMessages: [
      "Teaching the AI how to paint...",
      "Mixing digital colors...",
      "Finding the perfect brush...",
      "Observing your pet's cuteness...",
      "Applying artistic filters...",
      "Almost there, adding finishing touches..."
    ]
  },
  zh: {
    title: "宠物风格生成器",
    startOver: "重新开始",
    heroTitle: "将您的爱宠变成",
    heroHighlight: "艺术杰作",
    heroDesc: "上传您的猫狗或萌宠照片，让 AI 将它们变身为皮克斯动画角色、油画艺术品等多种风格。",
    uploadTitle: "上传宠物照片",
    dragDrop: "拖放或点击浏览",
    gallery: "图库",
    camera: "相机",
    formats: "支持格式：PNG, JPG, WebP (最大 5MB)",
    originalImage: "原始照片",
    step1: "选择风格",
    step2: "个性化设置",
    styleIntensity: "风格强度",
    subtle: "微妙",
    balanced: "平衡",
    intense: "强烈",
    preserveColor: "保留原始毛色",
    preserveColorDesc: "尽可能保留宠物原本的毛色花纹",
    dreamyBg: "梦幻背景",
    dreamyBgDesc: "生成相匹配的奇幻风格背景",
    generate: "生成艺术照",
    selectStyleFirst: "请先选择一种风格",
    generating: "正在施展魔法",
    resultTitle: "这是您的",
    resultPet: "风格宠物！",
    adjust: "调整设置",
    share: "分享",
    download: "下载",
    compareOriginal: "原图",
    compareStylized: "效果图",
    dragSlider: "拖动滑块对比前后效果",
    uploadAnother: "上传另一张",
    errorImage: "请上传图片文件 (JPEG, PNG, WebP)。",
    errorSize: "图片大小不能超过 5MB。",
    errorGen: "生成失败，请重试。",
    loadingMessages: [
      "正在教 AI 如何绘画...",
      "正在调配数字颜料...",
      "正在寻找完美的画笔...",
      "正在观察您宠物的萌点...",
      "正在应用艺术滤镜...",
      "马上就好，正在进行最后的修饰..."
    ]
  }
};

export const LOADING_MESSAGES = TRANSLATIONS.en.loadingMessages;