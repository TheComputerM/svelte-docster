export default (str: string, indent: number) =>
  str
    .split('\n')
    .map((line) => (line.trim() === '' ? '' : ' '.repeat(indent) + line))
    .join('\n');
