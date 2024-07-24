<template>
  <div>
    <form class="review-form">
      <div class="row">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name"/>
      </div>
      <div class="row">
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </div>
      <div class="row">
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </div>
      <div class="row">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Product-Review",
  data() {
    return {
      name: null,
      review: null,
      rating: null,
     
    };
  },
};
</script>
