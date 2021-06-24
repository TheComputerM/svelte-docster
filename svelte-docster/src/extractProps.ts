import { walk, lookup } from 'astray';
import type { Program, BaseNode } from 'estree';
import { generate as astring } from 'astring';
import { parse as parseComment } from 'comment-parser';

export interface Props {
  [propName: string]: {
    value: string;
    valueType: 'Literal' | 'Identifier' | 'FunctionDeclaration' | null;
    localName: string;
    kind: 'let' | 'const' | 'function';
    required: boolean;
    description: string;
    tags: {
      tag: string;
      type: string;
      name: string;
      description: string;
    }[];
  };
}

function extractFromComment(node) {
  if (Array.isArray(node.leadingComments)) {
    const commentObj = node.leadingComments[node.leadingComments.length - 1];
    if (node.start - commentObj.end <= 3) {
      const isCommentLine = commentObj.type === 'Line';
      const value = commentObj.value;
      const comment = isCommentLine ? `/** ${value} */` : `/*${value}*/`;
      const parsed = parseComment(comment)[0];

      if (parsed) {
        return {
          description: parsed.description,
          tags: parsed.tags.map((tag) => ({
            tag: tag.tag,
            type: tag.type,
            name: tag.name,
            description: tag.description,
          })),
        };
      }
    }
  }

  return {
    description: null,
    tags: [],
  };
}

export default function (jsast: Program | ''): Props {
  const output = new Map();
  const STATE = new Map();

  walk(
    jsast,
    {
      ExportNamedDeclaration: {
        enter(node, state) {
          state.set('is_exported', true);
        },
        exit(node, state) {
          state.set('is_exported', false);
        },
      },
      VariableDeclaration(node, state) {
        // export let prop = value;
        if (state.get('is_exported')) {
          const variable: any = node.declarations[0];
          const parent = node.path.parent;
          const kind = node.kind;

          const { name } = variable.id;
          const required = !variable.init;
          let value = null;
          let valueType = null;
          const { description, tags } = extractFromComment(parent);

          if (!required) {
            value = astring(variable.init);
            valueType = variable.init.type;
          }

          output.set(name, {
            value,
            valueType,
            localName: name,
            kind,
            required,
            description,
            tags,
          });
        }
      },
      ExportSpecifier(node, state) {
        // export {localName as prop};
        if (state.get('is_exported')) {
          const name = node.exported.name;
          const localName = node.local.name;
          const localNode: any = lookup(node, localName)[localName];

          let required = null;
          let value = null;
          let valueType = null;
          let kind = null;
          let description = '';
          let tags = [];

          if (localNode) {
            const parent = localNode.path.parent;
            required = !localNode.init;
            if (!required) {
              value = astring(localNode.init);
              valueType = localNode.init.type;
            }

            kind = parent.kind;

            ({ description, tags } = extractFromComment(parent));
          }

          output.set(name, {
            value,
            valueType,
            localName,
            kind,
            required,
            description,
            tags,
          });
        }
      },
      FunctionDeclaration(node, state) {
        // export function prop() {}
        if (state.get('is_exported')) {
          const parent = node.path.parent;
          const name = node.id.name;

          const { description, tags } = extractFromComment(parent);

          output.set(name, {
            value: astring(node),
            valueType: node.type,
            localName: name,
            kind: 'function',
            required: false,
            description,
            tags,
          });
        }
      },
    },
    STATE,
  );

  return Object.fromEntries(output);
}
