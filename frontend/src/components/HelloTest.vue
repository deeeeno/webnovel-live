<template>
    <div class="test">
      <div>{{overall}}</div>
      <div v-for="paragraph in overall" :key="paragraph.id">
        <div>
          <div>{{paragraph.owner}}</div>
          <div  v-if="paragraph.id == currentParagraph">
            <textarea @keyup="IamUsing(paragraph)" v-model="paragraph.content" @focusout="editEnd(paragraph.id)"></textarea>
          </div>
          <div v-else>
            <div class="locked" v-if="paragraph.lock">{{paragraph.content}}</div>
            <div v-if="!paragraph.lock" @click="selectParagraph(paragraph)">{{paragraph.content}}</div>
          </div>
          <!--<textarea @keyup="IamUsing(paragraph)" v-model="paragraph.content" :disabled="paragraph.lock"></textarea>-->
          <button @click="editEnd(paragraph.id)">exit</button>
        </div>
        <button @click="addParagraph(paragraph.id)">+</button>
        <button @click="remParagraph(paragraph.id)">-</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Document',
  data: function() {
    return {
      owner: null,
    }
  },
  created() {
    this.owner = this.makeOwner();
    this.$store.commit("initDocument");
  },
  computed: { //get variables
    overall() {
      return this.$store.getters.getOverall;
    },
    currentParagraph() {
      return this.$store.getters.getCurrentParagraph;
    }
  },
  methods: {
    IamUsing: function(paragraph, event){
      if(!paragraph.lock) this.$store.commit('nowUsing', { id : paragraph.id, owner : this.owner });
    },
    editEnd: function(index, event){
      this.$store.commit('editDone', { id : index });
      this.$store.commit("setCurrentParagraph", null);
    },
    addParagraph: function(index, event){
      this.$store.commit('addParagraph', { id : index });
    },
    remParagraph: function(index, event){
      this.$store.commit('remParagraph', { id : index });
    },
    makeOwner: function(){
      let text = '';
      let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for(let i=0; i<6; i++)
      {
        text += letters.charAt(Math.floor(Math.random() * letters.length));
      }
      return text;
    },
    selectParagraph: function(paragraph) {
      console.log("click para");
      this.IamUsing(paragraph);
      this.$store.commit("setCurrentParagraph", paragraph.id);
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
.locked {
  background-color :#ff00ff;
}
</style>
