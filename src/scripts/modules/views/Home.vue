<template>

  <div id="home" class="section">



  </div>

</template>

<script lang="babel">

  import Scene from '../components/Scene';
  import Quick from '../helpers/Object3D';

  export default {

    ready() {

      let scene = new Scene({
        debug: true,
        gui: true,
        postprocessing: true
      });

      let quick = new Quick();

      scene.addObject( quick );
      scene.init();

    }

  };


</script>

<style lang="scss" scoped>



</style>
