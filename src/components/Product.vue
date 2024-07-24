<template>
  <div>
    <div class="container">
      <div class="product">
        <div class="image">
          <img v-bind:src="productImage" alt="" />
        </div>
        <div class="content">
          <h1>{{title}}</h1>
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
            <span v-for=" (variant, index) in variants" :key="variant.variantId" @mouseover="updateImage(index)"
              class="colorBox" :style="{ backgroundColor: variant.variantColor}">
            
            </span>
          </div>
          <div class="shipping">Shipping: {{ shipping }}</div>
          <div class="addCart">
            <button v-on:click="addToCart" :disabled="inventory <=0" :class="{disabledState: inventory <=0}">Add to Cart</button>
          </div>
        </div>
      </div>
      <div class="reviews">
        <h2>Reviews</h2>
        <p>There are no reviews yet.</p>
        <ul>
          <li v-for="(review, index) in reviews" :key="index">
            <p>{{ review.review }}</p>
              <span>- {{ review.name }},
                <strong>Rating:</strong> {{ review.rating }}
              </span>
            
          </li>
        </ul>
      </div>
      <product-review @review-submitted="addReview"></product-review>
    </div>
    
    <product-tabs></product-tabs>
  </div>
</template>

<script>
import ProductReview from './Product-review.vue';
import ProductTabs from './Product-tabs.vue';

export default {
  components: {ProductReview,ProductTabs},
  name: "Product",
  props: {
    member: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      brand: "Nike ",
      product: "Air Force",
      selectedVariant: 0,
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
      reviews:[]
    };
  },
  methods: {
    addToCart() {
      this.$emit('addtocart', this.variants[this.selectedVariant].variantId)
    },
    updateImage(index) {
      this.selectedVariant = index;
      console.log(index);
    },
    addReview(productReview) {
      this.reviews.push(productReview);
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    productImage(){
      return this.variants[this.selectedVariant].variantImage;
    },
    inventory(){
      return this.variants[this.selectedVariant].variantQty;
    },
    shipping(){
      if(this.member){
        return 'FREE'
      }
      return '$' + 2.99
    }
  },

};
</script>
