export default function AguayoDivider({ thin = false }: { thin?: boolean }) {
  return <div className={thin ? "aguayo-divider-thin" : "aguayo-divider"} />;
}
