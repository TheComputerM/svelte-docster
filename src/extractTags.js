import { parse as parseComment } from "comment-parser/lib";
import { walk } from "svelte/compiler";

function getTagsFromComments(js) {
  const ast = parseComment(js);
  const output = {
    slot: {},
    event: {},
    typedef: {},
    restProps: false,
    styles: {},
    all: [],
  };

  ast.forEach((comment) => {
    comment.tags.forEach((tag, i) => {
      switch (tag.tag) {
        case "slot":
          output.slot[tag.name] = {
            type: tag.type,
            description: tag.description,
          };
          break;
        case "event":
          output.event[tag.name] = {
            eventDetail: tag.type,
            description: tag.description,
          };
          break;
        case "typedef":
          output.typedef[tag.name] = {
            value: tag.type,
            description: tag.description,
          };
          break;
        case "restProps":
          output.restProps = tag.type;
          break;
        case "style":
          const tagWithDefaultValue = comment.tags[i + 1];
          const tagHasDefaultValue = tagWithDefaultValue && tagWithDefaultValue.tag === 'default'
          output.styles[tag.name] = {
            description: tag.description,
            default: tagHasDefaultValue ? tagWithDefaultValue.name : null,
            type: tag.type
          }
          break;
      }
    });

    output.all.push({
      description: comment.description,
      tags: comment.tags.map((tag) => ({
        tag: tag.tag,
        name: tag.name,
        type: tag.type,
        description: tag.description,
        optional: tag.optional,
      })),
    });
  });

  return output;
}

function getSlotValue(slot) {
  switch (slot.type) {
    case "Text":
      return slot.raw;
    case "MustacheTag":
      return slot.expression.raw;
    case "AttributeShorthand":
      return slot.expression.name;
  }
  return null;
}

export default function (ast, content) {
  const jsast = (ast.instance && ast.instance.content) || "";
  const js = content.substring(jsast.start, jsast.end);
  const tags = getTagsFromComments(js);

  const slots = {};
  const events = tags.event;
  let restProps = null;
  walk(ast.html, {
    enter(node) {
      if (node.type === "Slot") {
        const attrs = node.attributes;
        const nameAttr = attrs.find(({ name }) => name === "name");
        const name = nameAttr ? nameAttr.value[0].data : "default";

        slots[name] = {
          type: null,
          description: null,
          ...tags.slot[name],
          attributes: attrs.reduce((acc, attr) => {
            const valueObj = attr.value[0];
            acc[attr.name] = {
              value: getSlotValue(valueObj),
              valueType: valueObj.type,
            };
            return acc;
          }, {}),
          content: content.substring(node.start, node.end),
        };
      } else if (["Element", "InlineComponent"].includes(node.type)) {
        node.attributes.forEach((attr) => {
          if (attr.type === "EventHandler" && !attr.expression) {
            events[attr.name] = {
              description: null,
              eventDetail: node.type === "Element" ? "window" : null,
              ...tags.event[attr.name],
              by: node.type,
              trigger: node.name,
            };
          } else if (
            node.type === "Element" &&
            attr.type === "Spread" &&
            attr.expression.name === "$$restProps"
          ) {
            restProps = node.name;
          }
        });
      }
    },
  });

  restProps = tags.restProps || restProps;

  return {
    slots,
    events,
    typedef: tags.typedef,
    restProps,
    styles: tags.styles,
    all: tags.all,
  };
}
