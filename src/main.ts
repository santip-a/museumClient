import './styles.css'

// Импортируем SVG иконки
import './assets/icons/home.svg'
import './assets/icons/user.svg'
import './assets/icons/search.svg'

// Импортируем компонент иконки
import { createSVG } from './components/createSVG/createSVG'





const app = document.querySelector<HTMLDivElement>('#app')

// Создаем иконки
const homeIcon = createSVG('home', 32, 'icon-color ')
const userIcon = createSVG('user', 24, 'text-green-500')
const searchIcon = createSVG('search', 24, 'text-red-500')

// Вставляем иконки
app?.append(homeIcon.renderElement())
app?.append(userIcon.renderElement())
app?.append(searchIcon.renderElement())


