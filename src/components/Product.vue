<template>
  <div>
    <header id="header">
      <div class="container">
        <div class="cart">
          <p><i class="fas fa-shopping-cart"></i>{{ cart }}</p>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="product">
        <div class="image">
          <img v-bind:src="productImage" alt="" />
        </div>
        <div class="content">
          <h1>{{ product }}</h1>
          <div class="stockInfo">
            <span class="green" v-if="inventory > 10">In Stock</span>
            <span class="amber" v-else-if="inventory > 0">Only few left</span>
            <span class="red" v-else>Out of Stock</span>
          </div>
          <ul class="features">
            <li v-for="(feature, index) in features" :key="index">
              {{ feature }}
            </li>
          </ul>
          <div class="variants">
            <span v-for="variant in variants" :key="variant.variantId"
              >{{ variant.variantColor }}
            </span>
          </div>
          <div class="addCart">
            <button v-on:click="addToCart">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  data() {
    return {
      product: "Nike Air Force",
      productImage: require("../assets/images/nike-black.jpg"),
      inventory: 11,
      cart: 0,
      features: ["Durable leather", "Secure Lace Up", "Padded ankle collar"],
      variants: [
        {
          variantId: 1,
          variantColor: "red",
          variantImage: require("../assets/images/nike-red.jpg"),
          variantQty: 20,
        },
        {
          variantId: 2,
          variantColor: "white",
          variantImage: require("../assets/images/nike-white.jpg"),
          variantQty: 5,
        },
        {
          variantId: 3,
          variantColor: "Black",
          variantImage: require("../assets/images/nike-black.jpg"),
          variantQty: 0,
        },
      ],
    };
  },
  methods: {
    addToCart() {
      this.cart += 1;

    }
  }
};
</script>
