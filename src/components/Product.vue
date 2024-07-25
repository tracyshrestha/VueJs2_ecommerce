<template>
  <div>
    <div class="container">
      <div class="product">
        <div class="image">
          <img v-bind:src="productImage" alt="" />
        </div>
        <div class="content">
          <h1>{{ title }}</h1>
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
            <span
              v-for="(variant, index) in variants"
              :key="variant.variantId"
              @mouseover="updateImage(index)"
              class="colorBox"
              :style="{ backgroundColor: variant.variantColor }"
            >
            </span>
          </div>
          <div class="shipping">Shipping: {{ shipping }}</div>
          <div class="addCart">
            <button
              v-on:click="addToCart"
              :disabled="inventory <= 0"
              :class="{ disabledState: inventory <= 0 }"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <product-tabs :reviews="reviews"></product-tabs>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../main.js';
import ProductTabs from "./Product-tabs.vue";

export default {
  components: { ProductTabs },
  name: "Product",
  props: {
    member: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      brand: "Amazon ",
      product: "Kindle Paperwhite",
      selectedVariant: 0,
      features: ["Now with a larger display", "Adjustable warm light", "Increased battery life", "Faster page turns"],
      variants: [
        {
          variantId: 1,
          variantColor: "green",
          variantImage: require("../assets/images/green.jpg"),
          variantQty: 20,
        },
        {
          variantId: 2,
          variantColor: "blue",
          variantImage: require("../assets/images/blue.jpg"),
          variantQty: 5,
        },
        {
          variantId: 3,
          variantColor: "Black",
          variantImage: require("../assets/images/black.jpg"),
          variantQty: 0,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("addtocart", this.variants[this.selectedVariant].variantId);
    },
    updateImage(index) {
      this.selectedVariant = index;
      console.log(index);
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    productImage() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inventory() {
      return this.variants[this.selectedVariant].variantQty;
    },
    shipping() {
      if (this.member) {
        return "FREE";
      }
      return "$" + 2.99;
    },
  },
  mounted() {
    eventBus.$on("review-submitted", productReview => {
      this.reviews.push(productReview);
    });
  },
};
</script>
