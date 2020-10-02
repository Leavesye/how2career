import Vue from "vue";
import { Form } from "element-ui";

function getValue(model) {
  let data = {};
  for (var i in model) {
    if (Array.isArray(model[i])) {
      data[i] = [];
      model[i].forEach((o, j) => {
        data[i][j] = getValue(o);
      });
    } else {
      data[i] = model[i].value;
    }
  }
  return data;
}

let axForm = Vue.extend(Form);

// 不做校验 ，直接返回表单数据
axForm.prototype.getFormData = function() {
  return getValue(this.model);
};

// 同步验证 返回验证结果 true || false
axForm.prototype.validateSync = () => {
  let f = false;
  this.validate(pass => {
    f = pass;
  });
  return f;
};

// 表单结果（包含验证）  返回Promise , 验证成功给出 formdata，验证失败则返回 错误字段
// 建议使用
axForm.prototype.getFormResult = () => {
  let P = new Promise((resolve, reject) => {
    this.validate((pass, fields) => {
      if (pass) {
        resolve(this.getFormData());
      } else {
        reject(fields);
      }
    });
  });
  return P;
};

export default axForm;
