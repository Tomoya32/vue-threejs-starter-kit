<template>

  <div id="home" class="section">



  </div>

</template>

<script lang="babel">

  import Scene from '../Scene';

  export default {

    ready() {

      this.scene = new Scene();

      this.scene.init();

      // Import your files here
      // I made a generic Object3D class in src/modules/helpers/Object3D.js
      // It creates a basic sphere using basic shaders
      // Extends your own class with it to develop faster

      // Adding an object to the scene :
      // this.scene.addObject( new YourObject() );
    }

  };


</script>

<style lang="scss" scoped>



</style>
