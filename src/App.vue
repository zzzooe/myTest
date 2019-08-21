<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="addInfo">
      <h4>测试数据</h4>
      <ul>
        <li v-for="(item,index) in testData" :key="item.id">
          <span>{{item.name}}</span>
          <span>${{item.price}}</span>
        </li>
      </ul>
      <ul>
        <li v-for="(item,index) in goods" :key="item.id">
          <span>{{item.name}}</span>
          <span>${{item.price}}</span>
          <button @click="addGood(index)">添加到购物车</button>
        </li>
      </ul>
      <cart :name="name"></cart>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import cart from "./components/cart";
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      testData: [],
      goods: [],
      name: "公开课"
    };
  },
  components: {
    // HelloWorld,
    cart
  },
  async created() {
    try {
      //获取商品数据
      const response = await axios.get("/api/goods");
      console.log(response);
      this.goods = response.data.list;
    } catch {
      // 错误处理
    }

    try {
      //获取商品数据

      const response = await axios.get("/api/goods1");
      console.log(response);
      this.testData = response.data.list;
    } catch {
      // 错误处理
    }

    //
  },
  methods: {
    addGood(i) {
      const good = this.goods[i];

      this.$root.$emit("addCart", good); // 通过根的方式,父向子传值(一般$emit是子向父传值)
      // this.$bus.$emit("addCart", good); // 通过总线方式
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
