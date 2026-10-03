import { useEffect, useRef, useState } from "react";
import {
  Map as MapLibre,
  setWorkerUrl,
  type ExpressionSpecification,
  type FilterSpecification,
  type MapGeoJSONFeature,
} from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTheme } from "../../utils/hooks";
import districtsUrl from "./yerevan-districts.json?url";
import {
  ACCENT,
  DISTRICT_HOVER_CARD,
  DISTRICT_MAP_FRAME,
  FIT_PADDING,
  LABEL_FONT,
  LAYERS,
  MAP_COLORS,
  MAP_STYLES,
  MAX_BOUNDS,
  SOURCE_ID,
  YEREVAN_BOUNDS,
} from "./constants";
import { byState, describeStats } from "./helpers";
import type { DistrictMapProps, HoveredDistrict } from "./types";

setWorkerUrl(workerUrl);

const POLYGONS: FilterSpecification = ["!", ["has", "label"]];
const LABELS: FilterSpecification = ["has", "label"];
const RUSSIAN_NAME: ExpressionSpecification = [
  "coalesce",
  ["get", "name:ru"],
  ["get", "name_int"],
  ["get", "name"],
];

export function DistrictMap({ selected, onToggle, stats }: DistrictMapProps) {
  const { theme } = useTheme();
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibre | null>(null);
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState<HoveredDistrict | null>(null);
  const toggleRef = useRef(onToggle);

  useEffect(() => {
    toggleRef.current = onToggle;
  });

  useEffect(() => {
    if (!container.current) return;
    const colors = MAP_COLORS[theme];
    const map = new MapLibre({
      container: container.current,
      style: MAP_STYLES[theme],
      bounds: YEREVAN_BOUNDS,
      fitBoundsOptions: { padding: FIT_PADDING },
      maxBounds: MAX_BOUNDS,
      dragRotate: false,
      pitchWithRotate: false,
      attributionControl: { compact: true },
    });
    map.touchZoomRotate.disableRotation();
    mapRef.current = map;
    let hoverId: string | null = null;

    const setHover = (id: string | null) => {
      if (hoverId) map.setFeatureState({ source: SOURCE_ID, id: hoverId }, { hover: false });
      hoverId = id;
      if (id) map.setFeatureState({ source: SOURCE_ID, id }, { hover: true });
    };

    map.on("load", () => {
      map.getStyle().layers.forEach((layer) => {
        if (layer.type === "symbol" && map.getLayoutProperty(layer.id, "text-field")) {
          map.setLayoutProperty(layer.id, "text-field", RUSSIAN_NAME);
        }
      });
      map.addSource(SOURCE_ID, { type: "geojson", data: districtsUrl, promoteId: "name" });
      map.addLayer({
        id: LAYERS.fill,
        type: "fill",
        source: SOURCE_ID,
        filter: POLYGONS,
        paint: {
          "fill-color": byState("selected", ACCENT, byState("hover", ACCENT, colors.fill)),
          "fill-opacity": byState("selected", 0.42, byState("hover", 0.18, 0.05)),
        },
      });
      map.addLayer({
        id: LAYERS.line,
        type: "line",
        source: SOURCE_ID,
        filter: POLYGONS,
        paint: {
          "line-color": byState("selected", ACCENT, colors.line),
          "line-width": byState("selected", 2.5, 1.2),
          "line-opacity": byState("selected", 1, 0.7),
        },
      });
      map.addLayer({
        id: LAYERS.label,
        type: "symbol",
        source: SOURCE_ID,
        filter: LABELS,
        layout: {
          "text-field": ["get", "name"],
          "text-font": LABEL_FONT,
          "text-size": 12,
          "text-max-width": 7,
          "text-allow-overlap": true,
        },
        paint: {
          "text-color": colors.label,
          "text-halo-color": colors.halo,
          "text-halo-width": 1.6,
        },
      });
      setReady(true);
    });

    map.on("mousemove", LAYERS.fill, (e) => {
      const feature: MapGeoJSONFeature | undefined = e.features?.[0];
      const name = feature?.properties.name as string | undefined;
      if (!name) return;
      if (name !== hoverId) setHover(name);
      map.getCanvas().style.cursor = "pointer";
      setHovered({ name, x: e.point.x, y: e.point.y });
    });
    map.on("mouseleave", LAYERS.fill, () => {
      setHover(null);
      map.getCanvas().style.cursor = "";
      setHovered(null);
    });
    map.on("click", LAYERS.fill, (e) => {
      const name = e.features?.[0]?.properties.name as string | undefined;
      if (name) toggleRef.current(name);
    });

    return () => {
      mapRef.current = null;
      setReady(false);
      map.remove();
    };
  }, [theme]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    map.removeFeatureState({ source: SOURCE_ID });
    selected.forEach((id) => map.setFeatureState({ source: SOURCE_ID, id }, { selected: true }));
  }, [selected, ready]);

  return (
    <div className={DISTRICT_MAP_FRAME}>
      <div ref={container} className="size-full" aria-label="Карта районов Еревана" role="application" />
      {hovered && (
        <div className={DISTRICT_HOVER_CARD} style={{ left: hovered.x, top: hovered.y }}>
          <strong className="block text-[13px]">{hovered.name}</strong>
          <span className="mt-2 block text-muted">{describeStats(stats?.[hovered.name])}</span>
          <span className="mt-6 block text-[11px] font-semibold text-accent">
            {selected.includes(hovered.name) ? "Нажмите, чтобы убрать" : "Нажмите, чтобы выбрать"}
          </span>
        </div>
      )}
    </div>
  );
}
