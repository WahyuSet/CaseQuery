import React from 'react'
import type { HotspotMarker as HotspotMarkerType } from '../../cases/types'

interface HotspotMarkerProps {
  hotspot: HotspotMarkerType
  onSelect: (evidenceId: string) => void
}

export const HotspotMarker: React.FC<HotspotMarkerProps> = ({ hotspot, onSelect }) => {
  return (
    <button
      id={`marker-${hotspot.id}`}
      onClick={() => onSelect(hotspot.evidenceId)}
      className="hotspot-pin marker-bounce"
      style={{
        left: `${hotspot.position.xPercent}%`,
        top: `${hotspot.position.yPercent}%`
      }}
      title={`Periksa Bukti [${hotspot.label}]: ${hotspot.title}`}
      aria-label={`Periksa Bukti [${hotspot.label}]: ${hotspot.title}`}
    >
      <span className="hotspot-label">
        {hotspot.label}
      </span>
    </button>
  )
}
