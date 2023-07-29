export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return <input type="text" autoComplete="false" {...props} />;
}
