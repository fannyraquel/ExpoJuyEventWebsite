import { EventStatus } from "../../types/domain.types";
import { STATUS_CONFIG } from "../../config/theme.config";

export default function StatusBadge({ status }: { status: EventStatus }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["próximo"];
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold font-mono-data"
      style={{
        background: cfg.bgColor,
        color: cfg.textColor,
        border: `1.5px solid ${cfg.borderColor}`,
      }}
    >
      <span className={status === "en vivo" ? "live-pulse" : ""}>{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}
