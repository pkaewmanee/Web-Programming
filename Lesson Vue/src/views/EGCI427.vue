<template>
    <div class="ecgi427">
      <p>This is an EGCI427 page</p>
      <!-- <p>{{ title }}</p>
      <p>{{ age*2 }}</p>
      Counter : {{ count }} -->

      <p>{{ age<=30? 'young' : 'old' }}</p>
      <p>{{ title.split(' ') }}</p>
      <p>{{ getFullname() }}</p>
      <p>{{ getFullname2('Bob', 'Cat') }}</p>
    </div>
</template>

<script>
export default {
  name: 'EGCI427',
  data() {
    return {
      title: "hello world",
      age: 31,
      count: 0,
      firstName: 'Bob',
      lastName: 'Cat'
    }
  },
  mounted() {
    // setInterval(() =>{
    //   this.count++
    // },1000)
  },
  methods: {
    getFullname: function(){
      return this.firstName+ ' '+this.lastName
    },
    getFullname2: function(first, last){
        return first + ' ' + last
    }

  }
}
</script>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
  