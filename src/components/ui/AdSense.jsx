/**
 * AdSense — 3 formatos listos para activar
 *
 * PRODUCCIÓN: Reemplaza cada <div className="ad-wrap ..."> con:
 *
 * Banner (728×90):
 * <ins className="adsbygoogle" style={{display:'block'}}
 *   data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *   data-ad-slot="XXXXXXXXXX"
 *   data-ad-format="auto" data-full-width-responsive="true"></ins>
 *
 * Rectangle (300×250):
 * <ins className="adsbygoogle" style={{display:'inline-block',width:'300px',height:'250px'}}
 *   data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *   data-ad-slot="XXXXXXXXXX"></ins>
 *
 * In-article (fluid):
 * <ins className="adsbygoogle" style={{display:'block',textAlign:'center'}}
 *   data-ad-layout="in-article" data-ad-format="fluid"
 *   data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *   data-ad-slot="XXXXXXXXXX"></ins>
 */

export function AdBanner({ style={} }) {
  return (
    <div className="ad-wrap ad-banner" style={style}>
      <span>Publicidad · AdSense 728×90</span>
    </div>
  )
}

export function AdRect({ style={} }) {
  return (
    <div className="ad-wrap ad-rectangle" style={style}>
      <span>Publicidad</span>
      <span style={{ fontSize:'.6rem' }}>300×250</span>
    </div>
  )
}

export function AdInline({ style={} }) {
  return (
    <div className="ad-wrap ad-inline" style={style}>
      <span>Publicidad · In-Article</span>
    </div>
  )
}
