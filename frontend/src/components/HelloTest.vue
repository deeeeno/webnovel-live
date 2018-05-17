<template>
    <div class="test">
      <div v-for="paragraph in overall" :key="paragraph.id">
        <textarea @keyup="IamUsing(paragraph)" v-model="paragraph.content" :disabled="paragraph.lock"></textarea>
        <button @click="editEnd(paragraph.id)">exit</button>
        <button @click="addParagraph(paragraph.id)">+</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Document',
  data: function() {
    return {
      owner: null
    }
  },
  created() {
    this.owner = this.makeOwner();
  },
  computed: { //get variables
    overall() {
      return this.$store.getters.getOverall;
    }
  },
  methods: {
    IamUsing: function(paragraph, event){
      if(!paragraph.lock) this.$store.commit('nowUsing', { id : paragraph.id, owner : this.owner });
    },
    editEnd: function(index, event){
      this.$store.commit('editDone', { id : index });
    },
    addParagraph: function(index, event){
      this.$store.commit('addParagraph', { id : index });
    },
    makeOwner: function(){
      let text = '';
      let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for(let i=0; i<6; i++)
      {
        text += letters.charAt(Math.floor(Math.random() * letters.length));
      }
      return text;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
