<template>
  <div class="home">
    <header class="container">
      <h1>Shopcart Limited.</h1>
      <p>Shop from anywhere, anytime</p>
      <button class="btn_cta">Shop Now</button>
    </header>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  }
}
</script>

<style scoped>
.home {
  min-height: calc(100vh - 80px);
  background-image: linear-gradient(rgba(210, 105, 30, 0.6), rgba(210, 105, 30, 0.6)), url("../assets/bg-image.jpg");
  background-size: cover;
  display: flex;
}
.container {
  margin: auto;
  max-width: 700px;
  padding: 2rem 0;
  color: #ffffff;
  text-align: center;
}
.container h1 {
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}
.container p {
  font-size: 2rem;
  margin-top: 0.2rem;
}
.btn_cta {
  background: #ffffff;
  color: chocolate;
  padding: 1rem 3rem;
  border-radius: 8px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 300ms ease-in-out;
}
.btn_cta:hover {
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.3);
  transform: translateY(-1px);
}
@media screen and (max-width: 768px) {
  .home {
    background-position: center;
    min-height: calc(100vh - 70px);
  }
  .container h1 {
    font-size: 3rem;
  }
  .container p {
    font-size: 1.5rem;
  }
}
</style>