// класс создания иконок svg
// пример:
// const homeIcon = createIcon('home', 32, 'icon-color ')
// app?.append(homeIcon.renderElement())

export class CreateSVG {
  private name: string
  private size: number
  private className: string

  constructor(name: string, size: number = 24, className: string = '') {
    this.name = name
    this.size = size
    this.className = className
  }

  renderElement(): SVGSVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use')

    // Устанавливаем атрибуты
    svg.setAttribute('class', `icon ${this.className}`)
    svg.setAttribute('width', this.size.toString())
    svg.setAttribute('height', this.size.toString())
    svg.setAttribute('aria-hidden', 'true')

    use.setAttribute('href', `#icon-${this.name}`)

    svg.appendChild(use)
    return svg
  }
}

// Фабрика для удобного создания иконок
export function createSVG(name: string, size?: number, className?: string): CreateSVG {
  return new CreateSVG(name, size, className)
}