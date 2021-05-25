<script>
  /**
   * This has tags for props.
   */

  /**
   * @type {string}
   */
  export let a = '';

  /**
   * @author TheComputerM
   * @description MultipleTags
   * @example 3 tags
   */
  let b = '';

  export { b as c };

  /**
   * Multiple line
   * description
   * @returns {"hello"}
   */
  export function d() {return "hello"}
</script>

{a}
{b}
{d()}
