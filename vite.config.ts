import { defineConfig } from 'vite';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

export default defineConfig({
  plugins: [
    createSvgSpritePlugin({
      // Режим для vanilla JS/TS: возвращает symbolId как строку
      exportType: 'vanilla',
      // Глоб для включения файлов (опционально, по умолчанию все SVG)
      include: '**/icons/*.svg',  // Путь к вашим SVG-иконкам
      // Другие опции (опционально):
      // symbolId: 'icon-[name]',  // Шаблон ID символа (по умолчанию [dir]-[name])
    }),
  ],
});