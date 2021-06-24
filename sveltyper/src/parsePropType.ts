export default (prop) => {
  let type: string = 'any';
  const typeTag = prop.tags.find(({ tag }) => tag === 'type');
  if (typeTag) type = typeTag.type;
  else if (prop.value != null) {
    try {
      type = typeof new Function(`return ${prop.value}`)();
    } catch {}
  }

  return type;
};
