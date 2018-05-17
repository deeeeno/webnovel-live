<template>
  <div class="documents">
    <div>{{mess}}</div>
      <!--<div v-for="doc in allDocuments" :key="doc.id">
        <textarea v-bind:id='paragraph.index' @click="IamUsing" @keyup="editEnd" v-model="paragraph.content"></textarea>
        <button v-bind:id='paragraph.index' @click="editEnd">exit</button>
      </div>-->

  </div>
</template>

<script>
export default {
  name: 'Documents',
  created() {
    this.$http.get('http://localhost:3000/api/docsnapshot/09fd9bc0031c5c089389aa15bd3adfca6b259c82').then((response) => {
      this.mess = response;
    }).catch((msg)=> {
      this.mess = msg;
    })
  },data: function() {
    return {
      mess: "dd",
    }
  },
  computed: {
    
  },
  methods: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
