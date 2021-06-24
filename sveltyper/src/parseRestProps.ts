export default (restProps: string | null) => {
  if (typeof restProps !== 'string') return '';
  const output = [];
  const elems = restProps.split('|').map((s) => s.trim());
  for (const elem of elems) {
    output.push(`svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["${elem}"]>`);
  }
  return `extends ${output.join(', ')} `;
};
