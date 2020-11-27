<template>
  <div id="listdiv" :style="{height:height,width:width}" />
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    this.datalist()
  },
  methods: {
    datalist() {
      var ahu_list = [2500.318915, 2350.233174, 2213.152850, 2120.228654, 2110.444567, 2001.15748, 1980.525464, 1849.547551, 1830.5648, 1804.5487, 1789.4564]

      for (var i = 0; i < 1000; i++) {
        (function(i) {
          setTimeout(function() {
            var s = Number(i / 100).toFixed(0)

            if (i % 3 === 0) {
              var time = new Date()
              const p = document.createElement('p')
              p.append(time.toLocaleString() + '\t' + i + '次迭代适应度=' + ahu_list[s] + ',  ' + (i + 1) + '次迭代适应度=' + ahu_list[s] + '，  ' + (i + 2) + '次迭代适应度=' + ahu_list[s])
              if (document.getElementById('listdiv')) {
                document.getElementById('listdiv').prepend(p)
              }
            }
          }, (i + 1) * 50)
        })(i)
      }
    }
  }
}
</script>

<style lang="less" scoped>
#listdiv{
  overflow: auto;
  font-size:12px ;
  color: #1e98d3;
}
input[type=range] {
    -webkit-appearance: none;
    width: 16vw;
}

input[type=range]::-webkit-slider-runnable-track {
   height: 0.3vh;
	/*background: #cccccc;*/
}

input[type=range]:focus {
    outline: none;
}
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 2.9vw;
    width: 2.9vw;
    background: #006ec7;
    border-radius:50% ;
    margin-top: -7px;
    border: none;
}
</style>
