<template>
    <div class="test">
      <div v-for="paragraph in overall" :key="paragraph.index">
        <div v-if="isLock === true" v-bind:id='paragraph.index' @click="IamUsing" @keyup="editEnd" v-model="paragraph.content"></div>
        <textarea v-if="isLock === false" v-bind:id='paragraph.index' @click="IamUsing" @keyup="editEnd" v-model="paragraph.content"></textarea>
        <button v-bind:id='paragraph.index' @click="editEnd">exit</button>
      </div>

    </div>
</template>

<script>
export default {
  name: 'Document',
  computed: { //get variables
    overall() {
      return this.$store.getters.getOverall;
    }
  },
  methods: {
    IamUsing: function(event){
      var Target = event.currentTarget.id;
      this.$store.commit('nowUsing', { target : Target });
    },
    editEnd: function(event){
      var Target = event.currentTarget.id;
      this.$store.commit('editDone', { target : Target });
    },
    editStory: function(event){
      var target = event.currentTarget.story;
      this.$store.commit('editStory',target);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  width: 1000px;
  height: 100px;
}
textarea {
  width: 1000px;
  height: 100px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
