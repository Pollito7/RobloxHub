import { Helmet } from 'react-helmet-async'

export default function SEO({ title, desc, path='', og={} }) {
  const full = title ? `${title} | RobloxHub` : 'RobloxHub — Códigos Roblox Gratis 2024'
  const description = desc || 'Códigos de Roblox actualizados cada hora. Blox Fruits, Fisch, Arsenal y 18+ juegos. Guías completas y quiz interactivo.'
  const url = `https://robloxhub.es${path}`
  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={og.title||full} />
      <meta property="og:description" content={og.desc||description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={og.title||full} />
      <meta name="twitter:description" content={og.desc||description} />
    </Helmet>
  )
}
