<template>
  <div class="box">
    <h3>{{name}}</h3>
    <table border="1">
      <tr>
        <th>选择</th>
        <th>排序</th>
        <th>商品名称</th>
        <th>数量</th>
        <th>价格</th>
        <th>总价</th>
      </tr>
      <tr v-for="(c,index) in cart" :key="c.id" :class="{active:c.active}">
        <td>
          <input type="checkbox" v-model="c.active">
        </td>
        <td>{{index}}</td>
        <td>{{c.name}}</td>
        <td>
          <button @click="minus(index)">-</button>
          {{c.count}}
          <button @click="add(index)">+</button>
        </td>
        <td>${{c.price}}</td>
        <td>${{c.price * c.count}}</td>
      </tr>
      <tr>
        <td></td>
        <td colspan="2">{{activeCount}}/{{count}}</td>
        <td colspan="3">${{total}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["name"],
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("mydata")) || []
    };
  },
  watch: {
    cart: {
      handler(newVal, oldVal) {
        localStorage.setItem("mydata", JSON.stringify(newVal));
      },
      // 代表在wacth里声明了cart这个方法之后立即先去执行handler方法
      // immediate: true,
      deep: true

      //
    }
  },
  computed: {
    activeCount() {
      // 过滤出激活项的数量
      return this.cart.filter(v => v.active).length;
    },
    count() {
      // 购物车数量
      return this.cart.length;
    },
    total() {
      // 计算激活项的总价
      let num = 0;
      this.cart.forEach(c => {
        if (c.active) {
          num += c.price * c.count;
        }
      });
      return num;
    }
  },
  created() {
    // 通过根的方式,父向子传值(一般$emit是子向父传值)
    this.$root.$on("addCart", good => {
      const rep = this.cart.find(v => v.id === good.id);
      if (rep) {
        rep.count += 1;
      } else {
        this.cart.push({
          ...good,
          count: 1,
          active: true
        });
      }
    });

    // 通过总线方式
    // this.$bus.$on("addCart", good => {
    //   const rep = this.cart.find(v => v.id === good.id);
    //   if (rep) {
    //     rep.count += 1;
    //   } else {
    //     this.cart.push({
    //       ...good,
    //       count: 1,
    //       active: true
    //     });
    //   }
    // });
  },
  methods: {
    minus(i) {
      const count = this.cart[i].count;
      if (count > 1) {
        this.cart[i].count--;
      } else {
        this.remove(i);
      }
    },
    add(i) {
      this.cart[i].count++;
    },
    remove(i) {
      if (window.confirm("确定删除?")) {
        this.cart.splice(i, 1);
      }
    }
  }
};
</script>

<style scoped>
.box {
  width: 500px;
  margin: 0 auto;
}
.active {
  color: green;
}
</style>
