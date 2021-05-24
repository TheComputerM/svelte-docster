<script>
  /**
   * @slot {{prop1:string;}} default
   * @slot {{i:number;}} repeated
   */

  let value = 'a';
</script>

<slot basic="prop" />
<slot name="shorthand" {value} />

{#each Array(10) as _, i}
  <slot name="repeated" {i} />
{/each}
