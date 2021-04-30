<template>
  <div class="wrap">
    {{ priceUS }}
  </div>
</template>

<script>
import axios from '../lib/axios'
export default {
  data() {
    return {
      price: '',
    }
  },
  computed: {
    priceUS() {
      return this.price
    },
  },
  created() {
    this.getInfo()
  },
  mounted() {},
  methods: {
    async getInfo() {
      const result = await axios({
        url: '/v2/Coin/market_ticker',
        params: {
          page: 2,
          pagesize: 10,
          code: 'bitcoin',
          token: '',
          tickertype: 0,
          pair2: '',
          webp: 1,
        },
      })
      this.price = result.data.data.markets[0].price_usd
      setTimeout(() => {
        this.getInfo()
      }, 5000)
    },
  },
}
</script>

<style>
.wrap {
  font-size: 20px;
}
</style>
