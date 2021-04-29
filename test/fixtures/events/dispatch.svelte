<script>
  /**
   * @event {{cool: boolean}} button A very cool event.
  */
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<button
  on:click={() => {
    dispatch("button", { cool: true });
  }}
>
  Click
</button>
