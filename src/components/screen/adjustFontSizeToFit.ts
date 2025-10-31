import { resultElement, screenElement } from '../../constants/constants';


export function adjustFontSizeToFit(text:string) {

  if (!resultElement || !screenElement) return;

  // Скрываем текст во время расчёта
  resultElement.style.opacity = '0';
  resultElement.innerText = text;

  // Параметры
  const initialFontSizeRem = 5;
  const minFontSizeRem = 1;
  const stepRem = -0.1;

  let currentFontSizeRem = initialFontSizeRem;
  const computedStyle = getComputedStyle(resultElement);

  const spanStyleCss = `
    font-family: ${computedStyle.fontFamily};
    font-weight: ${computedStyle.fontWeight};
    white-space: ${computedStyle.whiteSpace};
    display: inline-block;
  `;

  // Initial check
  let tempSpan = document.createElement('span');
  tempSpan.style.cssText = `${spanStyleCss} font-size: ${initialFontSizeRem}rem;`;
  tempSpan.innerText = text;
  screenElement.appendChild(tempSpan);
  const maxTextWidth = tempSpan.scrollWidth;
  const maxTextHeight = tempSpan.scrollHeight;
  screenElement.removeChild(tempSpan);

  if (maxTextWidth <= screenElement.clientWidth && maxTextHeight <= screenElement.clientHeight) {
    currentFontSizeRem = initialFontSizeRem;
  } else {
    while (currentFontSizeRem > minFontSizeRem) {
      tempSpan = document.createElement('span');
      tempSpan.style.cssText = `${spanStyleCss} font-size: ${currentFontSizeRem}rem;`;
      tempSpan.innerText = text;
      screenElement.appendChild(tempSpan);
      const textWidth = tempSpan.scrollWidth;
      const textHeight = tempSpan.scrollHeight;
      screenElement.removeChild(tempSpan);

      if (textWidth <= screenElement.clientWidth && textHeight <= screenElement.clientHeight) break;
      currentFontSizeRem = Math.max(currentFontSizeRem + stepRem, minFontSizeRem);
    }
  }

  // Временно отключаем transition, чтобы избежать плавного уменьшения/переноса (моментальное применение)
  const originalTransition = resultElement.style.transition; // Сохраняем оригинальный transition из CSS
  resultElement.style.transition = 'none'; // Отключаем для мгновенного изменения

  // Применяем финальный размер моментально
  resultElement.style.fontSize = `${currentFontSizeRem}rem`;

  // Немного ждём (чтобы браузер применил изменения без transition), затем возвращаем transition и показываем текст
  setTimeout(() => {
    resultElement.style.transition = originalTransition || ''; // Восстанавливаем (если был, или дефолтный)
    resultElement.style.opacity = '1'; // Показываем текст
  }, 10); // Маленькая задержка для синхронизации

}

