<template>
  <el-card>
    <section class="form-part"
             v-for="(exp, i) in exps"
             :key="i">
      <quick-form :model="exp"
                  labelWidth="110px"
                  :ref="'exp'+i"></quick-form>
      <el-button plain
                 class="remove-btn"
                 @click="handleDelExp(i)">删除</el-button>
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
        <el-button plain
                   class="remove-btn"
                   @click="handleDelPrj(i)">删除</el-button>
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
        <el-button plain
                   class="remove-btn"
                   @click="handleDelArticle(i)">删除</el-button>
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

const cfg = {
  'exps': exp,
  'projects': project,
  'articles': article,
}
export default {
  components: { QuickForm },
  props: ['authorlevel', 'initData'],
  data () {
    return {
      hasPrj: false,
      hasArticle: false,
      ..._.cloneDeep(form)
    }
  },
  watch: {
    'oriEduData': function (n, o) {
      console.log(n, o, 4367)
    }
  },
  mounted () {
    this.exps = this.bindThis(this.exps)
    article.level.options = this.authorlevel
    console.log(article, this.authorlevel, 'article')
    const { studentOrganizationHistory: exps,
      projectHistory: projects, projectExperience, publishArticle, ArticleHistory: articles } = this.initData
    this.hasPrj = projectExperience
    this.hasArticle = publishArticle
    if (exps && exps.length) {
      const data = { exps, projects, articles }
      Object.keys(data).forEach(key => {
        if (['exps', 'projects', 'articles'].includes(key)) {
          let form = data[key]
          this[key] = []
          if (data[key] && data[key].length) {
            form.forEach((o, i) => {
              // 创建表单对象并加入列表
              let copy = _.cloneDeep(cfg[key])
              this[key].push(copy)
              // 给表单绑定下拉选项并赋值
              Object.keys(copy).forEach(k => {
                // 联动设置
                if (k == 'onBoard') {
                  this.handleCheckOnBoard(i, o[k])
                }
                copy[k].value = o[k]
              })
              this.bindThis(copy, i)
            })
          } else {
            // 创建表单对象并加入列表
            let copy = _.cloneDeep(cfg[key])
            this[key].push(copy)
            // 给表单绑定下拉选项并赋值
            Object.keys(copy).forEach(k => {
              // 作者级别
              if (k == 'level') {
                copy[k].options = this.authorlevel
              }
              // 联动设置
              if (k == 'onBoard') {
                this.handleCheckOnBoard(i, o[k])
              }
            })
            this.bindThis(copy, 0)
          }

        }
      })
    }

  },
  methods: {
    bindThis (o, i) {
      Object.keys(o).forEach(key => {
        let current = o[key]
        current.events && Object.keys(current.events).forEach(event => {
          // 绑定this 及  数组索引
          current.events[event] = current.events[event].bind(this, i)
        })
      })
      return o
    },
    handleCheckOnBoard (i, v) {
      console.log(i, v)
      this.exps[i].resignationTime.hide = v
      this.exps[i].resignationTime.value = ''
    },
    // 社团操作
    handleAddExp () {
      const len = this.exps.length
      if (len == 10) return false
      this.exps.push(this.bindThis(_.cloneDeep(exp), len))
    },
    handleDelExp (i) {
      this.exps.splice(i, 1)
    },
    // 项目操作
    handleAddPrj () {
      const len = this.projects.length
      if (len == 10) return false
      this.projects.push(this.bindThis(_.cloneDeep(project), len))
    },
    handleDelPrj (i) {
      this.projects.splice(i, 1)
      if (this.projects.length == 0) {
        this.hasPrj = false
      }
    },
    // 文章操作
    handleAddArticle () {
      const len = this.articles.length
      if (len == 10) return false
      this.articles.push(this.bindThis(_.cloneDeep(article), len))
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
  position: relative;
}
.remove-btn {
  position: absolute;
  right: 0;
  bottom: 31px;
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
