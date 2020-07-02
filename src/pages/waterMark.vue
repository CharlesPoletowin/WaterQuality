<template>
  <div id='waterMark'>
    <iframe
      class='waterMarkiframe'
      src='http://10.200.43.5:5002'
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'waterMark'
}
</script>

<style>
.waterMarkiframe {
  width: 100%;
  height: 100vh;
  border: 0ch;
}
</style>
