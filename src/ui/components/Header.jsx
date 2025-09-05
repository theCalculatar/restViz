import { useLocation } from 'react-router-dom'

export function Header() {
  const { pathname } = useLocation()

  return (
    <header>
      <nav>
        <a href="/" className={pathname == '/' && 'active'}>
          Home
        </a>
        <a href="/404" className={pathname == '/404' && 'active'}>
          404
        </a>
      </nav>
    </header>
  )
}
