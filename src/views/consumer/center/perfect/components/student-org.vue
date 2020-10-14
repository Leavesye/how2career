<template>
  <el-card>
    <section class="form-part"
             v-for="(exp, i) in exps"
             :key="i">
      <quick-form :model="exp"
                  labelWidth="110px"
                  :ref="'exp'+i"></quick-form>
      <div class="flex-he">
        <el-button plain
                   @click="handleDelExp(i)">删除</el-button>
      </div>
    </section>
    <div class="plus-btn">
      <el-button type="success"
                 plain
                 @click="handleAddExp()">+更多社团经历</el-button>
    </div>
    <div class="s-check">
      <el-checkbox v-model="hasPrj">有项目经历</el-checkbox>
    </div>
    <div v-if="hasPrj">
      <section class="form-part"
               v-for="(project, i) in projects"
               :key="i">
        <quick-form :model="project"
                    labelWidth="110px"
                    :ref="'project'+i"></quick-form>
        <div class="flex-he">
          <el-button plain
                     @click="handleDelPrj(i)">删除</el-button>
        </div>
      </section>
      <div class="plus-btn">
        <el-button type="success"
                   plain
                   @click="handleAddPrj()">+更多项目</el-button>
      </div>
    </div>
    <div class="s-check">
      <el-checkbox v-model="hasArticle">在校内发表文章</el-checkbox>
    </div>
    <div v-if="hasArticle">
      <section class="form-part"
               v-for="(article, i) in articles"
               :key="i">
        <quick-form :model="article"
                    labelWidth="110px"
                    :ref="'article'+i"></quick-form>
        <div class="flex-he">
          <el-button plain
                     @click="handleDelArticle(i)">删除</el-button>
        </div>
      </section>
      <div class="plus-btn">
        <el-button type="success"
                   plain
                   @click="handleAddArticle()">+更多文章</el-button>
      </div>

    </div>
  </el-card>
</template>

<script>
import QuickForm from '@/components/QuickForm'
import exp from './form/exp'
import project from './form/project'
import article from './form/article'
import form from './form'
import _ from 'lodash'
export default {
  components: { QuickForm },
  props: ['pid'],
  data () {
    return {
      hasPrj: false,
      hasArticle: false,
      ..._.cloneDeep(form)
    }
  },
  created () {
    this.bindThis(this.exps)
  },
  methods: {
    bindThis (list) {
      list.forEach((o, i) => {
        Object.keys(o).forEach(key => {
          let current = o[key]
          current.events && Object.keys(current.events).forEach(event => {
            // 绑定this 及  数组索引
            current.events[event] = current.events[event].bind(this, i)
          })
        })
      })
    },
    handleCheckOnBoard (i, v) {
      this.exps[i].resignationTime.hide = v
    },
    // 社团操作
    handleAddExp () {
      if (this.exps.length == 10) return false
      this.exps.push(_.cloneDeep(exp))
      this.bindThis(this.exps)
    },
    handleDelExp (i) {
      this.exps.splice(i, 1)
    },
    // 项目操作
    handleAddPrj () {
      if (this.projects.length == 10) return false
      this.projects.push(_.cloneDeep(project))
    },
    handleDelPrj (i) {
      this.projects.splice(i, 1)
      if (this.projects.length == 0) {
        this.hasPrj = false
      }
    },
    // 文章操作
    handleAddArticle () {
      if (this.articles.length == 10) return false
      this.articles.push(_.cloneDeep(article))
    },
    handleDelArticle (i) {
      this.articles.splice(i, 1)
      if (this.articles.length == 0) {
        this.hasArticle = false
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.form-part {
  margin-bottom: 30px;
}
.plus-btn {
  margin-left: 110px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #edeeef;
}
.s-check {
  margin: 30px 0 30px 110px;
}
</style>
