'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Settings, Sun, Moon, Sparkles, Clock, TrendingUp, Image, Palette, Type, Download, Heart, Star, Zap, Mic, MicOff, Globe, X, ChevronRight, Layers, Wand2, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface SearchResult {
  url: string
  name: string
  snippet: string
  host_name: string
  rank: number
  date: string
  favicon: string
}

interface ImageResult {
  id: string
  title: string
  url: string
  host: string
  snippet: string
  favicon: string
  imageUrl: string
  thumbnail: string
}

interface Theme {
  name: string
  background: string
  foreground: string
  accent: string
  card: string
  border: string
}

interface Background {
  id: string
  name: string
  url: string
  thumbnail: string
}

interface Language {
  code: string
  name: string
  nativeName: string
}

const themes: Theme[] = [
  {
    name: 'Light',
    background: 'oklch(1 0 0)',
    foreground: 'oklch(0.145 0 0)',
    accent: 'oklch(0.205 0 0)',
    card: 'oklch(1 0 0)',
    border: 'oklch(0.922 0 0)',
    textContrast: 'oklch(0.145 0 0)'
  },
  {
    name: 'Dark',
    background: 'oklch(0.145 0 0)',
    foreground: 'oklch(0.985 0 0)',
    accent: 'oklch(0.922 0 0)',
    card: 'oklch(0.205 0 0)',
    border: 'oklch(1 0 0 / 10%)',
    textContrast: 'oklch(0.985 0 0)'
  },
  {
    name: 'Ocean Blue',
    background: 'oklch(0.95 0.03 220)',
    foreground: 'oklch(0.15 0.04 220)',
    accent: 'oklch(0.6 0.2 220)',
    card: 'oklch(0.98 0.02 220)',
    border: 'oklch(0.85 0.03 220)',
    textContrast: 'oklch(0.15 0.04 220)'
  },
  {
    name: 'Purple Dream',
    background: 'oklch(0.96 0.03 280)',
    foreground: 'oklch(0.2 0.05 280)',
    accent: 'oklch(0.65 0.22 280)',
    card: 'oklch(0.99 0.02 280)',
    border: 'oklch(0.86 0.03 280)',
    textContrast: 'oklch(0.2 0.05 280)'
  },
  {
    name: 'Sunset Orange',
    background: 'oklch(0.96 0.04 30)',
    foreground: 'oklch(0.25 0.06 30)',
    accent: 'oklch(0.7 0.2 30)',
    card: 'oklch(0.98 0.03 30)',
    border: 'oklch(0.88 0.03 30)',
    textContrast: 'oklch(0.25 0.06 30)'
  },
  {
    name: 'Forest Green',
    background: 'oklch(0.97 0.02 140)',
    foreground: 'oklch(0.2 0.03 140)',
    accent: 'oklch(0.5 0.15 140)',
    card: 'oklch(0.99 0.02 140)',
    border: 'oklch(0.85 0.02 140)',
    textContrast: 'oklch(0.2 0.03 140)'
  }
]

const backgrounds: Background[] = [
  { id: 'bg1', name: 'Abstract Geometric', url: '/bg1.jpg', thumbnail: '/bg1.jpg' },
  { id: 'bg2', name: 'Ocean Waves', url: '/bg2.jpg', thumbnail: '/bg2.jpg' },
  { id: 'bg3', name: 'Mountain Dawn', url: '/bg3.jpg', thumbnail: '/bg3.jpg' },
  { id: 'bg4', name: 'Cosmic Nebula', url: '/bg4.jpg', thumbnail: '/bg4.jpg' },
  { id: 'bg5', name: 'Autumn Forest', url: '/bg5.jpg', thumbnail: '/bg5.jpg' },
  { id: 'bg6', name: 'City Skyline', url: '/bg6.jpg', thumbnail: '/bg6.jpg' },
  { id: 'bg7', name: 'Desert Dunes', url: '/bg7.jpg', thumbnail: '/bg7.jpg' },
  { id: 'bg8', name: 'Aurora Lights', url: '/bg8.jpg', thumbnail: '/bg8.jpg' },
  { id: 'bg9', name: 'Tropical Beach', url: '/bg9.jpg', thumbnail: '/bg9.jpg' },
  { id: 'bg10', name: 'Cherry Blossom', url: '/bg10.jpg', thumbnail: '/bg10.jpg' },
  { id: 'bg11', name: 'Marble Texture', url: '/bg11.jpg', thumbnail: '/bg11.jpg' },
  { id: 'bg12', name: 'Rainforest Waterfall', url: '/bg12.jpg', thumbnail: '/bg12.jpg' },
  { id: 'bg13', name: 'Liquid Art', url: '/bg13.jpg', thumbnail: '/bg13.jpg' },
  { id: 'bg14', name: 'Mediterranean Village', url: '/bg14.jpg', thumbnail: '/bg14.jpg' },
  { id: 'bg15', name: 'Gradient Mesh', url: '/bg15.jpg', thumbnail: '/bg15.jpg' }
]

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
]

const translations: Record<string, Record<string, string>> = {
  en: {
    title: 'Rose Search',
    searchPlaceholder: 'Search the web...',
    imageSearchPlaceholder: 'Search for images...',
    webSearch: 'Web Search',
    imageSearch: 'Image Search',
    trending: 'Trending',
    settings: 'Settings',
    backToSearch: '← Back to search',
    resultsFor: 'Results for',
    imagesFor: 'Images for',
    noResults: 'No results found. Try a different search term.',
    noImages: 'No images found. Try a different search term.',
    voiceSearch: 'Voice Search',
    listening: 'Listening...',
    stopListening: 'Stop listening',
    customizeTitle: 'Customize Rose Search',
    searchMode: 'Search Mode',
    theme: 'Theme',
    background: 'Background',
    visualEffects: 'Visual Effects',
    searchHistory: 'Search History',
    animations: 'Animations',
    effects: 'Visual Effects',
    particles: 'Particle Effects',
    autoSave: 'Auto Save Settings',
    backgroundBlur: 'Background Blur',
    glowIntensity: 'Glow Intensity',
    borderRadius: 'Border Radius',
    fontSize: 'Font Size',
    viewAll: 'View All',
    clearAll: 'Clear All',
    noHistory: 'No search history yet',
    chooseTheme: 'Choose Theme',
    chooseBackground: 'Choose Background',
    none: 'None'
  },
  es: {
    title: 'Rose Search',
    searchPlaceholder: 'Buscar en la web...',
    imageSearchPlaceholder: 'Buscar imágenes...',
    webSearch: 'Búsqueda Web',
    imageSearch: 'Búsqueda de Imágenes',
    trending: 'Tendencias',
    settings: 'Configuración',
    backToSearch: '← Volver a la búsqueda',
    resultsFor: 'Resultados para',
    imagesFor: 'Imágenes para',
    noResults: 'No se encontraron resultados. Prueba con otro término.',
    noImages: 'No se encontraron imágenes. Prueba con otro término.',
    voiceSearch: 'Búsqueda por Voz',
    listening: 'Escuchando...',
    stopListening: 'Dejar de escuchar',
    customizeTitle: 'Personalizar Rose Search',
    searchMode: 'Modo de Búsqueda',
    theme: 'Tema',
    background: 'Fondo',
    visualEffects: 'Efectos Visuales',
    searchHistory: 'Historial de Búsqueda',
    animations: 'Animaciones',
    effects: 'Efectos Visuales',
    particles: 'Efectos de Partículas',
    autoSave: 'Guardar Configuración',
    backgroundBlur: 'Desenfoque de Fondo',
    glowIntensity: 'Intensidad de Brillo',
    borderRadius: 'Radio de Borde',
    fontSize: 'Tamaño de Fuente',
    viewAll: 'Ver Todos',
    clearAll: 'Limpiar Todo',
    noHistory: 'Aún no hay historial de búsqueda',
    chooseTheme: 'Elegir Tema',
    chooseBackground: 'Elegir Fondo',
    none: 'Ninguno'
  },
  fr: {
    title: 'Rose Search',
    searchPlaceholder: 'Rechercher sur le web...',
    imageSearchPlaceholder: 'Rechercher des images...',
    webSearch: 'Recherche Web',
    imageSearch: 'Recherche d\'Images',
    trending: 'Tendances',
    settings: 'Paramètres',
    backToSearch: '← Retour à la recherche',
    resultsFor: 'Résultats pour',
    imagesFor: 'Images pour',
    noResults: 'Aucun résultat trouvé. Essayez un autre terme.',
    noImages: 'Aucune image trouvée. Essayez un autre terme.',
    voiceSearch: 'Recherche Vocale',
    listening: 'Écoute...',
    stopListening: 'Arrêter d\'écouter',
    customizeTitle: 'Personnaliser Rose Search',
    searchMode: 'Mode de Recherche',
    theme: 'Thème',
    background: 'Arrière-plan',
    visualEffects: 'Effets Visuels',
    searchHistory: 'Historique de Recherche',
    animations: 'Animations',
    effects: 'Effets Visuels',
    particles: 'Effets de Particules',
    autoSave: 'Sauvegarder les Paramètres',
    backgroundBlur: 'Flou d\'Arrière-plan',
    glowIntensity: 'Intensité de Brillance',
    borderRadius: 'Rayon de Bordure',
    fontSize: 'Taille de Police',
    viewAll: 'Voir Tout',
    clearAll: 'Effacer Tout',
    noHistory: 'Pas encore d\'historique de recherche',
    chooseTheme: 'Choisir un Thème',
    chooseBackground: 'Choisir un Arrière-plan',
    none: 'Aucun'
  },
  ru: {
    title: 'Rose Search',
    searchPlaceholder: 'Поиск в вебе...',
    imageSearchPlaceholder: 'Поиск изображений...',
    webSearch: 'Веб-поиск',
    imageSearch: 'Поиск изображений',
    trending: 'Тренды',
    settings: 'Настройки',
    backToSearch: '← Вернуться к поиску',
    resultsFor: 'Результаты для',
    imagesFor: 'Изображения для',
    noResults: 'Результаты не найдены. Попробуйте другой запрос.',
    noImages: 'Изображения не найдены. Попробуйте другой запрос.',
    voiceSearch: 'Голосовой поиск',
    listening: 'Слушаю...',
    stopListening: 'Перестать слушать',
    customizeTitle: 'Настроить Rose Search',
    searchMode: 'Режим поиска',
    theme: 'Тема',
    background: 'Фон',
    visualEffects: 'Визуальные эффекты',
    searchHistory: 'История поиска',
    animations: 'Анимации',
    effects: 'Визуальные эффекты',
    particles: 'Эффекты частиц',
    autoSave: 'Сохранять настройки',
    backgroundBlur: 'Размытие фона',
    glowIntensity: 'Интенсивность свечения',
    borderRadius: 'Радиус границы',
    fontSize: 'Размер шрифта',
    viewAll: 'Показать все',
    clearAll: 'Очистить все',
    noHistory: 'История поиска пока пуста',
    chooseTheme: 'Выбрать тему',
    chooseBackground: 'Выбрать фон',
    none: 'Нет'
  },
  pt: {
    title: 'Rose Search',
    searchPlaceholder: 'Pesquisar na web...',
    imageSearchPlaceholder: 'Pesquisar imagens...',
    webSearch: 'Pesquisa Web',
    imageSearch: 'Pesquisa de Imagens',
    trending: 'Tendências',
    settings: 'Configurações',
    backToSearch: '← Voltar à pesquisa',
    resultsFor: 'Resultados para',
    imagesFor: 'Imagens para',
    noResults: 'Nenhum resultado encontrado. Tente um termo diferente.',
    noImages: 'Nenhuma imagem encontrada. Tente um termo diferente.',
    voiceSearch: 'Pesquisa por Voz',
    listening: 'Ouvindo...',
    stopListening: 'Parar de ouvir',
    customizeTitle: 'Personalizar Rose Search',
    searchMode: 'Modo de Pesquisa',
    theme: 'Tema',
    background: 'Fundo',
    visualEffects: 'Efeitos Visuais',
    searchHistory: 'Histórico de Pesquisa',
    animations: 'Animações',
    effects: 'Efeitos Visuais',
    particles: 'Efeitos de Partículas',
    autoSave: 'Salvar Configurações',
    backgroundBlur: 'Desfoque de Fundo',
    glowIntensity: 'Intensidade de Brilho',
    borderRadius: 'Raio da Borda',
    fontSize: 'Tamanho da Fonte',
    viewAll: 'Ver Todos',
    clearAll: 'Limpar Tudo',
    noHistory: 'Nenhum histórico de pesquisa ainda',
    chooseTheme: 'Escolher Tema',
    chooseBackground: 'Escolher Fundo',
    none: 'Nenhum'
  },
  de: {
    title: 'Rose Search',
    searchPlaceholder: 'Im Web suchen...',
    imageSearchPlaceholder: 'Nach Bildern suchen...',
    webSearch: 'Websuche',
    imageSearch: 'Bildersuche',
    trending: 'Trends',
    settings: 'Einstellungen',
    backToSearch: '← Zurück zur Suche',
    resultsFor: 'Ergebnisse für',
    imagesFor: 'Bilder für',
    noResults: 'Keine Ergebnisse gefunden. Versuchen Sie einen anderen Begriff.',
    noImages: 'Keine Bilder gefunden. Versuchen Sie einen anderen Begriff.',
    voiceSearch: 'Sprachsuche',
    listening: 'Höre zu...',
    stopListening: 'Aufhören zu hören',
    customizeTitle: 'Rose Search anpassen',
    searchMode: 'Suchmodus',
    theme: 'Theme',
    background: 'Hintergrund',
    visualEffects: 'Visuelle Effekte',
    searchHistory: 'Suchverlauf',
    animations: 'Animationen',
    effects: 'Visuelle Effekte',
    particles: 'Partikeleffekte',
    autoSave: 'Einstellungen speichern',
    backgroundBlur: 'Hintergrund-Unschärfe',
    glowIntensity: 'Leuchtintensität',
    borderRadius: 'Eckenradius',
    fontSize: 'Schriftgröße',
    viewAll: 'Alle anzeigen',
    clearAll: 'Alle löschen',
    noHistory: 'Noch kein Suchverlauf',
    chooseTheme: 'Theme wählen',
    chooseBackground: 'Hintergrund wählen',
    none: 'Keiner'
  },
  it: {
    title: 'Rose Search',
    searchPlaceholder: 'Cerca sul web...',
    imageSearchPlaceholder: 'Cerca immagini...',
    webSearch: 'Ricerca Web',
    imageSearch: 'Ricerca Immagini',
    trending: 'Tendenze',
    settings: 'Impostazioni',
    backToSearch: '← Torna alla ricerca',
    resultsFor: 'Risultati per',
    imagesFor: 'Immagini per',
    noResults: 'Nessun risultato trovato. Prova un termine diverso.',
    noImages: 'Nessuna immagine trovata. Prova un termine diverso.',
    voiceSearch: 'Ricerca Vocale',
    listening: 'In ascolto...',
    stopListening: 'Smetti di ascoltare',
    customizeTitle: 'Personalizza Rose Search',
    searchMode: 'Modalità di Ricerca',
    theme: 'Tema',
    background: 'Sfondo',
    visualEffects: 'Effetti Visivi',
    searchHistory: 'Cronologia Ricerche',
    animations: 'Animazioni',
    effects: 'Effetti Visivi',
    particles: 'Effetti Particelle',
    autoSave: 'Salva Impostazioni',
    backgroundBlur: 'Sfocatura Sfondo',
    glowIntensity: 'Intensità Luminosità',
    borderRadius: 'Raggio Bordo',
    fontSize: 'Dimensione Carattere',
    viewAll: 'Vedi Tutti',
    clearAll: 'Cancella Tutto',
    noHistory: 'Nessuna cronologia ricerche ancora',
    chooseTheme: 'Scegli Tema',
    chooseBackground: 'Scegli Sfondo',
    none: 'Nessuno'
  },
  uk: {
    title: 'Rose Search',
    searchPlaceholder: 'Пошук у вебі...',
    imageSearchPlaceholder: 'Пошук зображень...',
    webSearch: 'Веб-пошук',
    imageSearch: 'Пошук зображень',
    trending: 'Тренди',
    settings: 'Налаштування',
    backToSearch: '← Повернутися до пошуку',
    resultsFor: 'Результати для',
    imagesFor: 'Зображення для',
    noResults: 'Результати не знайдено. Спробуйте інший запит.',
    noImages: 'Зображення не знайдено. Спробуйте інший запит.',
    voiceSearch: 'Голосовий пошук',
    listening: 'Слухаю...',
    stopListening: 'Перестати слухати',
    customizeTitle: 'Налаштувати Rose Search',
    searchMode: 'Режим пошуку',
    theme: 'Тема',
    background: 'Фон',
    visualEffects: 'Візуальні ефекти',
    searchHistory: 'Історія пошуку',
    animations: 'Анімації',
    effects: 'Візуальні ефекти',
    particles: 'Ефекти частинок',
    autoSave: 'Зберігати налаштування',
    backgroundBlur: 'Розмиття фону',
    glowIntensity: 'Інтенсивність світіння',
    borderRadius: 'Радіус межі',
    fontSize: 'Розмір шрифту',
    viewAll: 'Показати всі',
    clearAll: 'Очистити все',
    noHistory: 'Історія пошуку ще порожня',
    chooseTheme: 'Вибрати тему',
    chooseBackground: 'Вибрати фон',
    none: 'Немає'
  },
  fi: {
    title: 'Rose Search',
    searchPlaceholder: 'Hae webistä...',
    imageSearchPlaceholder: 'Hae kuvia...',
    webSearch: 'Verkkohaku',
    imageSearch: 'Kuvahaku',
    trending: 'Trendit',
    settings: 'Asetukset',
    backToSearch: '← Takaisin hakuun',
    resultsFor: 'Tulokset haulle',
    imagesFor: 'Kuvat haulle',
    noResults: 'Tuloksia ei löytynyt. Kokeile toista hakutermiä.',
    noImages: 'Kuvia ei löytynyt. Kokeile toista hakutermiä.',
    voiceSearch: 'Puhehaku',
    listening: 'Kuuntelen...',
    stopListening: 'Lopeta kuuntelu',
    customizeTitle: 'Mukauta Rose Search',
    searchMode: 'Hakutila',
    theme: 'Teema',
    background: 'Tausta',
    visualEffects: 'Visuaaliset efektit',
    searchHistory: 'Hakuhistoria',
    animations: 'Animaatiot',
    effects: 'Visuaaliset efektit',
    particles: 'Hiukkasefektit',
    autoSave: 'Tallenna asetukset',
    backgroundBlur: 'Taustan sumennus',
    glowIntensity: 'Hehkuvoimakkuus',
    borderRadius: 'Reunan säde',
    fontSize: 'Fonttikoko',
    viewAll: 'Näytä kaikki',
    clearAll: 'Tyhjennä kaikki',
    noHistory: 'Ei vielä hakuhistoriaa',
    chooseTheme: 'Valitse teema',
    chooseBackground: 'Valitse tausta',
    none: 'Ei mitään'
  },
  sv: {
    title: 'Rose Search',
    searchPlaceholder: 'Sök på webben...',
    imageSearchPlaceholder: 'Sök bilder...',
    webSearch: 'Webbsökning',
    imageSearch: 'Bildsökning',
    trending: 'Trender',
    settings: 'Inställningar',
    backToSearch: '← Tillbaka till sökning',
    resultsFor: 'Resultat för',
    imagesFor: 'Bilder för',
    noResults: 'Inga resultat hittades. Försök med en annan sökterm.',
    noImages: 'Inga bilder hittades. Försök med en annan sökterm.',
    voiceSearch: 'Röstsökning',
    listening: 'Lyssnar...',
    stopListening: 'Sluta lyssna',
    customizeTitle: 'Anpassa Rose Search',
    searchMode: 'Sökläge',
    theme: 'Tema',
    background: 'Bakgrund',
    visualEffects: 'Visuella effekter',
    searchHistory: 'Sökhistorik',
    animations: 'Animationer',
    effects: 'Visuella effekter',
    particles: 'Partikeleffekter',
    autoSave: 'Spara inställningar',
    backgroundBlur: 'Bakgrundsoskärpa',
    glowIntensity: 'Glödensintensitet',
    borderRadius: 'Kantradie',
    fontSize: 'Textstorlek',
    viewAll: 'Visa alla',
    clearAll: 'Rensa allt',
    noHistory: 'Ingen sökhistorik än',
    chooseTheme: 'Välj tema',
    chooseBackground: 'Välj bakgrund',
    none: 'Ingen'
  },
  zh: {
    title: 'Rose Search',
    searchPlaceholder: '搜索网络...',
    imageSearchPlaceholder: '搜索图片...',
    webSearch: '网络搜索',
    imageSearch: '图片搜索',
    trending: '趋势',
    settings: '设置',
    backToSearch: '← 返回搜索',
    resultsFor: '结果',
    imagesFor: '图片',
    noResults: '未找到结果。请尝试不同的搜索词。',
    noImages: '未找到图片。请尝试不同的搜索词。',
    voiceSearch: '语音搜索',
    listening: '正在聆听...',
    stopListening: '停止聆听',
    customizeTitle: '自定义 Rose Search',
    searchMode: '搜索模式',
    theme: '主题',
    background: '背景',
    visualEffects: '视觉效果',
    searchHistory: '搜索历史',
    animations: '动画',
    effects: '视觉效果',
    particles: '粒子效果',
    autoSave: '自动保存设置',
    backgroundBlur: '背景模糊',
    glowIntensity: '发光强度',
    borderRadius: '边框半径',
    fontSize: '字体大小',
    viewAll: '查看全部',
    clearAll: '清除全部',
    noHistory: '暂无搜索历史',
    chooseTheme: '选择主题',
    chooseBackground: '选择背景',
    none: '无'
  },
  ja: {
    title: 'Rose Search',
    searchPlaceholder: 'ウェブを検索...',
    imageSearchPlaceholder: '画像を検索...',
    webSearch: 'ウェブ検索',
    imageSearch: '画像検索',
    trending: 'トレンド',
    settings: '設定',
    backToSearch: '← 検索に戻る',
    resultsFor: 'の結果',
    imagesFor: 'の画像',
    noResults: '結果が見つかりません。別の検索語を試してください。',
    noImages: '画像が見つかりません。別の検索語を試してください。',
    voiceSearch: '音声検索',
    listening: '聞いています...',
    stopListening: '聞くのをやめる',
    customizeTitle: 'Rose Searchをカスタマイズ',
    searchMode: '検索モード',
    theme: 'テーマ',
    background: '背景',
    visualEffects: '視覚効果',
    searchHistory: '検索履歴',
    animations: 'アニメーション',
    effects: '視覚効果',
    particles: 'パーティクル効果',
    autoSave: '設定を自動保存',
    backgroundBlur: '背景ぼかし',
    glowIntensity: 'グロー強度',
    borderRadius: '境界線半径',
    fontSize: 'フォントサイズ',
    viewAll: 'すべて表示',
    clearAll: 'すべてクリア',
    noHistory: 'まだ検索履歴がありません',
    chooseTheme: 'テーマを選択',
    chooseBackground: '背景を選択',
    none: 'なし'
  },
  hi: {
    title: 'Rose Search',
    searchPlaceholder: 'वेब खोजें...',
    imageSearchPlaceholder: 'चित्र खोजें...',
    webSearch: 'वेब खोज',
    imageSearch: 'चित्र खोज',
    trending: 'रुझान',
    settings: 'सेटिंग्स',
    backToSearch: '← खोज पर वापस जाएं',
    resultsFor: 'के लिए परिणाम',
    imagesFor: 'के लिए चित्र',
    noResults: 'कोई परिणाम नहीं मिला। अलग खोज शब्द आज़माएं।',
    noImages: 'कोई चित्र नहीं मिला। अलग खोज शब्द आज़माएं।',
    voiceSearch: 'आवाज़ खोज',
    listening: 'सुन रहा हूं...',
    stopListening: 'सुनना बंद करें',
    customizeTitle: 'Rose Search को अनुकूलित करें',
    searchMode: 'खोज मोड',
    theme: 'थीम',
    background: 'पृष्ठभूमि',
    visualEffects: 'दृश्य प्रभाव',
    searchHistory: 'खोज इतिहास',
    animations: 'एनिमेशन',
    effects: 'दृश्य प्रभाव',
    particles: 'कण प्रभाव',
    autoSave: 'सेटिंग्स स्वचालित सहेजें',
    backgroundBlur: 'पृष्ठभूमि धुंध',
    glowIntensity: 'चमक तीव्रता',
    borderRadius: 'सीमा त्रिज्या',
    fontSize: 'फ़ॉन्ट आकार',
    viewAll: 'सभी देखें',
    clearAll: 'सभी साफ़ करें',
    noHistory: 'अभी तक कोई खोज इतिहास नहीं',
    chooseTheme: 'थीम चुनें',
    chooseBackground: 'पृष्ठभूमि चुनें',
    none: 'कोई नहीं'
  },
  cs: {
    title: 'Rose Search',
    searchPlaceholder: 'Hledat na webu...',
    imageSearchPlaceholder: 'Hledat obrázky...',
    webSearch: 'Vyhledávání na webu',
    imageSearch: 'Vyhledávání obrázků',
    trending: 'Trendy',
    settings: 'Nastavení',
    backToSearch: '← Zpět na vyhledávání',
    resultsFor: 'Výsledky pro',
    imagesFor: 'Obrázky pro',
    noResults: 'Nebyly nalezeny žádné výsledky. Zkuste jiný dotaz.',
    noImages: 'Nebyly nalezeny žádné obrázky. Zkuste jiný dotaz.',
    voiceSearch: 'Hlasové vyhledávání',
    listening: 'Naslouchám...',
    stopListening: 'Přestat naslouchat',
    customizeTitle: 'Přizpůsobit Rose Search',
    searchMode: 'Režim vyhledávání',
    theme: 'Téma',
    background: 'Pozadí',
    visualEffects: 'Vizuální efekty',
    searchHistory: 'Historie vyhledávání',
    animations: 'Animace',
    effects: 'Vizuální efekty',
    particles: 'Částicové efekty',
    autoSave: 'Uložit nastavení',
    backgroundBlur: 'Rozostření pozadí',
    glowIntensity: 'Intenzita záře',
    borderRadius: 'Poloměr rohu',
    fontSize: 'Velikost písma',
    viewAll: 'Zobrazit vše',
    clearAll: 'Vymazat vše',
    noHistory: 'Zatím žádná historie vyhledávání',
    chooseTheme: 'Vybrat téma',
    chooseBackground: 'Vybrat pozadí',
    none: 'Žádné'
  },
  pl: {
    title: 'Rose Search',
    searchPlaceholder: 'Szukaj w sieci...',
    imageSearchPlaceholder: 'Szukaj obrazów...',
    webSearch: 'Wyszukiwanie w sieci',
    imageSearch: 'Wyszukiwanie obrazów',
    trending: 'Trendy',
    settings: 'Ustawienia',
    backToSearch: '← Wróć do wyszukiwania',
    resultsFor: 'Wyniki dla',
    imagesFor: 'Obrazy dla',
    noResults: 'Nie znaleziono wyników. Spróbuj inne hasło.',
    noImages: 'Nie znaleziono obrazów. Spróbuj inne hasło.',
    voiceSearch: 'Wyszukiwanie głosowe',
    listening: 'Słucham...',
    stopListening: 'Przestań słuchać',
    customizeTitle: 'Dostosuj Rose Search',
    searchMode: 'Tryb wyszukiwania',
    theme: 'Motyw',
    background: 'Tło',
    visualEffects: 'Efekty wizualne',
    searchHistory: 'Historia wyszukiwania',
    animations: 'Animacje',
    effects: 'Efekty wizualne',
    particles: 'Efekty cząsteczkowe',
    autoSave: 'Zapisz ustawienia',
    backgroundBlur: 'Rozmycie tła',
    glowIntensity: 'Intensywność poświaty',
    borderRadius: 'Promień narożnika',
    fontSize: 'Rozmiar czcionki',
    viewAll: 'Pokaż wszystko',
    clearAll: 'Wyczyść wszystko',
    noHistory: 'Jeszcze nie ma historii wyszukiwania',
    chooseTheme: 'Wybierz motyw',
    chooseBackground: 'Wybierz tło',
    none: 'Brak'
  },
  tr: {
    title: 'Rose Search',
    searchPlaceholder: 'Web\'de ara...',
    imageSearchPlaceholder: 'Görüntü ara...',
    webSearch: 'Web Arama',
    imageSearch: 'Görüntü Arama',
    trending: 'Trendler',
    settings: 'Ayarlar',
    backToSearch: '← Aramaya geri dön',
    resultsFor: 'için sonuçlar',
    imagesFor: 'için görüntüler',
    noResults: 'Sonuç bulunamadı. Farklı bir arama terimi deneyin.',
    noImages: 'Görüntü bulunamadı. Farklı bir arama terimi deneyin.',
    voiceSearch: 'Sesli Arama',
    listening: 'Dinliyorum...',
    stopListening: 'Dinlemeyi bırak',
    customizeTitle: 'Rose Search\'ı Özelleştir',
    searchMode: 'Arama Modu',
    theme: 'Tema',
    background: 'Arka Plan',
    visualEffects: 'Görsel Efektler',
    searchHistory: 'Arama Geçmişi',
    animations: 'Animasyonlar',
    effects: 'Görsel Efektler',
    particles: 'Parçacık Efektleri',
    autoSave: 'Ayarları Kaydet',
    backgroundBlur: 'Arka Plan Bulanıklığı',
    glowIntensity: 'Parlaklık Yoğunluğu',
    borderRadius: 'Kenar Yarıçapı',
    fontSize: 'Yazı Boyutu',
    viewAll: 'Tümünü Gör',
    clearAll: 'Tümünü Temizle',
    noHistory: 'Henüz arama geçmişi yok',
    chooseTheme: 'Tema Seç',
    chooseBackground: 'Arka Plan Seç',
    none: 'Hiçbiri'
  },
  ar: {
    title: 'روز البحث',
    searchPlaceholder: 'البحث في الويب...',
    imageSearchPlaceholder: 'البحث عن الصور...',
    webSearch: 'بحث الويب',
    imageSearch: 'بحث الصور',
    trending: 'الرائجة',
    settings: 'الإعدادات',
    backToSearch: '← العودة للبحث',
    resultsFor: 'نتائج لـ',
    imagesFor: 'صور لـ',
    noResults: 'لم يتم العثور على نتائج. جرب مصطلح بحث مختلف.',
    noImages: 'لم يتم العثور على صور. جرب مصطلح بحث مختلف.',
    voiceSearch: 'البحث الصوتي',
    listening: 'أستمع...',
    stopListening: 'توقف عن الاستماع',
    customizeTitle: 'تخصيص روز البحث',
    searchMode: 'وضع البحث',
    theme: 'المظهر',
    background: 'الخلفية',
    visualEffects: 'التأثيرات البصرية',
    searchHistory: 'سجل البحث',
    animations: 'الرسوم المتحركة',
    effects: 'التأثيرات البصرية',
    particles: 'تأثيرات الجسيمات',
    autoSave: 'حفظ الإعدادات',
    backgroundBlur: 'ضبابية الخلفية',
    glowIntensity: 'شدة التوهج',
    borderRadius: 'نصف قطر الحافة',
    fontSize: 'حجم الخط',
    viewAll: 'عرض الكل',
    clearAll: 'مسح الكل',
    noHistory: 'لا يوجد سجل بحث حتى الآن',
    chooseTheme: 'اختيار المظهر',
    chooseBackground: 'اختيار الخلفية',
    none: 'لا شيء'
  }
}

const searchModes = [
  { name: 'Web Search', value: 'web', icon: Search },
  { name: 'Image Search', value: 'images', icon: Image }
]

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [imageResults, setImageResults] = useState<ImageResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(themes[0]) // Light as default
  const [currentBackground, setCurrentBackground] = useState<Background | null>(null) // None as default
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [blurAmount, setBlurAmount] = useState([0])
  const [searchMode, setSearchMode] = useState('web')
  const [fontSize, setFontSize] = useState([16])
  const [borderRadius, setBorderRadius] = useState([12])
  const [showEffects, setShowEffects] = useState(true)
  const [autoSave, setAutoSave] = useState(true)
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [isListening, setIsListening] = useState(false)
  const [particleEffects, setParticleEffects] = useState(true)
  const [glowIntensity, setGlowIntensity] = useState([50])
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)

  const trendingSearches = [
    'Beautiful landscapes',
    'AI technology',
    'Modern art',
    'Nature photography',
    'Space exploration'
  ]

  const t = translations[currentLanguage] || translations.en

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory')
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }
    
    const savedTheme = localStorage.getItem('searchTheme')
    if (savedTheme) {
      const theme = themes.find(t => t.name === savedTheme)
      if (theme) setCurrentTheme(theme)
    }

    const savedBackground = localStorage.getItem('searchBackground')
    if (savedBackground) {
      const bg = backgrounds.find(b => b.id === savedBackground)
      if (bg) setCurrentBackground(bg)
    }

    const savedSettings = localStorage.getItem('searchSettings')
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setAnimationsEnabled(settings.animations ?? true)
      setBlurAmount(settings.blur ?? [0])
      setFontSize(settings.fontSize ?? [16])
      setBorderRadius(settings.borderRadius ?? [12])
      setShowEffects(settings.showEffects ?? true)
      setAutoSave(settings.autoSave ?? true)
      setParticleEffects(settings.particleEffects ?? true)
      setGlowIntensity(settings.glowIntensity ?? [50])
    }

    const savedLanguage = localStorage.getItem('searchLanguage')
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    if (query.length > 2) {
      const filtered = searchHistory
        .filter(item => item.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }, [query, searchHistory])

  useEffect(() => {
    if (autoSave) {
      const settings = {
        animations: animationsEnabled,
        blur: blurAmount,
        fontSize: fontSize,
        borderRadius: borderRadius,
        showEffects: showEffects,
        autoSave: autoSave,
        particleEffects: particleEffects,
        glowIntensity: glowIntensity
      }
      localStorage.setItem('searchSettings', JSON.stringify(settings))
      localStorage.setItem('searchLanguage', currentLanguage)
    }
  }, [animationsEnabled, blurAmount, fontSize, borderRadius, showEffects, autoSave, particleEffects, glowIntensity, currentLanguage])

  const applyTheme = (theme: Theme) => {
    setCurrentTheme(theme)
    const root = document.documentElement
    root.style.setProperty('--background', theme.background)
    root.style.setProperty('--foreground', theme.foreground)
    root.style.setProperty('--accent', theme.accent)
    root.style.setProperty('--card', theme.card)
    root.style.setProperty('--border', theme.border)
    root.style.setProperty('--text-contrast', theme.textContrast)
    if (autoSave) {
      localStorage.setItem('searchTheme', theme.name)
    }
  }

  const applyBackground = (background: Background) => {
    setCurrentBackground(background)
    if (autoSave) {
      localStorage.setItem('searchBackground', background.id)
    }
  }

  const startVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser')
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = currentLanguage === 'en' ? 'en-US' : 
                      currentLanguage === 'es' ? 'es-ES' :
                      currentLanguage === 'fr' ? 'fr-FR' :
                      currentLanguage === 'ru' ? 'ru-RU' :
                      currentLanguage === 'pt' ? 'pt-BR' :
                      currentLanguage === 'de' ? 'de-DE' :
                      currentLanguage === 'it' ? 'it-IT' :
                      currentLanguage === 'uk' ? 'uk-UA' :
                      currentLanguage === 'fi' ? 'fi-FI' :
                      currentLanguage === 'sv' ? 'sv-SE' :
                      currentLanguage === 'zh' ? 'zh-CN' :
                      currentLanguage === 'ja' ? 'ja-JP' :
                      currentLanguage === 'hi' ? 'hi-IN' :
                      currentLanguage === 'cs' ? 'cs-CZ' :
                      currentLanguage === 'pl' ? 'pl-PL' :
                      currentLanguage === 'tr' ? 'tr-TR' :
                      currentLanguage === 'ar' ? 'ar-SA' : 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setQuery(transcript)
      setIsListening(false)
      handleSearch(transcript)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopVoiceSearch = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setShowResults(true)
    setShowSuggestions(false)

    try {
      if (searchMode === 'web') {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: searchQuery })
        })

        if (response.ok) {
          const data = await response.json()
          setResults(data.results || [])
          setImageResults([])
        }
      } else {
        const response = await fetch('/api/search-images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: searchQuery })
        })

        if (response.ok) {
          const data = await response.json()
          setImageResults(data.images || [])
          setResults([])
        }
      }
      
      const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 10)
      setSearchHistory(newHistory)
      localStorage.setItem('searchHistory', JSON.stringify(newHistory))
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      inputRef.current?.blur()
    }
  }

  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('searchHistory')
  }

  return (
    <div 
      className={`min-h-screen transition-all duration-500 ${animationsEnabled ? 'transition-all' : ''}`}
      style={{ 
        backgroundColor: currentTheme.background,
        color: currentTheme.foreground,
        fontSize: `${fontSize[0]}px`
      }}
    >
      {/* Background Layer */}
      {currentBackground && (
        <div 
          className="fixed inset-0 z-0"
          style={{ 
            backgroundImage: `url(${currentBackground.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            filter: `blur(${blurAmount[0]}px)`,
            transform: 'scale(1.1)'
          }}
        />
      )}

      {/* Overlay for better text readability */}
      {currentBackground && (
        <div 
          className="fixed inset-0 z-0"
          style={{ 
            backgroundColor: `rgba(0, 0, 0, ${Math.min(blurAmount[0] / 40, 0.3)})`
          }}
        />
      )}

      {/* Particle Effects */}
      {showEffects && particleEffects && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full opacity-60 ${animationsEnabled ? 'animate-float' : ''}`}
              style={{
                backgroundColor: currentTheme.accent,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Background Effects */}
      {showEffects && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 ${animationsEnabled ? 'animate-pulse' : ''}`}
               style={{ 
                 backgroundColor: currentTheme.accent,
                 filter: `blur(${glowIntensity[0]}px)`
               }} />
          <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 ${animationsEnabled ? 'animate-pulse' : ''} animation-delay-2000`}
               style={{ 
                 backgroundColor: currentTheme.accent,
                 filter: `blur(${glowIntensity[0]}px)`
               }} />
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6 flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative">
            <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
              <div className="w-full h-0.5 bg-current rounded-full"></div>
              <div className="w-full h-0.5 bg-current rounded-full mt-1"></div>
            </div>
            {animationsEnabled && (
              <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: currentTheme.accent, opacity: 0.3 }} />
            )}
          </div>
          <span className="text-lg md:text-xl font-light">{t.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 md:w-10 md:h-10">
                <Globe className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Language</Label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={currentLanguage === lang.code ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentLanguage(lang.code)}
                      className="text-xs justify-start"
                    >
                      {lang.nativeName}
                    </Button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Settings */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 md:w-10 md:h-10 hover:bg-accent/50 transition-colors">
                <Settings className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {t.customizeTitle}
                </DialogTitle>
              </DialogHeader>
              
              <div className="mt-6 space-y-8">
                {/* Search Mode */}
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    {t.searchMode}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {searchModes.map((mode) => {
                      const Icon = mode.icon
                      return (
                        <Button
                          key={mode.value}
                          variant={searchMode === mode.value ? "default" : "outline"}
                          size="lg"
                          onClick={() => setSearchMode(mode.value)}
                          className="justify-start text-base h-14"
                        >
                          <Icon className="w-5 h-5 mr-3" />
                          {t[mode.value === 'web' ? 'webSearch' : 'imageSearch']}
                        </Button>
                      )
                    })}
                  </div>
                </div>

                {/* Theme Selection */}
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      {t.theme}
                    </h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Wand2 className="w-4 h-4" />
                          {t.viewAll}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{t.chooseTheme}</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                          {themes.map((theme) => (
                            <Card
                              key={theme.name}
                              className={`cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${currentTheme.name === theme.name ? 'ring-2 ring-primary shadow-lg' : ''}`}
                              onClick={() => {
                                applyTheme(theme)
                              }}
                            >
                              <CardContent className="p-4">
                                <div className="w-full h-16 rounded-lg mb-3 shadow-inner" style={{ backgroundColor: theme.background }} />
                                <p className="text-sm font-semibold text-center">{theme.name}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {themes.slice(0, 6).map((theme) => (
                      <Button
                        key={theme.name}
                        variant={currentTheme.name === theme.name ? "default" : "outline"}
                        size="sm"
                        onClick={() => applyTheme(theme)}
                        className="justify-start text-sm h-12"
                      >
                        <div className="w-4 h-4 rounded-full mr-2 border border-border/50" style={{ backgroundColor: theme.accent }} />
                        {theme.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Background Selection */}
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Layers className="w-5 h-5" />
                      {t.background}
                    </h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Globe className="w-4 h-4" />
                          {t.viewAll}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl">
                        <DialogHeader>
                          <DialogTitle>{t.chooseBackground}</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-6 max-h-96 overflow-y-auto">
                          <Card
                            className={`cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${currentBackground === null ? 'ring-2 ring-primary shadow-lg' : ''}`}
                            onClick={() => {
                              setCurrentBackground(null)
                            }}
                          >
                            <CardContent className="p-3">
                              <div className="w-full h-20 rounded-lg mb-2 bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner" />
                              <p className="text-xs font-semibold text-center">{t.none}</p>
                            </CardContent>
                          </Card>
                          {backgrounds.map((bg) => (
                            <Card
                              key={bg.id}
                              className={`cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${currentBackground?.id === bg.id ? 'ring-2 ring-primary shadow-lg' : ''}`}
                              onClick={() => {
                                applyBackground(bg)
                              }}
                            >
                              <CardContent className="p-2">
                                <div className="w-full h-20 rounded-lg mb-2 bg-cover bg-center shadow-inner" style={{ backgroundImage: `url(${bg.url})` }} />
                                <p className="text-xs font-semibold text-center truncate">{bg.name}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    <Button
                      variant={currentBackground === null ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentBackground(null)}
                      className="text-xs h-12"
                    >
                      {t.none}
                    </Button>
                    {backgrounds.slice(0, 5).map((bg) => (
                      <Button
                        key={bg.id}
                        variant={currentBackground?.id === bg.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => applyBackground(bg)}
                        className="text-xs p-2 h-12 flex flex-col items-center gap-1"
                      >
                        <div className="w-6 h-6 rounded bg-cover bg-center shadow-inner" style={{ backgroundImage: `url(${bg.url})` }} role="img" aria-label={`${bg.name} background`} />
                        <span className="truncate leading-none">{bg.name.split(' ')[0]}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Visual Effects */}
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {t.visualEffects}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="animations" className="text-sm font-medium">{t.animations}</Label>
                        <Switch
                          id="animations"
                          checked={animationsEnabled}
                          onCheckedChange={setAnimationsEnabled}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="effects" className="text-sm font-medium">{t.effects}</Label>
                        <Switch
                          id="effects"
                          checked={showEffects}
                          onCheckedChange={setShowEffects}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="particles" className="text-sm font-medium">{t.particles}</Label>
                        <Switch
                          id="particles"
                          checked={particleEffects}
                          onCheckedChange={setParticleEffects}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="autosave" className="text-sm font-medium">{t.autoSave}</Label>
                        <Switch
                          id="autosave"
                          checked={autoSave}
                          onCheckedChange={setAutoSave}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="blur" className="text-sm font-medium mb-2 block">
                          {t.backgroundBlur}: {blurAmount[0]}px
                        </Label>
                        <Slider
                          id="blur"
                          max={20}
                          step={1}
                          value={blurAmount}
                          onValueChange={setBlurAmount}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="glow" className="text-sm font-medium mb-2 block">
                          {t.glowIntensity}: {glowIntensity[0]}px
                        </Label>
                        <Slider
                          id="glow"
                          max={100}
                          step={5}
                          value={glowIntensity}
                          onValueChange={setGlowIntensity}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="radius" className="text-sm font-medium mb-2 block">
                          {t.borderRadius}: {borderRadius[0]}px
                        </Label>
                        <Slider
                          id="radius"
                          max={24}
                          min={0}
                          step={2}
                          value={borderRadius}
                          onValueChange={setBorderRadius}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="fontsize" className="text-sm font-medium mb-2 block">
                          {t.fontSize}: {fontSize[0]}px
                        </Label>
                        <Slider
                          id="fontsize"
                          max={24}
                          min={12}
                          step={1}
                          value={fontSize}
                          onValueChange={setFontSize}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search History */}
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      {t.searchHistory}
                    </h3>
                    <Button variant="outline" size="sm" onClick={clearHistory} className="gap-2">
                      <X className="w-4 h-4" />
                      {t.clearAll}
                    </Button>
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {searchHistory.length > 0 ? (
                      searchHistory.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 cursor-pointer transition-colors border border-border/30"
                          onClick={() => {
                            setQuery(item)
                            handleSearch(item)
                          }}
                        >
                          <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm truncate flex-1">{item}</span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-8">{t.noHistory}</p>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pb-20">
        {!showResults ? (
          <div className={`w-full max-w-2xl ${animationsEnabled ? 'animate-fade-in' : ''}`}>
            {/* Search Input */}
            <div className="relative group">
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                   style={{ 
                     backgroundColor: currentTheme.accent,
                     filter: `blur(20px)`,
                     transform: 'scale(1.05)',
                     opacity: glowIntensity[0] / 100
                   }} />
              
              <div className="relative flex items-center">
                {searchMode === 'web' ? (
                  <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
                ) : (
                  <Image className="absolute left-4 w-5 h-5 text-muted-foreground" />
                )}
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={searchMode === 'web' ? t.searchPlaceholder : t.imageSearchPlaceholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onFocus={() => setShowSuggestions(suggestions.length > 0)}
                  className={`pl-12 pr-20 py-4 md:py-6 text-lg md:text-xl rounded-2xl md:rounded-3xl border-0 shadow-lg transition-all duration-300 ${animationsEnabled ? 'transition-all' : ''}`}
                  style={{ 
                    backgroundColor: currentTheme.card,
                    color: currentTheme.foreground,
                    borderColor: currentTheme.border,
                    borderRadius: `${borderRadius[0]}px`
                  }}
                />
                <div className="absolute right-2 flex items-center gap-1">
                  {/* Voice Search Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                    className={`w-8 h-8 rounded-lg ${isListening ? 'animate-pulse' : ''}`}
                    style={{ color: isListening ? '#ef4444' : currentTheme.accent }}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  
                  {/* Search Button */}
                  <Button
                    onClick={() => handleSearch()}
                    disabled={isLoading || !query.trim()}
                    className="rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-3"
                    style={{ 
                      backgroundColor: currentTheme.accent,
                      borderRadius: `${borderRadius[0]}px`
                    }}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Zap className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Voice Search Indicator */}
              {isListening && (
                <div className="absolute -bottom-12 left-0 right-0 text-center">
                  <Badge variant="secondary" className="animate-pulse">
                    <Volume2 className="w-3 h-3 mr-1" />
                    {t.listening}
                  </Badge>
                </div>
              )}

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <Card className="absolute top-full left-0 right-0 mt-2 md:mt-3 rounded-xl md:rounded-2xl shadow-lg z-50 max-h-60 overflow-y-auto"
                      style={{ backgroundColor: currentTheme.card }}>
                  <CardContent className="p-2">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 md:p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => {
                          setQuery(suggestion)
                          handleSearch(suggestion)
                        }}
                      >
                        <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm md:text-base truncate">{suggestion}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Clock Display */}
            <div className="absolute top-8 right-8 text-sm opacity-60 font-mono" style={{ color: currentTheme.foreground }}>
              {new Date().toLocaleTimeString('en-US', { 
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
              })}
            </div>
          </div>
        ) : (
          /* Search Results */
          <div className={`w-full max-w-6xl ${animationsEnabled ? 'animate-fade-in' : ''}`}>
            <div className="mb-6 md:mb-8">
              <Button
                variant="ghost"
                onClick={() => setShowResults(false)}
                className="mb-4 text-sm md:text-base"
              >
                {t.backToSearch}
              </Button>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-light">
                {searchMode === 'web' ? `${t.resultsFor} "${query}"` : `${t.imagesFor} "${query}"`}
              </h2>
            </div>

            {searchMode === 'web' ? (
              /* Web Search Results */
              <div className="space-y-3 md:space-y-4">
                {results.map((result, index) => (
                  <Card
                    key={index}
                    className={`p-4 md:p-6 lg:p-8 hover:shadow-lg transition-all duration-300 cursor-pointer ${animationsEnabled ? 'transition-all hover:scale-[1.02]' : ''}`}
                    style={{ 
                      backgroundColor: currentTheme.card,
                      borderRadius: `${borderRadius[0]}px`
                    }}
                    onClick={() => window.open(result.url, '_blank')}
                  >
                    <div className="flex items-start gap-3">
                      {result.favicon && (
                        <img src={result.favicon} alt="" className="w-5 h-5 md:w-6 md:h-6 mt-1 rounded flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg lg:text-xl font-medium mb-1 hover:underline truncate">
                          {result.name}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground mb-2 truncate">
                          {result.host_name}
                        </p>
                        <p className="text-xs md:text-sm line-clamp-2 md:line-clamp-3">
                          {result.snippet}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              /* Image Search Results */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {imageResults.map((image, index) => (
                  <Card
                    key={image.id}
                    className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${animationsEnabled ? 'transition-all hover:scale-[1.02]' : ''}`}
                    style={{ 
                      backgroundColor: currentTheme.card,
                      borderRadius: `${borderRadius[0]}px`
                    }}
                    onClick={() => window.open(image.url, '_blank')}
                  >
                    <div className="relative group">
                      <img
                        src={image.thumbnail}
                        alt={image.title}
                        className="w-full h-48 md:h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <ChevronRight className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <CardContent className="p-3 md:p-4">
                      <p className="text-sm font-medium line-clamp-2">
                        {image.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {image.host}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {results.length === 0 && imageResults.length === 0 && !isLoading && (
              <div className="text-center py-12 md:py-16">
                <p className="text-muted-foreground text-sm md:text-base">
                  {searchMode === 'web' ? t.noResults : t.noImages}
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}