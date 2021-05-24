<script>
  /**
   * This is a prop.
   */
  export let prop1 = 'value';

  // should parse this
  export let prop2;


  // should not parse this

  export let prop3;

  /**
   * Should not parse this also
   * @type {string}
   */

  export let prop4;
</script>

{prop1}
{prop2}
{prop3}
{prop4}
