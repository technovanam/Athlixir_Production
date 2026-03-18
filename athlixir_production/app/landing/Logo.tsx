// Simple Logo component for the header
export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <span
      onClick={onClick}
      className="text-2xl font-bold text-primary cursor-pointer select-none tracking-wider"
      style={{ letterSpacing: '0.1em' }}
    >
      Athlixir
    </span>
  );
}
