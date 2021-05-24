<script>
  /**
   * @slot default the default slot
   */

  // Classes to add to the button.
  let klass = '';
  export { klass as class };

  /**
   * Variant of the button.
   * @type {'primary' | 'secondary' | 'disabled'}
   */
  export let variant = 'primary';
</script>

<button class="variant-{variant} {klass}" on:click>
  <slot />
  <slot name="icon" />
</button>
