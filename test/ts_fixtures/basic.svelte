<script lang="ts">
  /**
   * The classes add to the component.
   */
  let klass = "";
  export { klass as class };

  /**
   * My prop description
   */
  export let prop: string = "value";

  export let autoinfer = 123;
</script>

{prop}
{klass}
{autoinfer}
