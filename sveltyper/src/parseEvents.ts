import type { Events } from 'svelte-docster/types/extractTags';

export default (events: Events) => {
  const output = Object.entries(events)
    .reduce((acc, [name, event]) => {
      if (event.eventDetail === 'window') {
        acc.push(`${name}: WindowEventMap["${name}"];`);
      } else {
        acc.push(`'${name}': ${event.eventDetail || 'any'};`);
      }
      return acc;
    }, [])
    .join(' ');
  return '{' + output + '}';
};
