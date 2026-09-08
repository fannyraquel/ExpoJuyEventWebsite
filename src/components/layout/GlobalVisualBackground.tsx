import videoMundo from "../../assets/mundo.mp4";

export default function GlobalVisualBackground() {
  return (
    <div className="global-visual-background" aria-hidden="true">
      <video src={videoMundo} autoPlay loop muted playsInline />
      <div className="global-visual-overlay" />
      <div className="global-visual-glow global-visual-glow-purple" />
      <div className="global-visual-glow global-visual-glow-cyan" />
    </div>
  );
}
