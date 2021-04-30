<template>
  <div id="app">
    <getBTC />
    <Mention />
  </div>
</template>
<script>
import getBTC from './components/getBTC'
import Mention from './components/mention'
export default {
  components: { getBTC, Mention },
  data() {
    return {}
  },
  mounted() {},
}
</script>
<style lang="scss">
// .state-ball {
//   position: relative;
//   padding: 5px;
//   border: 3px solid #3c9;
//   border-radius: 100%;
//   width: 150px;
//   height: 150px;
//   background-color: #fff;
//   margin: 100px 0 0 100px;
//   overflow: hidden;
//   .wave {
//     position: relative;
//     border-radius: 100%;
//     width: 100%;
//     height: 100%;
//     background-image: linear-gradient(to bottom, #af8 13%, #3c9 91%);

//     &::before {
//       content: '';
//       width: 200px;
//       height: 200px;
//       position: absolute;
//       left: 50%;
//       margin-left: -100px;
//       bottom: 5px;
//       background: blue;
//       border-radius: 45%;
//       animation: rotate 10s linear -5s infinite;
//       margin-bottom: calc(var(--offset) * 1.5px);
//       background-color: rgba(#fff, 0.5);
//     }
//     &::after {
//       content: '';
//       width: 200px;
//       height: 200px;
//       position: absolute;
//       left: 50%;
//       margin-left: -105px;
//       bottom: 5px;
//       background: blue;
//       border-radius: 45%;
//       animation: rotate 10s linear -5s infinite;
//       margin-bottom: calc(var(--offset) * 1.5px + 5px);
//       background-color: rgba(#fff, 0.5);
//     }
//     @keyframes rotate {
//       to {
//         transform: rotate(1turn);
//       }
//     }
//   }
//   .progress::after {
//     display: flex;
//     position: absolute;
//     left: 0;
//     top: 0;
//     z-index: 99;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     height: 100%;
//     font-weight: bold;
//     font-size: 16px;
//     color: #09f;
//     content: counter(progress) '%';
//     counter-reset: progress var(--offset);
//   }
// }
</style>
