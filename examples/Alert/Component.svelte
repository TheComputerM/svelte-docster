<script>
  import { createEventDispatcher } from 'svelte';

  /**
   * @component Alert
   * @example
   * <Alert>Hello</Alert>
   */

  /**
   * @typedef {'warning' | 'info' | 'success'} AlertType
   */

  /**
   * Type of Alert.
   * @type {AlertType}
   */
  export let type = 'warning';

  const dispatch = createEventDispatcher();

  /**
   * @event {{cool: boolean}} dismiss when alert is dismissed
   */

  function dismiss() {
    dispatch('dismiss', { cool: true });
  }
</script>

<div class="type-{type}" {...$$restProps}>
  <slot>Default Content</slot>
  <button on:click={dismiss}> Dismiss </button>
</div>
